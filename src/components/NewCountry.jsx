/** @format */

import React from "react";
import { Fab, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

class NewCountry extends React.Component {
	state = {
		open: false,
		name: "",
		countriesList: [],
	};

	addCountry = () => {
		const { countriesList } = this.state;
		const newCountryId = countriesList.length > 0 ? Math.max(...countriesList.map((country) => country.id)) + 1 : 1;

		this.setState({
			countriesList: [
				...countriesList,
				{
					id: newCountryId,
					name: this.state.name,
					gold: 0,
					silver: 0,
					bronze: 0,
				},
			],
		});
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = () => {
		if (this.state.name.length > 0) {
			this.props.addCountry(this.state.name);
			this.handleClose();
		}
	};

	render() {
		return (
			<div>
				<Tooltip title='Add New Country' style={{ fontSize: "2rem" }}>
					<Fab color='primary' aria-label='add' onClick={this.handleClickOpen}>
						<AddIcon />
					</Fab>
				</Tooltip>

				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'>
					<DialogTitle id='alert-dialog-title'>{"Add Country"}</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin='dense'
							id='name'
							name='name'
							label='Country Name'
							type='text'
							fullWidth
							onChange={this.handleChange}
							value={this.state.name}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color='secondary'>
							Cancel
						</Button>
						<Button onClick={this.handleSubmit} color='primary' autoFocus>
							Add
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default NewCountry;
