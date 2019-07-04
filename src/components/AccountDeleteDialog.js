import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router";

class DeleteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      redirect: false
    };
  }

  closePopup = () => {
    this.props.handlePasswordDialog();
  };

  goToDeletePage = () => {
    this.setState({
      redirect: true
    });
  };

  render() {
    const { open, redirect } = this.state;
    return (
      <div>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={this.handleClose}
        >
          <DialogTitle id="alert-dialog-title" onClose={this.handleClose}>
            DELETE ACCOUNT
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete your account from AlcoStore?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={this.goToDeletePage}
              color="primary"
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={this.closePopup}
              color="primary"
              autoFocus
            >
              Cancel
            </Button>
            {redirect ? <Redirect to="/delete-account" /> : null}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteDialog;
