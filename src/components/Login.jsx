import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  iconButton: {
    padding: theme.spacing(1),
  },
}));

const Login = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => {
    setShowModal(true);
    setUsername("");
    setPassword("");
  }
  const handleModalKeyPress = (e) => username.length > 0 && password.length > 0 && e.key === 'Enter' && handleLogin();
  const handleLogin = () => {
    props.onLogin(username, password);
    handleModalClose();
  }

  return (
    <React.Fragment>
      <IconButton className={classes.iconButton} onClick={handleModalShow}><AccountCircleIcon /></IconButton>
      <Dialog open={showModal} onClose={handleModalClose} onKeyPress={handleModalKeyPress}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Enter username"
            autoFocus
            autoComplete='off'
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter password"
            autoComplete='off'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary">
            Close
          </Button>
          <Button onClick={handleLogin} color="primary" disabled={!(username.length > 0 && password.length > 0)}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Login;
