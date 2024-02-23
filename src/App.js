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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "react-bootstrap";
import Country from "./components/Country";
import NewCountry from "./components/NewCountry";

const useStyles = makeStyles((theme) => ({
	appContainer: {
		backgroundColor: theme.palette.background.default,
		backgroundSize: "cover",
		position: "center",
		color: theme.palette.text.secondary,
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		textAlign: "center",
		fontSize: "2.5rem",
		fontWeight: "bold",
		marginBottom: theme.spacing(2),
	},
	countryContainer: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		maxWidth: "85%",
		boxShadow: theme.shadows[2],
		display: "flex",
		position: "center",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	tooltipContainer: {
		display: "flex",
		justifyContent: "center",
		fontSize: "1.2rem",
	},
	tableContainer: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		maxWidth: "80%",
		boxShadow: theme.shadows[2],
	},
}));
const App = () => {
	const classes = useStyles();
	const apiEndpoint = "https://medals-api-6.azurewebsites.net/api/country";
	// const apiEndpoint = "https://localhost:7266/api/country";
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [countriesList, setCountries] = useState([]);
	const medals = useRef([
		{ id: 1, name: "gold" },
		{ id: 2, name: "silver" },
		{ id: 3, name: "bronze" },
	]);

	// this is the functional equivalent to componentDidMount
	useEffect(() => {
		// initial data loaded here
		async function fetchCountries() {
			const { data: fetchedCountries } = await axios.get(apiEndpoint);
			// we need to save the original medal count values in state
			let newCountries = [];
			fetchedCountries.forEach((country) => {
				let newCountry = {
					id: country.id,
					name: country.name,
				};
				medals.current.forEach((medal) => {
					const count = country[medal.name];
					// page_value is what is displayed on the web page
					// saved_value is what is saved to the database
					newCountry[medal.name] = { page_value: count, saved_value: count };
				});
				newCountries.push(newCountry);
			});
			setCountries(newCountries);
		}
		fetchCountries();
	}, []);

	const medalsSave = async (countryId) => {
		const originalCountries = countriesList;

		const patchList = countriesList.findIndex((c) => c.id === countryId);
		const currentCountriesList = [...countriesList];
		const country = currentCountriesList[patchList];
		let jsonPatch = [];
		medals.current.forEach((medal) => {
			if (country[medal.name].page_value !== country[medal.name].saved_value) {
				jsonPatch.push({ op: "replace", path: medal.name, value: country[medal.name].page_value });
				country[medal.name].saved_value = country[medal.name].page_value;
			}
		});

		setCountries(currentCountriesList);

		try {
			await axios.patch(`${apiEndpoint}/${countryId}`, jsonPatch);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				// country already deleted
				console.log("The record does not exist - it may have already been deleted");
			} else {
				alert("An error occurred while updating");
				setCountries(originalCountries);
			}
		}
	};
	const resetCountry = (countryId) => {
		const updatedCountriesList = countriesList.map((country) => {
			if (country.id === countryId) {
				let resetMedals = {};
				medals.current.forEach((medal) => {
					resetMedals[medal.name] = {
						...country[medal.name],
						page_value: country[medal.name].saved_value,
					};
				});
				return { ...country, ...resetMedals };
			}
			return country;
		});
		setCountries(updatedCountriesList);
	};
	const addCountry = async (name) => {
		const { data: post } = await axios.post(apiEndpoint, { name: name });
		let newCountry = {
			id: post.id,
			name: post.name,
		};
		medals.current.forEach((medal) => {
			const count = post[medal.name];
			// when a new country is added, we need to store page and saved values for
			// medal counts in state
			newCountry[medal.name] = { page_value: count, saved_value: count };
		});
		setCountries(countriesList.concat(newCountry));
	};
	const deleteCountry = async (countryId) => {
		const originalCountries = countriesList;
		setCountries(countriesList.filter((c) => c.id !== countryId));
		try {
			await axios.delete(`${apiEndpoint}/${countryId}`);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				// country already deleted
				console.log("The record does not exist - it may have already been deleted");
			} else {
				alert("An error occurred while deleting");
				setCountries(originalCountries);
			}
		}
	};
	const incrementMedals = (countryId, medalName) => doUpdate(countryId, medalName, 1);
	const decrementMedals = (countryId, medalName) => doUpdate(countryId, medalName, -1);
	const doUpdate = (countryId, medalName, factor) => {
		const updatedCountries = countriesList.findIndex((c) => c.id === countryId);
		const newCountriesList = [...countriesList];
		newCountriesList[updatedCountries][medalName].page_value += 1 * factor;
		setCountries(newCountriesList);
	};
	const getMedalsTotal = () => {
		let sum = 0;
		// use medal count displayed in the web page for medal count totals
		medals.current.forEach((medal) => {
			sum += countriesList.reduce((a, b) => a + b[medal.name].page_value, 0);
		});
		return sum;
	};

	const handleToastShow = (message) => {
		setShowToast(true);
		setToastMessage(message);

		setTimeout(() => setShowToast(false), 3000);
	};

	return (
		<Container className={classes.appContainer}>
			<AppBar position='fixed' style={{ backgroundColor: "#333" }}></AppBar>

			<h1 className={classes.title}>Olympic Medals by Country</h1>
			<Toast
				show={showToast}
				onClose={() => setShowToast(false)}
				style={{
					position: "fixed",
					top: "20px",
					right: "20px",
					backgroundColor: "#333",
					color: "#e0e0e0",
					borderRadius: "5px",
					padding: "10px",
					width: "200px",
					height: "50px",
					alignItems: "center",
					justifyContent: "center",
					maxWidth: "100%",
					zIndex: "1000",
				}}
				delay={3000}
				autohide>
				<Toast.Header className='me-auto text-warning'>No Country Name Given:</Toast.Header>
				<Toast.Body>{toastMessage}</Toast.Body>
			</Toast>
			<NewCountry addCountry={addCountry} onShowToast={handleToastShow} />

			<Container className={classes.countryContainer}>
				<Grid container spacing={2}>
					{/* Country components showing increment and decrement buttons */}
					{countriesList.map((country) => (
						<Grid item xs={12} sm={12} md={12} key={country.id}>
							<Country
								country={country}
								key={country.id}
								medals={medals.current} // Pass the medals ref here
								decrementMedals={decrementMedals}
								incrementMedals={incrementMedals}
								deleteCountry={deleteCountry}
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
							<TableCell align='right'>{getMedalsTotal("gold")}</TableCell>
							<TableCell align='right'>{getMedalsTotal("silver")}</TableCell>
							<TableCell align='right'>{getMedalsTotal("bronze")}</TableCell>
							<TableCell align='right'>Total Medals</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{countriesList.map((country) => (
							<TableRow key={country.id}>
								<TableCell component='th' scope='row'>
									{country.name}
								</TableCell>
								<TableCell align='right'>{country.gold.page_value}</TableCell> {/* Changed */}
								<TableCell align='right'>{country.silver.page_value}</TableCell> {/* Changed */}
								<TableCell align='right'>{country.bronze.page_value}</TableCell> {/* Changed */}
								<TableCell align='right'>
									{country.gold.page_value + country.silver.page_value + country.bronze.page_value}
								</TableCell>{" "}
								{/* Changed */}
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
							<TableCell align='right'>{getMedalsTotal("gold")}</TableCell>
							<TableCell align='right'>{getMedalsTotal("silver")}</TableCell>
							<TableCell align='right'>{getMedalsTotal("bronze")}</TableCell>
							<TableCell align='right'>
								{getMedalsTotal("gold") + getMedalsTotal("silver") + getMedalsTotal("bronze")}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default App;
