import React from "react";
import {
  Card,
  CardContent,
  Typography,
  
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Medals from "./Medals";


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

function Country({ data, decrementMedals, incrementMedals }) {
	const classes = useStyles();
	const incrementGold = () => incrementMedals(data.id, "gold");
	const decrementGold = () => decrementMedals(data.id, "gold");
	const incrementSilver = () => incrementMedals(data.id, "silver");
	const decrementSilver = () => decrementMedals(data.id, "silver");
	const incrementBronze = () => incrementMedals(data.id, "bronze");
	const decrementBronze = () => decrementMedals(data.id, "bronze");

	return (
		<div className={classes.cardContainer}>
			<Card variant='outlined' style={{ width: "100%" }}>
				<CardContent className={classes.cardContents}>
					<Typography color='textSecondary' gutterBottom>
						Country Name: {data.name}
					</Typography>

					<Medals
						color='gold'
						medalCount={data.gold}
						onIncrement={() => incrementGold("gold")}
						onDecrement={() => decrementGold("gold")}
					/>
					<Medals
						color='silver'
						medalCount={data.silver}
						onIncrement={() => incrementSilver("silver")}
						onDecrement={() => decrementSilver("silver")}
					/>
					<Medals
						color='bronze'
						medalCount={data.bronze}
						onIncrement={() => incrementBronze("bronze")}
						onDecrement={() => decrementBronze("bronze")}
					/>
				</CardContent>
			</Card>
		</div>
	);
}

export default Country;
