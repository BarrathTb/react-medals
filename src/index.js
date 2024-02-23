/** @format */

import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const darkPaletteColors = {
	darkBlue: "#1565c0",
	deepPurple: "#673ab7",
	darkRed: "#b71c1c",

	darkLime: "#afb42b",
	darkOrange: "#f57c00",
	lightOrange: "#df8c00",
};

const customShadows = [
	"none",
	"0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
];
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
			shadows: customShadows,
		},
		shadows: customShadows,
	},
});

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>
);
