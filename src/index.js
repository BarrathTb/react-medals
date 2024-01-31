/** @format */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const darkPaletteColors = {
	darkBlue: "#1565c0",
	deepPurple: "#673ab7",
	darkRed: "#b71c1c",

	darkLime: "#afb42b",
	darkOrange: "#f57c00",
	lightOrange: "#df8c00",
};

const theme = createTheme({
	palette: {
		type: "dark",
		primary: {
			main: darkPaletteColors.darkBlue,
			contrastText: "#fff",
		},
		secondary: {
			main: darkPaletteColors.darkRed,
			contrastText: "#fff",
		},
		error: {
			main: darkPaletteColors.darkOrange,
		},
		info: {
			main: darkPaletteColors.lightOrange,
		},
		success: {
			main: darkPaletteColors.deepPurple,
		},
		background: {
			default: "#101010",
			paper: "#323232",
		},
		text: {
			primary: "#fff",
			secondary: "#e0e0e0",
		},
		action: {
			active: darkPaletteColors.darkOrange,
			hover: darkPaletteColors.lightOrange + "26",
			selected: darkPaletteColors.darkOrange + "50",
		},
	},
});

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>,
	document.querySelector("#root")
);
