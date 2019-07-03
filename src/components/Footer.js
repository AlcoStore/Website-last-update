import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import fire from "../Firebase/Fire";

library.add(faGithub);

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      open: false,
      anchorRef: React.createRef(null),
    };
  }

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  };

  componentDidMount() {
    this.authListener();
  }

  handleClose = (event, cat) => {
    const { anchorRef } = this.state;
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    this.setState({
      open: false
    });
    const { onCatChanged } = this.props;
    if (cat) {
      onCatChanged(cat);
    }
  };

  render() {
    return (
      <div className="footer">
        <AppBar
          position="static"
          color="default"
          style={{ backgroundColor: "rgb(40, 40, 39)", height: "100%" }}
        >
          <div className='upperFooter'>
            <div className='footerLinkNames'>
              <a
                href="http://localhost:3000/about-us"
                rel="noopener noreferrer"
                className='footerLinkNames'
              >
                About Us
              </a>
            </div>
            <div className='footerLinkNames'>
              <a
                href="http://localhost:3000/"
                rel="noopener noreferrer"
                className='footerLinkNames'
              >
                Home
              </a>
            </div>
            <div  className='footerLinkNames'>
              {!this.state.user ? (<a
                href="http://localhost:3000/sign-in"
                rel="noopener noreferrer"
                className='footerLinkNames'
              >
              Login
              </a>) : (<a
                href="http://localhost:3000/my-profile"
                rel="noopener noreferrer"
                className='footerLinkNames'
                >
                My Profile
                </a>)}
            </div>
          </div>
            <div variant="h6" color="inherit" style={{ color: "white", paddingBottom: '10px' }}>
              © {new Date().getFullYear()} All Rights Reserved. Design By
              AlcoStore.
            </div>
        </AppBar>
      </div>
    );
  }
}

export default Footer;
