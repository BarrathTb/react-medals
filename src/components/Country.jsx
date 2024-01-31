import React from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  
} from "@material-ui/core";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
	return {
		cardContainer: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			marginTop: "auto",

			backgroundColor: theme.palette.background.default,
			color: theme.palette.text.secondary,
		},
		goldMedalIcon: {
			verticalAlign: "middle",
			color: theme.palette.warning.main,
		},
		cardContents: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-evenly",
			alignItems: "center",
			margin: "auto",
		},
		delCardBtn: {
			marginTop: theme.spacing(1),
			padding: theme.spacing(1.5),
      width: "100%",
      color: theme.palette.common.white,
			"&:hover": {
				backgroundColor: theme.palette.secondary.dark,
			},
			[theme.breakpoints.down("sm")]: {
				width: "100%",
			},
		},
    addCardBtn: {
      marginTop: theme.spacing(1),
			padding: theme.spacing(1.5),
			width: "100%",
			color: theme.palette.common.white,
			"&:hover": {
				backgroundColor: theme.palette.primary.dark,
			},
			[theme.breakpoints.down("sm")]: {
				width: "100%",
			},
		},
	};
});
function Country({ data, decrementGold, incrementGold }) {
	const classes = useStyles();

	return (
		<div className={classes.cardContainer}>
			<Card variant='outlined'>
				<CardContent className={classes.cardContents}>
					<Typography color='textSecondary' gutterBottom>
						Country Name: {data.name}
					</Typography>
					<Typography variant='h5'>
						Gold Medals: {data.gold} <EmojiEventsIcon className={classes.goldMedalIcon} />
					</Typography>
					<Button
						className={classes.addCardBtn}
						variant='contained'
						color='primary'
						onClick={() => incrementGold(data.id)}>
						Add Gold Medal
					</Button>
					{data.gold > 0 && (
						<Button
							className={classes.delCardBtn}
							variant='contained'
							color='secondary'
							onClick={() => decrementGold(data.id)}>
							Remove Gold Medal
						</Button>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

export default Country;
