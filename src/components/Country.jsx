import React from "react";
import {
  Card,
  CardContent,
  Typography,
  
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Medals from "./Medals";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles((theme) => {
	return {
		cardContainer: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			marginTop: "auto",
			width: "100%",

			backgroundColor: theme.palette.background.default,
			color: theme.palette.text.secondary,
		},
		goldMedalIcon: {
			verticalAlign: "middle",
			color: theme.palette.warning.main,
		},
		cardContents: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			margin: "auto",
			maxwidth: "80%",
		},
	};
});

function Country({ country, decrementMedals, incrementMedals, deleteCountry }) {
	const classes = useStyles();
	const incrementGold = () => incrementMedals(country.id, "gold");
	const decrementGold = () => decrementMedals(country.id, "gold");
	const incrementSilver = () => incrementMedals(country.id, "silver");
	const decrementSilver = () => decrementMedals(country.id, "silver");
	const incrementBronze = () => incrementMedals(country.id, "bronze");
	const decrementBronze = () => decrementMedals(country.id, "bronze");

	return (
		<div className={classes.cardContainer}>
			<Card variant='outlined' style={{ width: "100%" }}>
				<CardContent className={classes.cardContents}>
					<Typography color='textSecondary' gutterBottom>
            Country Name: {country.name}
            <IconButton onClick={() => deleteCountry(country.id)}>
              <DeleteIcon />
            </IconButton>
					</Typography>

					<Medals
						color='gold'
						medalCount={country.gold}
						onIncrement={() => incrementGold("gold")}
						onDecrement={() => decrementGold("gold")}
					/>
					<Medals
						color='silver'
						medalCount={country.silver}
						onIncrement={() => incrementSilver("silver")}
						onDecrement={() => decrementSilver("silver")}
					/>
					<Medals
						color='bronze'
						medalCount={country.bronze}
						onIncrement={() => incrementBronze("bronze")}
						onDecrement={() => decrementBronze("bronze")}
					/>
				</CardContent>
			</Card>
		</div>
	);
}

export default Country;
