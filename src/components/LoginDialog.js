import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router";

class LoginPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.show,
      goToLogin: false,
      goToRegister: false
    };
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLogin = () => {
    this.setState({
      goToLogin: true
    });
  };

  handleRegister = () => {
    this.setState({
      goToRegister: true
    });
  };

  render() {
    const { open, goToRegister, goToLogin } = this.state;
    return (
      <div>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={this.handleClose}
        >
          <DialogTitle id="alert-dialog-title" onClose={this.handleClose}>
            {"Welcome to Alco Store"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              To do some shopping you should log in to your personal account
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              fullWidth
              onClick={this.handleLogin}
              color="primary"
            >
              I have an account
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={this.handleRegister}
              color="primary"
              autoFocus
            >
              Register
            </Button>
          </DialogActions>
          {goToRegister ? <Redirect to="/sign-up" /> : null}
          {goToLogin ? <Redirect to="/sign-in" /> : null}
        </Dialog>
      </div>
    );
  }
}

export default LoginPopup;
