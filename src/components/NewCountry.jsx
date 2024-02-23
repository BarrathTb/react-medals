import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    TextField,
    Tooltip
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";


function NewCountry({ onShowToast, addCountry }) { // Notice addCountry is now received via props

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAddCountry();
            event.preventDefault(); // Prevent the default action to avoid form submission
        }
    };

    const handleAddCountry = async () => {
        const newName = name.trim();
        if (!newName) {
            onShowToast("Please enter a country name!");
            return;
        }

        try {
            // Call the addCountry function passed via props
            await addCountry(newName);
            onShowToast(`Added ${newName}!`);
            setOpen(false);
            setName("");
        } catch (error) {
            onShowToast("Failed to add country!");
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName("");
    };

    const handleChange = (event) => {
        setName(event.target.value);
    };

    return (
        <div>
            <Tooltip title='Add New Country'>
                <Fab color='primary' aria-label='add' onClick={handleClickOpen}>
                    <AddIcon />
                </Fab>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
                onKeyDown={handleKeyPress}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'>
                <DialogTitle id='alert-dialog-title'>{"Add New Country"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        name='name'
                        label='Country Name'
                        type='text'
                        fullWidth
                        onChange={handleChange}
                        value={name}
                        onKeyPress={handleKeyPress} // Add this line to listen for the Enter key
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='secondary'>
                        Cancel
                    </Button>
                    <Button onClick={handleAddCountry} color='primary' autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewCountry;
