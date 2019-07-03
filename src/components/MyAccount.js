import React, { Component } from "react";
import fire from "../Firebase/Fire";
import Avatar from "@material-ui/core/Avatar";
import { Redirect } from "react-router";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.getInitials = this.getInitials.bind(this);
    this.state = {
      myAccount: false,
      redirect: false,
      initials: "",
      anchorEl: null
    };
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  componentDidMount() {
    this.authListener();
    this.getInitials();
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMyAccount = () => {
    this.setState({
      myAccount: true
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  getInitials() {
    const db = fire.firestore();
    let docRef = db.collection("users").doc(fire.auth().currentUser.uid);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({ initials: doc.data().initials });
        } else {
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }

  logout() {
    fire.auth().signOut();
    this.setState({ redirect: true });
  }

  render() {
    const { redirect, initials, anchorEl, myAccount } = this.state;
    return (
      <div>
        <div>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <Avatar style={{color: '#4f4f4d'}}>{initials}</Avatar>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleMyAccount}>Profile</MenuItem>
            <MenuItem onClick={this.logout}>Logout</MenuItem>
          </Menu>
        </div>
        {myAccount && <Redirect to="/my-profile" /> }
        {redirect && <Redirect to="/" />}
      </div>
    );
  }
}

export default MyAccount;
