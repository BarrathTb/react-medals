import {
    Card,
    CardContent, CardHeader
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBack, Save } from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";
import Medals from './Medals';





const useCountryStyles = makeStyles((theme) => {
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
			
        },
        cardHeader: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			margin: "1rem",
            
            fontSize: "1.25rem",
		},
	};
});


function Country({ country, medals = [], decrementMedals, incrementMedals, deleteCountry, onSave, onReset }) {
    const classes = useCountryStyles();

    return (
        <div className={classes.cardContainer}>
            <Card variant='outlined' style={{ width: "100%" }}>
                <CardHeader 
                    className={classes.cardHeader}
                    titleTypographyProps={{ color: 'textSecondary', gutterBottom: true }}
                    title={`Country Name: ${country.name}`}
                    action={
                        <>
                            <IconButton onClick={() => deleteCountry(country.id)}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={() => onSave(country.id)}> {/* Pass only the country ID */}
                                <Save />
                            </IconButton>
                            <IconButton onClick={() => onReset(country.id)}> {/* Pass only the country ID */}
                                <ArrowBack />
                            </IconButton>
                        </>
                    }
                />

                <CardContent className={classes.cardContents}>
                    <Medals 
                        medals={
                            medals.map(medal => ({
                                ...medal,
                                count: country[medal.name].page_value
                            }))
                        } 
                        country={country}
                        incrementMedals={incrementMedals}
                        decrementMedals={decrementMedals}
                    />                       
                </CardContent>
            </Card>
        </div>
    );
}

export default Country;

