import React from "react";
import fire from "../../Firebase/Fire";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import lcoLogo from "../../Images/IcoLogo.png";
import firebase from "firebase";
import DeleteDialog from "../../components/AccountDeleteDialog";
import PasswordChange from "../../components/AccountChangePassword";
import MyAccount from "../../components/MyAccount";
import Loader from '../../components/Loader';

const styles = () => ({
  card: {
    width: 450
  },
  wrapper: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 15
  }
});

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordDialog: false,
      user: null,
      name: "",
      surname: "",
      birthDate: "",
      gender: "",
      number: "",
      email: "",
      password: "",
      passwordConf: "",
      redirect: false,
      passwordChange: false,
      numberValid: true,
      emailValid: true,
      loader: true
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user, loader: false });
        localStorage.setItem("user", user.uid);
        this.getUserData();
        this.setState({ passwordConf: "" });
      } else {
        this.setState({ user: null, redirect: true });
        localStorage.removeItem("user");
      }
    });
  };

  getUserData = () => {
    const db = fire.firestore();
    db.collection("users")
      .doc(fire.auth().currentUser.uid)
      .get()
      .then(db =>
        this.setState({
          name: db.data().name,
          surname: db.data().surname,
          birthDate: db.data().age,
          gender: db.data().gender,
          number: db.data().number,
          email: db.data().email,
          password: db.data().password
        })
      );
  };

  showNewPassword = () => {
    this.setState({ passwordChange: !this.state.passwordChange });
  };

  handleDataUpdate = () => {
    const { email, number } = this.state;
    let emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );
    let numberValidF = number.charAt(0) === "+";
    let numberValid = numberValidF && /^\+?[0-9]+$/.test(number);

    this.setState({
      numberValid: numberValid,
      emailValid: emailValid
    });
    if (emailValid && numberValid) {
      const db = fire.firestore();
      db.collection("users")
        .doc(fire.auth().currentUser.uid)
        .update({ email: this.state.email, number: this.state.number });
    }
    this.setState({ passwordConf: "" });
  };

  handleInputChange = (event, type) => {
    this.setState({
      [type]: event.target.value
    });
  };

  handlePasswordDialog = () => {
    this.setState({ passwordDialog: !this.state.passwordDialog });
  };

  changeEmail = () => {
    const user = fire.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      this.state.password
    );
    user.reauthenticateWithCredential(credential).then(() => {
      user.updateEmail(this.state.email);
    });
  };

  render() {
    const { classes } = this.props;
    const {
      name,
      surname,
      birthDate,
      gender,
      number,
      email,
      password,
      passwordConf,
      redirect,
      passwordDialog,
      passwordChange,
      numberValid,
      emailValid,
      user,
      loader
    } = this.state;
    return (
      <div>
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
            <div style={{ position: "absolute", right: "0" }}>
              {user ? <MyAccount className="SignInUpUserLinks" /> : null}
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.wrapper}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                My Profile
              </Typography>
              <br />
              <div className="SignUpCardGridDiv">
                <TextField
                  disabled
                  id="outlined-name-input"
                  label="Name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  margin="normal"
                  variant="outlined"
                  onChange={e => this.handleInputChange(e, "name")}
                  value={name}
                  className="SignUpCardGridInput"
                />
                <TextField
                  disabled
                  id="outlined-surname-input"
                  label="Surname"
                  type="text"
                  name="surname"
                  autoComplete="surname"
                  margin="normal"
                  variant="outlined"
                  onChange={e => this.handleInputChange(e, "surname")}
                  value={surname}
                  className="SignUpCardGridInput"
                />
              </div>
              <div className="SignUpCardGridDiv">
                <TextField
                  disabled
                  id="date"
                  label="Birth Date"
                  // type="date"
                  margin="normal"
                  variant="outlined"
                  onChange={e => this.handleInputChange(e, "birthDate")}
                  value={birthDate}
                  className="SignUpCardGridInput"
                />
                <TextField
                  disabled
                  id="outlined-select-currency-native"
                  // select
                  label="Gender"
                  value={gender}
                  onChange={e => this.handleInputChange(e, "gender")}
                  SelectProps={{
                    native: true
                  }}
                  margin="normal"
                  variant="outlined"
                  className="SignUpCardGridInput"
                >
                  <option value="" disabled></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </TextField>
              </div>
              <div className="SignUpCardGridDiv">
                <TextField
                  error={!numberValid}
                  id="outlined-phone-input"
                  label="Phone number"
                  type="text"
                  name="number"
                  autoComplete="number"
                  margin="normal"
                  variant="outlined"
                  onChange={e => this.handleInputChange(e, "number")}
                  value={number}
                  className="SignUpCardGridInput"
                />
                <TextField
                  error={!emailValid}
                  id="outlined-email-input"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                  onChange={e => this.handleInputChange(e, "email")}
                  value={email}
                  className="SignUpCardGridInput"
                />
              </div>
              <Typography color="textSecondary">
                To make changes in your personal data, you should confirm your
                password.
              </Typography>
              <div className="SignUpCardGridDiv">
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  name="passwordConf"
                  margin="normal"
                  variant="outlined"
                  onChange={e => this.handleInputChange(e, "passwordConf")}
                  className="SignUpCardGridInput"
                  value={passwordConf}
                />
              </div>
            </CardContent>
            <CardActions className="SignUpCardGridCardAction">
              <div className="SignUpCardGridDiv">
                <Button
                  variant="outlined"
                  onClick={this.handleDataUpdate}
                  disabled={
                    !(
                      email &&
                      gender &&
                      birthDate &&
                      name &&
                      surname &&
                      number &&
                      number.length === 12 &&
                      password === passwordConf
                    )
                  }
                >
                  Confirm changes
                </Button>
                <Button variant="outlined" onClick={this.showNewPassword}>
                  Change password
                </Button>
                <Button variant="outlined" onClick={this.handlePasswordDialog}>
                  Delete Account
                </Button>
              </div>
              {passwordDialog ? (
                <DeleteDialog
                  open={passwordDialog}
                  handlePasswordDialog={this.handlePasswordDialog}
                />
              ) : null}
              {passwordChange ? (
                <PasswordChange
                  open={passwordChange}
                  showNewPassword={this.showNewPassword}
                />
              ) : null}
              {redirect && <Redirect to="/" />}
              {loader && <Loader/>}
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

MyProfile.propTypes = {
  classes: PropTypes.shape({
    card: PropTypes.string,
    wrapper: PropTypes.string
  })
};

export default withStyles(styles)(MyProfile);
