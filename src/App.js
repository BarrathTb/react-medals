/** @format */

import React, { useState, useEffect } from "react";
import Country from "./components/Country";
import {
	Container,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Grid,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
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
function App() {
	const classes = useStyles();
	const [countriesList, setCountries] = useState([
		{
			id: 1,
			name: "USA",
			gold: Math.floor(Math.random() * 10),
			silver: Math.floor(Math.random() * 10),
			bronze: Math.floor(Math.random() * 10),
		},
		{
			id: 2,
			name: "China",
			gold: Math.floor(Math.random() * 10),
			silver: Math.floor(Math.random() * 10),
			bronze: Math.floor(Math.random() * 10),
		},
		{
			id: 3,
			name: "Japan",
			gold: Math.floor(Math.random() * 10),
			silver: Math.floor(Math.random() * 10),
			bronze: Math.floor(Math.random() * 10),
		},
		{
			id: 4,
			name: "Italy",
			gold: Math.floor(Math.random() * 10),
			silver: Math.floor(Math.random() * 10),
			bronze: Math.floor(Math.random() * 10),
		},
		{
			id: 5,
			name: "France",
			gold: Math.floor(Math.random() * 10),
			silver: Math.floor(Math.random() * 10),
			bronze: Math.floor(Math.random() * 10),
		},
		{
			id: 6,
			name: "Brazil",
			gold: Math.floor(Math.random() * 10),
			silver: Math.floor(Math.random() * 10),
			bronze: Math.floor(Math.random() * 10),
		},
	]);

	// const [selectedCountryId, setSelectedCountryId] = useState(1);

	const getTotalMedals = () => {
		return countriesList.reduce(
			(acc, country) => ({
				gold: acc.gold + country.gold,
				silver: acc.silver + country.silver,
				bronze: acc.bronze + country.bronze,
			}),
			{ gold: 0, silver: 0, bronze: 0 }
		);
	};

	const totalMedals = getTotalMedals();

	// Function to decrement gold count
	const decrementMedals = (countryId, type) => {
		setCountries(
			countriesList.map((country) =>
				country.id === countryId && country[type] > 0 ? { ...country, [type]: country[type] - 1 } : country
			)
		);
	};

	// Function to increment gold count
	const incrementMedals = (countryId, type) => {
		setCountries(
			countriesList.map((country) => (country.id === countryId ? { ...country, [type]: country[type] + 1 } : country))
		);
	};

	useEffect(() => {}, []);

	const addCountry = (newName) => {
		// Logic to add country
		const newId = countriesList.length ? Math.max(...countriesList.map((c) => c.id)) + 1 : 1;
		setCountries([
			...countriesList,
			{
				id: newId,
				name: newName,
				gold: 0,
				silver: 0,
				bronze: 0,
			},
		]);
	};
	const deleteCountry = (countryId) => {
		setCountries(countriesList.filter((country) => country.id !== countryId));
	};

	return (
		<Container className={classes.appContainer}>
			<h1 className={classes.title}>Olympic Medals by Country</h1>
			<NewCountry addCountry={addCountry} />
			<Container className={classes.countryContainer}>
				<Grid container spacing={2}>
					{/* Country components showing increment and decrement buttons */}
					{countriesList.map((country) => (
						<Grid item xs={12} sm={12} md={12} key={country.id}>
							<Country
								country={country}
								key={country.id}
								decrementMedals={decrementMedals}
								incrementMedals={incrementMedals}
								deleteCountry={deleteCountry}
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
							<TableCell align='right'>Gold Medals</TableCell>
							<TableCell align='right'>Silver Medals</TableCell>
							<TableCell align='right'>Bronze Medals</TableCell>
							<TableCell align='right'>Total Medals</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{countriesList.map((country) => (
							<TableRow key={country.id}>
								<TableCell component='th' scope='row'>
									{country.name}
								</TableCell>
								<TableCell align='right'>{country.gold}</TableCell>
								<TableCell align='right'>{country.silver}</TableCell>
								<TableCell align='right'>{country.bronze}</TableCell>
								<TableCell align='right'>{country.gold + country.silver + country.bronze}</TableCell>
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
							<TableCell align='right'>{totalMedals.gold}</TableCell>
							<TableCell align='right'>{totalMedals.silver}</TableCell>
							<TableCell align='right'>{totalMedals.bronze}</TableCell>
							<TableCell align='right'>{totalMedals.gold + totalMedals.silver + totalMedals.bronze}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}

export default App;
