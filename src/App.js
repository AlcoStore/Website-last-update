import React from "react";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./pages/Main/Main";
import BasketList from "./pages/BasketList/BasketList";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { Redirect } from "react-router";
import DeleteAccount from "./pages/AccountDeletePage/AccountDeletePage";
import MyProfile from "./pages/MyProfile/MyProfile";
import AboutUs from './pages/AboutUs/AboutUs.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: false,
      signUp: false
    };
  }

  render() {
    const NotFoundRedirect = () => <Redirect to="/not-found-page" />;
    return (
      <Router>
        <div>
          <Link to='/'></Link>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/basket" component={BasketList}/>
            <Route path="/my-profile" component={MyProfile} />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/delete-account" component={DeleteAccount} />
            <Route path="/not-found-page" component={NotFoundPage} />
            <Route component={NotFoundRedirect} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
