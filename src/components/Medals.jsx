
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import React from 'react';



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

    goldMedalIcon: {
        verticalAlign: "middle",
        color: "#FFD700", // Gold color using a hex code
        padding: theme.spacing(0.5),
    },
    silverMedalIcon: {
        verticalAlign: "middle",
        color: "#C0C0C0", // Silver color using a hex code
        padding: theme.spacing(0.5),
    },
    bronzeMedalIcon: {
        verticalAlign: "middle",
        color: "#CD7F32", // Bronze color using a hex code
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
  const classes = useMedalStyles();

  return (
    <div>
      {medals.map((medal) => (
        <div key={medal.name} className={classes.medalContainer}>
          <Typography className={classes[`${medal.name}MedalIcon`]} variant="h6">
            {`${medal.name.charAt(0).toUpperCase() + medal.name.slice(1)} Medals: ${country[medal.name].saved_value}`}
            <EmojiEventsIcon />
          </Typography>
          <Button
            className={classes.addCardBtn}
            onClick={() => {
              console.log('Incrementing medal:', medal.name);
              incrementMedals(country.id, medal.name)
            }}
          >
            {`Add ${medal.name.charAt(0).toUpperCase() + medal.name.slice(1)} Medal`}
          </Button>
          {country[medal.name].page_value > 0 && (
            <Button
              className={classes.delCardBtn}
              onClick={() => {
                console.log('Decrementing medal:', medal.name);
                decrementMedals(country.id, medal.name)
              }}
            >
              {`Remove ${medal.name.charAt(0).toUpperCase() + medal.name.slice(1)} Medal`}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Medals;
