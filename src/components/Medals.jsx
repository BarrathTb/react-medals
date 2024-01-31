
import React from 'react';
import { Button, Typography } from "@material-ui/core";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    delCardBtn: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(0.5),
        width: "100%",
        color: theme.palette.common.white,
        backgroundColor: theme.palette.secondary.main, // Make sure to refer to a color value like main or light or dark
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },

    medalContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		margin: theme.spacing(1), // Changed marginRight to theme.spacing(2)
		padding: theme.spacing(1),
	},


    goldMedalIcon: {
        verticalAlign: "middle",
        color: theme.palette.warning.main, // Make sure to refer to a color value like main or light or dark
        padding: theme.spacing(0.5),
    },

    addCardBtn: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(0.5),
        width: "100%",
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main, // Make sure to refer to a color value like main or light or dark
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
}));

function Medals({ color, medalCount, onIncrement, onDecrement }) {
  const classes = useStyles();

  return (
    <div className={classes.medalContainer}>
      <Typography className={classes.goldMedalIcon} variant='h6'>
        {color.charAt(0).toUpperCase() + color.slice(1)} Medals: {medalCount} 
        <EmojiEventsIcon className={classes.goldMedalIcon} style={{ color }} />
      </Typography>
      <Button className={classes.addCardBtn} onClick={() => onIncrement()}>
        Add {color.charAt(0).toUpperCase() + color.slice(1)} Medal
      </Button>
      {medalCount > 0 && (
        <Button className={classes.delCardBtn} onClick={() => onDecrement()}>
          Remove {color.charAt(0).toUpperCase() + color.slice(1)} Medal
        </Button>
      )}
    </div>
  );
}

export default Medals;
