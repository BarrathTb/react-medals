/** @format */

import React, { useState } from "react";
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
		{ id: 1, name: "USA", gold: 2 },
		{ id: 2, name: "China", gold: 0 },
		{ id: 3, name: "Japan", gold: 0 },
		{ id: 4, name: "Germany", gold: 0 },
		{ id: 5, name: "France", gold: 0 },
		{ id: 6, name: "Brazil", gold: 0 },
	]);
	// const [selectedCountryId, setSelectedCountryId] = useState(1);

	// Function to decrement gold count
	const decrementGold = (countryId) => {
		setCountries(
			countriesList.map((country) =>
				country.id === countryId && country.gold > 0 ? { ...country, gold: country.gold - 1 } : country
			)
		);
	};

	// Function to increment gold count
	const incrementGold = (countryId) => {
		setCountries(
			countriesList.map((country) => (country.id === countryId ? { ...country, gold: country.gold + 1 } : country))
		);
	};

	// Handler for change based on selected country and increment decision
	// const handleMedalChange = (increment) => {
	// 	setCountries(
	// 		countriesList.map((country) => {
	// 			if (country.id === selectedCountryId) {
	// 				const newGoldCount = increment ? country.gold + 1 : Math.max(country.gold - 1, 0);
	// 				return { ...country, gold: newGoldCount };
	// 			}
	// 			return country;
	// 		})
	// 	);
	// };

	// const selectedCountry = countriesList.find((country) => country.id === selectedCountryId);

	return (
		<Container className={classes.appContainer}>
			<h1 className={classes.title}>Gold Medals by Country</h1>
			<Grid container spacing={3}>
				{/* Country components showing increment and decrement buttons */}
				{countriesList.map((country) => (
					<Grid item xs={12} sm={6} md={4} key={country.id}>
						<Country key={country.id} data={country} decrementGold={decrementGold} incrementGold={incrementGold} />
					</Grid>
				))}
			</Grid>

			{/* Medal Count Table */}
			<TableContainer item xs={12} sm={6} md={4} className={classes.tableContainer} component={Paper}>
				<Table aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Country</TableCell>
							<TableCell align='right'>Gold Medals</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{countriesList.map((country) => (
							<TableRow key={country.id}>
								<TableCell component='th' scope='row'>
									{country.name}
								</TableCell>
								<TableCell align='right'>{country.gold}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}

export default App;
