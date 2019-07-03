import React from "react";
import fire from "../../Firebase/Fire";
import { Redirect } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import lcoLogo from "../../Images/IcoLogo.png";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Footer from "../../components/Footer";
import firebase from "firebase";

class DeleteAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      redirect: false,
      passwordConf: "",
      user: null,
      email: "",
      toMyProfile: false,
      toHome: false,
      loader: false
    };
  }

  handleInputChange = (event, type) => {
    this.setState({
      [type]: event.target.value
    });
  };

  componentDidMount() {
    this.authListener();
  }

  changeHome = () => {
    this.setState({
      toHome: true
    });
  };

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
        this.getUserData();
      } else {
        this.setState({ user: null, toHome: true });
        localStorage.removeItem("user");
      }
    });
  };

  getUserData = () => {
    this.setState({loader: true})
    const db = fire.firestore();
    db.collection("users")
      .doc(fire.auth().currentUser.uid)
      .get()
      .then(db =>
        this.setState({
          email: db.data().email,
          password: db.data().password,
          loader: false
        })
      );
  };

  deleteAccount = () => {
    const user = fire.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      this.state.password
    );

    user.reauthenticateWithCredential(credential).then(() => {
      this.setState({loader: true})
      user.delete();
      const db = fire.firestore();
      db.collection("users")
        .doc(fire.auth().currentUser.uid)
        .delete();
      this.changeHome();
    }).then (()=> {this.setState({loader: false})});
  };

  handleBack = () => {
    this.setState({
      toMyProfile: true
    });
  };

  render() {
    const { password, passwordConf, toMyProfile, toHome } = this.state;
    return (
      <div className="SignInUpPageMain main-wrap">
        <AppBar position="static" className="HeaderContainerAppBar">
          <Toolbar>
            <div className="LogoForAlcoStoreContainer1">
              <Link to="/">
                <img
                  src={lcoLogo}
                  alt={lcoLogo}
                  className="ImageForAlcoStoreContainer"
                />
              </Link>
            </div>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <div className="SignInCardDiv">
          <Card className="SignInCard">
            <CardContent>
              <div>
                <Typography variant="h5" component="h2">
                  Deleting account
                </Typography>
                <Typography variant="h5" component="h2"></Typography>
              </div>
              <Typography color="textSecondary" gutterBottom>
                We are sorry, that you have decided to delete your personal
                account from AlcoStore official website. To confirm your
                decision you should enter your password below.
              </Typography>

              <div>
                <TextField
                  id="outlined-input"
                  label="Password"
                  type="password"
                  name="password"
                  autoComplete="password"
                  margin="normal"
                  variant="outlined"
                  onChange={e => this.handleInputChange(e, "passwordConf")}
                  value={passwordConf}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                variant="outlined"
                // color="grey"
                onClick={this.deleteAccount}
                disabled={!(password && password === passwordConf)}
                href="#text-buttons"
              >
                Delete my Account
              </Button>
              <Button variant="outlined" onClick={this.handleBack}>
                Back to my Account
              </Button>
              {toMyProfile && <Redirect to="/my-profile" />}
              {toHome && <Redirect to="/" />}
            </CardActions>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
}

export default DeleteAccount;
