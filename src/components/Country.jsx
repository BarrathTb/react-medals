import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.secondary,
  },
  tableContainer: {
    marginTop: theme.spacing(2),
    maxWidth: "40%",
    boxShadow: theme.shadows[2],
  },
  goldMedalIcon: {
    verticalAlign: "middle",
    color: theme.palette.warning.main,
  },
}));

function Country() {
  const classes = useStyles();
  const [gold, setGold] = useState(0);
  const [country, setCountry] = useState("");
  const [medalTally, setMedalTally] = useState({});

  const handleIncrement = () => {
    setGold((oldGold) => oldGold + 1);
    setMedalTally((prevTally) => ({
      ...prevTally,
      [country]: (prevTally[country] || 0) + 1,
    }));
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    setGold(medalTally[event.target.value] || 0);
  };

  return (
    <div className={classes.cardContainer}>
      <h1 className={classes.title}>Gold Medals by Country</h1>
      <Card variant="outlined">
        <CardContent>
          <FormControl fullWidth>
            <InputLabel id="country-select-label">Country</InputLabel>
            <Select
              labelId="country-select-label"
              id="country-select"
              value={country}
              onChange={handleCountryChange}
            >
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="China">China</MenuItem>
              <MenuItem value="Japan">Japan</MenuItem>
              <MenuItem value="Germany">Germany</MenuItem>
              <MenuItem value="France">France</MenuItem>
              <MenuItem value="Brazil">Brazil</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="Italy">Italy</MenuItem>
              <MenuItem value="Russia">Russia</MenuItem>
              <MenuItem value="South Korea">South Korea</MenuItem>
              <MenuItem value="Australia">Australia</MenuItem>
              <MenuItem value="Netherlands">Netherlands</MenuItem>
              <MenuItem value="Spain">Spain</MenuItem>
              <MenuItem value="Mexico">Mexico</MenuItem>
              <MenuItem value="Indonesia">Indonesia</MenuItem>
              <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
              <MenuItem value="Turkey">Turkey</MenuItem>
              <MenuItem value="United Kingdom">United Kingdom</MenuItem>
            </Select>
          </FormControl>
          <Typography color="textSecondary" gutterBottom>
            Country Name: {country}
          </Typography>
          <Typography variant="h5">
            Gold Medals: {gold}{" "}
            <EmojiEventsIcon className={classes.goldMedalIcon} />
          </Typography>
          <Button variant="contained" color="primary" onClick={handleIncrement}>
            Add Gold Medal
          </Button>
        </CardContent>
      </Card>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell align="right">Gold Medals</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(medalTally).map((entry) => (
              <TableRow key={entry}>
                <TableCell component="th" scope="row">
                  {entry}
                </TableCell>
                <TableCell align="right">{medalTally[entry]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Country;
