/** @format */

import {
	AppBar,
	Container,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { HubConnectionBuilder } from '@microsoft/signalr'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useRef, useState } from 'react'
import { Toast } from 'react-bootstrap'
import Country from './components/Country'
import Login from './components/Login'
import Logout from './components/Logout'
import NewCountry from './components/NewCountry'

const useStyles = makeStyles((theme) => ({
	appContainer: {
		backgroundColor: theme.palette.background.default,
		backgroundSize: 'cover',
		position: 'center',
		color: theme.palette.text.secondary,
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		textAlign: 'center',
		fontSize: '2.5rem',
		fontWeight: 'bold',
		marginBottom: theme.spacing(2),
	},
	countryContainer: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		maxWidth: '85%',
		boxShadow: theme.shadows[2],
		display: 'flex',
		position: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tooltipContainer: {
		display: 'flex',
		justifyContent: 'center',
		fontSize: '1.2rem',
	},
	tableContainer: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		maxWidth: '80%',
		boxShadow: theme.shadows[2],
	},
}))
const App = () => {
	const classes = useStyles()
	// const apiEndpoint = "https://localhost:7266/api/country";

	// const apiEndpoint = 'https://react-medals-barrathtb.azurewebsites.net/jwt/api/country'
	// const hubEndpoint = 'https://react-medals-barrathtb.azurewebsites.net/medalsHub'
	// const usersEndpoint = 'https://react-medals-barrathtb.azurewebsites.net/api/users/login'

	const apiEndpoint = 'https://medals-api-6.azurewebsites.net/jwt/api/country'
	const hubEndpoint = 'https://medals-api-6.azurewebsites.net/medalsHub'
	const usersEndpoint = 'https://medals-api-6.azurewebsites.net/api/users/login'

	const [showToast, setShowToast] = useState(false)
	const [toastMessage, setToastMessage] = useState('')
	const [countriesList, setCountries] = useState([])
	const [connection, setConnection] = useState(null)
	const medals = useRef([
		{ id: 1, name: 'gold' },
		{ id: 2, name: 'silver' },
		{ id: 3, name: 'bronze' },
	])
	const [user, setUser] = useState({
		name: null,
		authenticated: false,
		canPost: false,
		canPatch: false,
		canDelete: false,
	})

	const latestCountries = useRef(null)

	latestCountries.current = countriesList

	useEffect(() => {
		// initial data loaded here
		async function fetchCountries() {
			const { data: fetchedCountries } = await axios.get(apiEndpoint)

			let newCountries = []
			fetchedCountries.forEach((country) => {
				let newCountry = {
					id: country.id,
					name: country.name,
				}
				medals.current.forEach((medal) => {
					const count = country[medal.name]

					newCountry[medal.name] = { page_value: count, saved_value: count }
				})
				newCountries.push(newCountry)
			})
			setCountries(newCountries)
		}
		fetchCountries()
		const encodedJwt = localStorage.getItem('token')
		// check for existing token
		encodedJwt && setUser(getUser(encodedJwt))

		// signalR
		const newConnection = new HubConnectionBuilder().withUrl(hubEndpoint).withAutomaticReconnect().build()

		setConnection(newConnection)
	}, [])

	useEffect(() => {
		if (connection) {
			connection
				.start()
				.then(() => {
					console.log('Connected!')

					connection.on('ReceiveAddMessage', (country) => {
						console.log(`Add: ${country.name}`)

						let newCountry = {
							id: country.id,
							name: country.name,
						}
						medals.current.forEach((medal) => {
							const count = country[medal.name]
							newCountry[medal.name] = { page_value: count, saved_value: count }
						})
						let mutableCountries = [...latestCountries.current]
						mutableCountries = mutableCountries.concat(newCountry)
						setCountries(mutableCountries)
					})

					connection.on('ReceiveDeleteMessage', (id) => {
						console.log(`Delete id: ${id}`)
						let mutableCountries = [...latestCountries.current]
						mutableCountries = mutableCountries.filter((c) => c.id !== id)
						setCountries(mutableCountries)
					})
					connection.on('ReceivePatchMessage', (country) => {
						console.log(`Patch: ${country.name}`)
						let updatedCountry = {
							id: country.id,
							name: country.name,
						}
						medals.current.forEach((medal) => {
							const count = country[medal.name]
							updatedCountry[medal.name] = { page_value: count, saved_value: count }
						})
						let mutableCountries = [...latestCountries.current]
						const idx = mutableCountries.findIndex((c) => c.id === country.id)
						mutableCountries[idx] = updatedCountry

						setCountries(mutableCountries)
					})
				})
				.catch((e) => console.log('Connection failed: ', e))
		}
		// useEffect is dependent on changes connection
	}, [connection])

	const medalsSave = async (countryId) => {
		const originalCountries = countriesList

		const patchList = countriesList.findIndex((c) => c.id === countryId)
		const currentCountriesList = [...countriesList]
		const country = currentCountriesList[patchList]
		let jsonPatch = []

		medals.current.forEach((medal) => {
			if (country[medal.name].page_value !== country[medal.name].saved_value) {
				jsonPatch.push({ op: 'replace', path: medal.name, value: country[medal.name].page_value })
				country[medal.name].saved_value = country[medal.name].page_value
			}
		})

		setCountries(currentCountriesList)

		try {
			await axios.patch(`${apiEndpoint}/${countryId}`, jsonPatch, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			handleToastShow(country.name + ' medals updated successfully')
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				// country already deleted
				console.log('The record does not exist - it may have already been deleted')
			} else if (ex.response && ex.response.status === 401) {
				alert('You are not authorized to complete this request')
				// to simplify, I am reloading the page to restore "saved" values
				window.location.reload(false)
			} else {
				alert('An error occurred while updating')
				setCountries(originalCountries)
			}
		}
	}
	const resetCountry = (countryId) => {
		const updatedCountriesList = countriesList.map((country) => {
			if (country.id === countryId) {
				let resetMedals = {}
				medals.current.forEach((medal) => {
					resetMedals[medal.name] = {
						...country[medal.name],
						page_value: country[medal.name].saved_value,
					}
				})
				return { ...country, ...resetMedals }
			}
			return country
		})
		setCountries(updatedCountriesList)
		handleToastShow(' Medals Reset Successfully')
	}
	const addCountry = async (name) => {
		try {
			const { data: post } = await axios.post(
				apiEndpoint,
				{
					name: name,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)
			let newCountry = {
				id: post.id,
				name: post.name,
			}
			medals.current.forEach((medal) => {
				const count = post[medal.name]

				newCountry[medal.name] = { page_value: count, saved_value: count }
			})
			setCountries(countriesList.concat(newCountry))
			handleToastShow('Country Added Successfully')
		} catch (ex) {
			if (ex.response && (ex.response.status === 401 || ex.response.status === 403)) {
				alert('You are not authorized to complete this request')
			} else if (ex.response) {
				console.log(ex.response)
			} else {
				console.log('Request failed')
			}
		}
	}
	const deleteCountry = async (countryId) => {
		const originalCountries = countriesList
		setCountries(countriesList.filter((c) => c.id !== countryId))
		try {
			await axios.delete(`${apiEndpoint}/${countryId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			handleToastShow('Country Deleted!!! Successfully')
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				// country already deleted
				console.log('The record does not exist - it may have already been deleted')
			} else {
				setCountries(originalCountries)
				if (ex.response && (ex.response.status === 401 || ex.response.status === 403)) {
					alert('You are not authorized to complete this request')
				} else if (ex.response) {
					console.log(ex.response)
				} else {
					console.log('Request failed')
				}
			}
		}
	}
	const incrementMedals = (countryId, medalName) => {
		console.log(`Before incrementing: ${medalName}`)
		doUpdate(countryId, medalName, 1)
	}
	const decrementMedals = (countryId, medalName) => {
		console.log(`Before decrementing: ${medalName}`)
		doUpdate(countryId, medalName, -1)
	}
	const doUpdate = async (countryId, medalName, factor) => {
		const idx = countriesList.findIndex((c) => c.id === countryId)
		const mutableCountries = [...countriesList]
		mutableCountries[idx][medalName].page_value += 1 * factor
		setCountries(mutableCountries)
	}

	const handleLogin = async (username, password) => {
		try {
			const resp = await axios.post(usersEndpoint, { username: username, password: password })
			const encodedJwt = resp.data.token
			localStorage.setItem('token', encodedJwt)
			setUser(getUser(encodedJwt))
		} catch (ex) {
			if (ex.response && (ex.response.status === 401 || ex.response.status === 400)) {
				alert('Login failed')
			} else if (ex.response) {
				console.log(ex.response)
			} else {
				console.log('Request failed')
			}
		}
	}
	const getUser = (encodedJwt) => {
		// return unencoded user / permissions
		const decodedJwt = jwtDecode(encodedJwt)
		return {
			name: decodedJwt['username'],
			authenticated: true,
			canPost: decodedJwt['roles'].indexOf('medals-post') === -1 ? false : true,
			canPatch: decodedJwt['roles'].indexOf('medals-patch') === -1 ? false : true,
			canDelete: decodedJwt['roles'].indexOf('medals-delete') === -1 ? false : true,
		}
	}
	const handleLogout = () => {
		localStorage.removeItem('token')
		setUser({
			name: null,
			authenticated: false,
			canPost: false,
			canPatch: false,
			canDelete: false,
		})
	}

	const getMedalsTotal = (medalType) => {
		return countriesList.reduce((total, country) => total + country[medalType].page_value, 0)
	}

	const handleToastShow = (message) => {
		setShowToast(true)
		setToastMessage(message)

		setTimeout(() => setShowToast(false), 3000)
	}

	return (
		<Container className={classes.appContainer}>
			<AppBar position='fixed' style={{ backgroundColor: '#333' }}></AppBar>

			<h1 className={classes.title}>Olympic Medals by Country</h1>
			<Toast
				show={showToast}
				onClose={() => setShowToast(false)}
				style={{
					position: 'fixed',
					top: '20px',
					right: '20px',
					backgroundColor: '#333',
					color: '#e0e0e0',
					borderRadius: '5px',
					padding: '10px',
					width: '200px',
					height: '50px',
					alignItems: 'center',
					justifyContent: 'center',
					maxWidth: '100%',
					zIndex: '1000',
				}}
				delay={3000}
				autohide>
				<Toast.Header className='me-auto text-warning'>MESSAGE:</Toast.Header>
				<Toast.Body>{toastMessage}</Toast.Body>
			</Toast>
			{user.authenticated ? <Logout onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
			{user.canPost && <NewCountry addCountry={addCountry} onShowToast={handleToastShow} />}

			<Container className={classes.countryContainer}>
				<Grid container spacing={2}>
					{/* Country components showing increment and decrement buttons */}
					{countriesList.map((country) => (
						<Grid item xs={12} sm={12} md={12} key={country.id}>
							<Country
								country={country}
								key={country.id}
								medals={medals.current}
								decrementMedals={decrementMedals}
								incrementMedals={incrementMedals}
								deleteCountry={deleteCountry}
								canDelete={user.canDelete}
								canPatch={user.canPatch}
								onSave={medalsSave}
								onReset={resetCountry}
							/>
						</Grid>
					))}
				</Grid>
			</Container>

			{/* Medal Count Table */}
			<TableContainer item xs={12} sm={6} md={4} className={classes.tableContainer} component={Paper}>
				<Table aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Country</TableCell>
							<TableCell align='right'>{getMedalsTotal('gold')}</TableCell>
							<TableCell align='right'>{getMedalsTotal('silver')}</TableCell>
							<TableCell align='right'>{getMedalsTotal('bronze')}</TableCell>
							<TableCell align='right'>Total Medals</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{countriesList.map((country) => (
							<TableRow key={country.id}>
								<TableCell component='th' scope='row'>
									{country.name}
								</TableCell>
								<TableCell align='right'>{country.gold.page_value}</TableCell>
								<TableCell align='right'>{country.silver.page_value}</TableCell>
								<TableCell align='right'>{country.bronze.page_value}</TableCell>
								<TableCell align='right'>
									{country.gold.page_value + country.silver.page_value + country.bronze.page_value}
								</TableCell>{' '}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{/* table for medal totals by metal not country */}
			<TableContainer item xs={12} sm={6} md={4} className={classes.tableContainer} component={Paper}>
				<Table aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Medals</TableCell>
							<TableCell align='right'>Gold Medals</TableCell>
							<TableCell align='right'>Silver Medals</TableCell>
							<TableCell align='right'>Bronze Medals</TableCell>
							<TableCell align='right'>Total Medals</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell component='th' scope='row'>
								Total Medals
							</TableCell>
							<TableCell align='right'>{getMedalsTotal('gold')}</TableCell>
							<TableCell align='right'>{getMedalsTotal('silver')}</TableCell>
							<TableCell align='right'>{getMedalsTotal('bronze')}</TableCell>
							<TableCell align='right'>
								{getMedalsTotal('gold') + getMedalsTotal('silver') + getMedalsTotal('bronze')}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	)
}

export default App
