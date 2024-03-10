import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToApp'; // You can choose an icon that suits your needs
import React, { useState } from 'react';

const Logout = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  const handleModalKeyPress = (e) => e.key === 'Enter' && handleLogout();
  const handleLogout = () => {
    props.onLogout();
    handleModalClose();
  }

  return (
    <React.Fragment>
      {/* Change the Nav.Link to an IconButton */}
      <IconButton onClick={handleModalShow}><LogoutIcon /></IconButton>
      {/* Below is the updated Modal using Material-UI's Dialog components */}
      <Dialog onKeyPress={handleModalKeyPress} open={showModal} onClose={handleModalClose}>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent dividers>
            Click Logout to continue
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary">
            Close
          </Button>
          <Button onClick={handleLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Logout;
