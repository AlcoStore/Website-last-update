import React from "react";
import { Link } from "react-router-dom";
import lcoLogo from "../../Images/IcoLogo.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGithub, FaLinkedin, FaRegCalendarAlt } from "react-icons/fa";
import Button from "@material-ui/core/Button/index";
import MyAccount from '../../components/MyAccount';
import fire from "../../Firebase/Fire";

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
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

  render() {
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
            <div style={{position: 'absolute', right: '0'}}>
              {this.state.user ? <MyAccount className='SignInUpUserLinks'/> : null}
            </div>
          </Toolbar>
        </AppBar>
        <div className="AbousUsMainDiv">
          <div className="AboutUsContentDiv AboutUsContentDivLeft">
            <FontAwesomeIcon icon="user" className="AboutUsContentDivIcon" />
            <div className="AboutUsContentDivBody">
              <div className="AboutUsContentDivBodyImage">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                  alt="person"
                />
              </div>
              <div className="AboutUsContentDivContent">
                <h4>Stepan Abgaryan</h4>
                <span>
                  <FaRegCalendarAlt className="AboutUsContentDivDescIcons" /> 19
                  May 1994
                </span>
                <br />
                <br />
                <div className="AboutUsContentDivDesc">
                  Description About Me
                  <br />
                  <br />
                  <a
                    href="https://stepanabgaryan.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      className="SignUpCardGridInput"
                    >
                      View Portfolio
                    </Button>
                  </a>
                </div>
                <div className="AboutUsContentDivLinks">
                  <span>Follow us on:</span>
                  <a
                    href="https://github.com/stepanabgaryan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="AboutUsContentDivDescIcons AboutUsContentDivDescIcons1" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/stepan-abgaryan-6b6727170/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="AboutUsContentDivDescIcons AboutUsContentDivDescIcons2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="AboutUsContentDivRow"></div>
          <div className="AboutUsContentDiv AboutUsContentDivRight">
            <FontAwesomeIcon icon="user" className="AboutUsContentDivIcon" />
            <div className="AboutUsContentDivBody">
              <div className="AboutUsContentDivBodyImage">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                  alt="person"
                />
              </div>
              <div className="AboutUsContentDivContent">
                <h4>Veronika Jaghinyan</h4>
                <span>
                  <FaRegCalendarAlt className="AboutUsContentDivDescIcons" /> 31
                  October 1994
                </span>
                <br />
                <br />
                <div className="AboutUsContentDivDesc">
                  Description About Me
                  <br />
                  <br />
                  <a
                    href="https://veronika-jaghinyan.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      className="SignUpCardGridInput"
                    >
                      View Portfolio
                    </Button>
                  </a>
                </div>
                <div className="AboutUsContentDivLinks">
                  <span>Follow us on:</span>
                  <a
                    href="https://github.com/veronika-jaghinyan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="AboutUsContentDivDescIcons AboutUsContentDivDescIcons1" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/veronika-jaghinyan-3743609b/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="AboutUsContentDivDescIcons AboutUsContentDivDescIcons2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="AboutUsContentDivRow"></div>
          <div className="AboutUsContentDiv AboutUsContentDivLeft">
            <FontAwesomeIcon icon="user" className="AboutUsContentDivIcon" />
            <div className="AboutUsContentDivBody">
              <div className="AboutUsContentDivBodyImage">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                  alt="person"
                />
              </div>
              <div className="AboutUsContentDivContent">
                <h4>Gevorg Mamikonyan</h4>
                <span>
                  <FaRegCalendarAlt className="AboutUsContentDivDescIcons" />
                  16 October 1991
                </span>
                <br />
                <br />
                <div className="AboutUsContentDivDesc">
                  Description About Me
                  <br />
                  <br />
                  <a
                    href="https://www.youtube.com/</div>"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      className="SignUpCardGridInput"
                    >
                      View Portfolio
                    </Button>
                  </a>
                </div>
                <div className="AboutUsContentDivLinks">
                  <span>Follow us on:</span>
                  <a
                    href="https://github.com/Gev76"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="AboutUsContentDivDescIcons AboutUsContentDivDescIcons1" />
                  </a>
                  <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="AboutUsContentDivDescIcons AboutUsContentDivDescIcons2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="AboutUsContentDivRow"></div>
          <div className="AboutUsContentDiv AboutUsContentDivRight">
            <FontAwesomeIcon icon="user" className="AboutUsContentDivIcon" />
            <div className="AboutUsContentDivBody">
              <div className="AboutUsContentDivBodyImage">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                  alt="person"
                />
              </div>
              <div className="AboutUsContentDivContent">
                <h4>Julieta Petrosyan</h4>
                <span>
                  <FaRegCalendarAlt className="AboutUsContentDivDescIcons" /> 04
                  February 1997
                </span>
                <br />
                <br />
                <div className="AboutUsContentDivDesc">
                  Description About Me
                  <br />
                  <br />
                  <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      className="SignUpCardGridInput"
                    >
                      View Portfolio
                    </Button>
                  </a>
                </div>
                <div className="AboutUsContentDivLinks">
                  <span>Follow us on:</span>
                  <a
                    href="https://github.com/JuliaPetrosyan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="AboutUsContentDivDescIcons AboutUsContentDivDescIcons1" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/julieta-petrosyan-137983189/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="AboutUsContentDivDescIcons AboutUsContentDivDescIcons2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
