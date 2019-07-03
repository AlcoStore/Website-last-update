import React from "react";
import TextField from "@material-ui/core/TextField/index";
import Button from "@material-ui/core/Button/index";
import fire from "../../Firebase/Fire";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import lcoLogo from '../../Images/IcoLogo.png';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Footer from '../../components/Footer';
import Loader from "../../components/Loader";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      email: "",
      emailInUseError:
        "The email address is already in use by another account.",
      invalidEmailError: "The email address is badly formatted.",
      password: "",
      passwordError: "Password should be at least 6 characters",
      passwordConf: "",
      errorMessage: "",
      name: "",
      surname: "",
      number: "+374",
      age: "",
      gender: "",
      userId: "",
      user: null,
      nameValid: true,
      surnameValid: true,
      ageValid: true,
      numberValid: true,
      emailValid: true,
      redirecttosignin: false,
      loader: false
    };
    this.signUp = this.signUp.bind(this);
    this.changeRedirect = this.changeRedirect.bind(this);
  }

  changeRedirect() {
    this.setState({ redirect: true });
  }

  getAge  = (birthDateString) => {
    var today = new Date();
    var birthDate = new Date(birthDateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  handleSignUp = (event) => {
    if (event.keyCode === 13){
      this.signUp(event)
    }
  }

  signUp(e) {
    const {name, surname, age, number, email} = this.state;
this.setState({loader: true})
    let ageValid = this.getAge(age) < 18 ? false : true;
    let nameValid = /^[a-zA-Z]+$/.test(name);
    let surnameValid = /^[a-zA-Z]+$/.test(surname);
    let emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    let numberValidF = number.charAt(0) === '+' ? true : false;
    let numberValid = numberValidF && /^\+?[0-9]+$/.test(number);

    this.setState({
      nameValid: nameValid,
      surnameValid: surnameValid,
      ageValid: ageValid,
      numberValid: numberValid,
      emailValid: emailValid
    })

    if(nameValid && surnameValid && ageValid && numberValid && emailValid) {
      e.preventDefault();
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(cred => {
          const db = fire.firestore();
          cred.user.sendEmailVerification();
          return db.collection("users")
            .doc(cred.user.uid)
            .set({
              name: this.state.name,
              surname: this.state.surname,
              age: this.state.age,
              gender: this.state.gender,
              number: this.state.number,
              email: this.state.email,
              initials: this.state.name[0] + this.state.surname[0],
              password: this.state.password,
            });

        }).then(() => {fire.auth().signOut()}).then(()=> {this.setState({loader: false})}).catch(error => {
        this.setState({
          errorMessage: error,
          email: this.state.email,
          password: "",
          passwordConf: "",
          loader: false
        });
      });
    } else {
      this.setState({loader: false})
    }
  }

  handleInputChange = (event, type) => {
    this.setState({
      [type]: event.target.value
    });
  };

  componentDidMount() {
    this.authListener();
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

  render() {
    const { redirect, email, emailInUseError, invalidEmailError, password, passwordError, passwordConf, errorMessage,
      name, surname, age, gender, number, user, emailValid, nameValid, surnameValid, ageValid, numberValid, loader } = this.state;
    if (user && user.emailVerified) {
      return <Redirect to="/" />;
    } else if(user && !user.emailVerified) {
      return <Redirect to="/sign-in" />;
    } else {
      return (
        <form onSubmit={this.signUp}>
          <div className="SignInUpPageMain main-wrap">
            <AppBar position="static" className="HeaderContainerAppBar">
              <Toolbar>
                <div className='LogoForAlcoStoreContainer1'>
                  <Link to="/">
                    <img src={lcoLogo} alt={lcoLogo} className='ImageForAlcoStoreContainer' />
                  </Link>
                </div>
              </Toolbar>
            </AppBar>
            <Toolbar />
            <div className='SignInCardDiv'>
              <Card className='SignUpCard'>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Registration
                  </Typography>
                  <div className="SignUpCardGridDiv">
                    <TextField
                      error={!nameValid}
                      id="outlined-name-input"
                      label="Name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      margin="normal"
                      variant="outlined"
                      onChange={e => this.handleInputChange(e, "name")}
                      value={name}
                      fullWidth
                      className="SignUpCardGridInput"
                    />
                    <TextField
                      error={!surnameValid}
                      id="outlined-surname-input"
                      label="Surname"
                      type="text"
                      name="surname"
                      autoComplete="surname"
                      margin="normal"
                      variant="outlined"
                      onChange={e => this.handleInputChange(e, "surname")}
                      value={surname}
                      fullWidth
                      className="SignUpCardGridInput"
                    />
                  </div>
                  <div className="SignUpCardGridDiv">
                    <TextField
                      error={!ageValid}
                      id="date"
                      label="Birth Date"
                      type="date"
                      margin="normal"
                      onChange={e => this.handleInputChange(e, "age")}
                      value={age}
                      InputLabelProps={{
                        shrink: true
                      }}
                      fullWidth
                      className="SignUpCardGridInput"
                    />
                    <TextField
                      id="outlined-select-currency-native"
                      select
                      label="Gender"
                      value = {gender}
                      onChange={e => this.handleInputChange(e, "gender")}
                      SelectProps={{
                        native: true,
                      }}
                      margin="normal"
                      variant="outlined"
                      fullWidth
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
                      fullWidth
                      className="SignUpCardGridInput"
                    />
                    <TextField
                      error={
                        errorMessage.message === emailInUseError ||
                        errorMessage.message === invalidEmailError ||
                        !emailValid
                      }
                      id="outlined-email-input"
                      label="Email"
                      type="email"
                      autoComplete="email"
                      margin="normal"
                      variant="outlined"
                      onChange={e => this.handleInputChange(e, "email")}
                      value={email}
                      fullWidth
                      className="SignUpCardGridInput"
                    />
                  </div>
                  <div className="SignUpCardGridDiv">
                    <TextField
                      error={errorMessage.message === passwordError}
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      margin="normal"
                      variant="outlined"
                      onChange={e => this.handleInputChange(e, "password")}
                      value={password}
                      fullWidth
                      className="SignUpCardGridInput"
                    />
                    <TextField
                      error={password !== passwordConf && passwordConf === true}
                      id="outlined-conpassword-input"
                      label="Confirm Password"
                      type="password"
                      name="passwordConf"
                      autoComplete="passwordConf"
                      margin="normal"
                      variant="outlined"
                      onChange={e => this.handleInputChange(e, "passwordConf")}
                      value={passwordConf}
                      fullWidth
                      className="SignUpCardGridInput"
                      onKeyDown={this.handleSignUp}
                    />
                  </div>
                </CardContent>
                <CardActions  className="SignUpCardGridCardAction">
                  <div className="SignUpCardGridDiv">
                    <Button
                      variant="outlined"
                      onClick={this.signUp}
                      disabled={
                        !(
                          email &&
                          password &&
                          gender &&
                          age &&
                          passwordConf &&
                          name &&
                          surname &&
                          number &&
                          number.length === 12 &&
                          password === passwordConf
                        )
                      }
                      fullWidth
                      className="SignUpCardGridInput"
                    >
                      Confirm
                    </Button>
                    <Button variant="outlined" onClick={this.changeRedirect} fullWidth className="SignUpCardGridInput">
                      Go to Login
                    </Button>
                    {redirect && <Redirect to="/sign-in" />}
                  </div>
                </CardActions>
                <div className="SignUpCardGridDiv">
                  {errorMessage !== '' &&
                      <div style={{ display: "flex"}}>
                        <FontAwesomeIcon
                          icon="exclamation-circle"
                          style={{ color: "red", marginLeft: '25px', marginRight: "15px", paddingTop: '5px' }}
                        />
                        <div style={{ color: "red", marginTop: "0px", paddingBottom: '15px'}}>
                          {errorMessage.message}
                        </div>
                      </div>}
                </div>
              </Card>
            </div>
            {loader && <Loader/>}
            <Footer/>
          </div>
        </form>
      );
    }
  }
}

export default SignUp;
