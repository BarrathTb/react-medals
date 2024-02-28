
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import React from 'react';
import '../App.css';
import coinImage from '../coin.png';
import { useMarioCoinAnimation } from "./MarioCoin";



const useMedalStyles = makeStyles((theme) => ({
    delCardBtn: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(0.5),
        width: "100%",
        color: theme.palette.common.white,
        boxShadow: theme.shadows[6],
        backgroundColor: theme.palette.secondary.main,
        
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
        },
        "&:active": {
            transform: 'translateY(1px)',
            boxShadow: theme.shadows[1],
        },
        
    },

    medalContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
  },
    cardContents: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			margin: "auto",
			
        },

    goldMedalIcon: {
        verticalAlign: "middle",
        color: "#FFD700",
        padding: theme.spacing(0.5),
        alignItems: "center",
  },
    
    silverMedalIcon: {
        verticalAlign: "middle",
        color: "#C0C0C0", 
        padding: theme.spacing(0.5),
    },
    bronzeMedalIcon: {
        verticalAlign: "middle",
        color: "#CD7F32", 
        padding: theme.spacing(0.5),
    },

    addCardBtn: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(0.5),
        width: "100%",
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        boxShadow: theme.shadows[2],
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        },
        "&:active": {
            transform: 'translateY(1px)',
            boxShadow: theme.shadows[1],
        },
        
    },
}));


function Medals({ medals = [], country, incrementMedals, decrementMedals }) {
  const { coins, createCoin } = useMarioCoinAnimation();
  const classes = useMedalStyles();

  const handleAddMedal = (medalName) => {
    incrementMedals(country.id, medalName);

    // You need to define x and y based on where you want the coin animation to start
    // For example, they could be based on an event object or calculated from another element's position
    // eslint-disable-next-line no-restricted-globals
    const x = event.clientX;
    // eslint-disable-next-line no-restricted-globals
    const y = event.clientY;
    createCoin(x, y);
  };
 
  

  return (
    <div className={classes.cardContents}>
      {medals.map((medal) => (
        <div key={medal.name} className={classes.medalContainer}>
          <Typography className={classes[`${medal.name}MedalIcon`]} variant="h6">
            {`${medal.name.charAt(0).toUpperCase() + medal.name.slice(1)} Medals: ${country[medal.name]?.page_value ?? 0}`}
            <EmojiEventsIcon className={classes[`${medal.name}MedalIcon`]} />
          </Typography>
          
          {/* Button to add a new medal */}
          <Button
            className={classes.addCardBtn}
            onClick={() => handleAddMedal(medal.name)}
          >
            {`Add ${medal.name.charAt(0).toUpperCase() + medal.name.slice(1)} Medal`}
          </Button>

          {/* Only show the remove button if there is at least one medal of the current type */}
          {country[medal.name]?.page_value > 0 && (
            <Button
              className={classes.delCardBtn}
              onClick={() => decrementMedals(country.id, medal.name)}
            >
              {`Remove ${medal.name.charAt(0).toUpperCase() + medal.name.slice(1)} Medal`}
            </Button>
          )}
        </div>
      ))}
      
      {/* Render coins dynamically based on the coins array */}
      {coins.map((coin) => (
        <div key={coin.key} className="coin" style={{...coin.style, backgroundImage: `url(${coinImage})`}}></div>
      ))}
    </div>
  );
}

export default Medals;