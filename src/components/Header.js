import React from "react";
import "../css/index.css";
import fire from "../Firebase/Fire.js";
import { Link } from "react-router-dom";
import lcoLogo from "../Images/IcoLogo.png";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import InputBase from "@material-ui/core/InputBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import MyAccount from "./MyAccount";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

ElevationScroll.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  window: PropTypes.func
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      open: false,
      anchorRef: React.createRef(null),
      searchlist: "",
      searchvalue: ""
    };
  }

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user && user.emailVerified) {
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

  handleToggle = () => {
    const { open } = this.state;
    this.setState({
      open: !open
    });
  };

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

  handleChange = event => {
    this.setState({
      searchvalue: event.target.value
    });

    const { onSearch } = this.props;
    let searchlist = [];

    if (event.target.value === "") {
      onSearch(searchlist);
    }
  };

  handleSearchClick = event => {
    if (event.keyCode === 13) {
      const { onSearch } = this.props;
      const { searchvalue } = this.state;
      let searchlist = [];

      if (searchvalue) {
        let dinamicProductsbyName = this.props.itemsobj.filter(product => {
          return product.name.toLowerCase().includes(searchvalue.toLowerCase());
        });
        let dinamicProductsbyCat = this.props.itemsobj.filter(product => {
          return product.category.toLowerCase().includes(
            searchvalue.toLowerCase()
          );
        });
        searchlist = dinamicProductsbyName.concat(dinamicProductsbyCat);
      }
      onSearch(searchlist);
    }
  };

  render() {
    const { user, anchorRef, open, searchvalue } = this.state;
    const { basketitemcount } = this.props;

    return (
      <div>
        <React.Fragment>
          <CssBaseline />
          <ElevationScroll {...this.props}>
            <AppBar className="HeaderContainerAppBar">
              <Toolbar className="HeaderContainer">
                <div className="header-container">
                  <div className="header-col shp-col-4">
                    <div className="header-left-wrap">
                      <div className="HeaderMenuCategories">
                        <IconButton
                            edge="end"
                            aria-label="List of Categories"
                            aria-controls="menu-list-grow"
                            aria-haspopup="true"
                            color="inherit"
                            ref={anchorRef}
                            onClick={this.handleToggle}
                        >
                          <FontAwesomeIcon icon="bars" />
                        </IconButton>
                        <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            keepMounted
                            transition
                            disablePortal
                            className="HeaderMenuCategoriesList"
                        >
                          {({ TransitionProps, placement }) => (
                              <Grow
                                  {...TransitionProps}
                                  style={{
                                    transformOrigin:
                                        placement === "bottom"
                                            ? "center top"
                                            : "center bottom"
                                  }}
                              >
                                <Paper id="menu-list-grow">
                                  <ClickAwayListener
                                      onClickAway={event => this.handleClose(event, null)}
                                  >
                                    <MenuList>
                                      <MenuItem
                                          onClick={event =>
                                              this.handleClose(event, "Champagne")
                                          }
                                      >
                                        Champagne
                                      </MenuItem>
                                      <Divider variant="middle" />
                                      <MenuItem
                                          onClick={event =>
                                              this.handleClose(event, "Wine")
                                          }
                                      >
                                        Wine
                                      </MenuItem>
                                      <Divider variant="middle" />
                                      <MenuItem
                                          onClick={event =>
                                              this.handleClose(event, "Liqueur")
                                          }
                                      >
                                        Liqueur
                                      </MenuItem>
                                      <Divider variant="middle" />
                                      <MenuItem
                                          onClick={event =>
                                              this.handleClose(event, "Cocktail")
                                          }
                                      >
                                        Cocktail
                                      </MenuItem>
                                      <Divider variant="middle" />
                                      <MenuItem
                                          onClick={event =>
                                              this.handleClose(event, "Vodka")
                                          }
                                      >
                                        Vodka
                                      </MenuItem>
                                      <Divider variant="middle" />
                                      <MenuItem
                                          onClick={event =>
                                              this.handleClose(event, "Brandy")
                                          }
                                      >
                                        Brandy
                                      </MenuItem>
                                      <Divider variant="middle" />
                                      <MenuItem
                                          onClick={event =>
                                              this.handleClose(event, "Beer")
                                          }
                                      >
                                        Beer
                                      </MenuItem>
                                      <Divider variant="middle" />
                                      <MenuItem
                                          onClick={event =>
                                              this.handleClose(event, "All")
                                          }
                                      >
                                        All
                                      </MenuItem>
                                    </MenuList>
                                  </ClickAwayListener>
                                </Paper>
                              </Grow>
                          )}
                        </Popper>
                      </div>
                      <div className="SearchField">
                        <div className="SearchFieldIcon">
                          <FontAwesomeIcon icon="search" />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            className="SearchFieldInput"
                            inputProps={{ "aria-label": "Search" }}
                            onChange={this.handleChange}
                            onKeyDown={this.handleSearchClick}
                            value={searchvalue}
                        />
                      </div>
                    </div>

                  </div>
                  <div className="header-col header-col-center shp-col-4">
                    <div className="LogoForAlcoStoreContainer">
                      <Link to="/">
                        <img
                            src={lcoLogo}
                            alt={lcoLogo}
                            className="ImageForAlcoStoreContainer"
                            onClick={event => this.handleClose(event, "homepage")}
                        />
                      </Link>
                    </div>

                  </div>
                  <div className="header-col header-col-right shp-col-4">
                    <div className="header-right-wrap">
                      {user &&
                      <div className="BasketBadgeDiv">
                        <Link to="/basket" color="inherit">
                          <Badge
                              className="BasketBadge"
                              badgeContent={basketitemcount}
                              color="secondary"
                          >
                            <IconButton
                                edge="start"
                                aria-label="List of Categories"
                                aria-controls="menu-list-grow"
                                aria-haspopup="true"
                                color="inherit"
                            >
                              <FontAwesomeIcon icon="cart-plus" />
                            </IconButton>
                          </Badge>
                        </Link>
                      </div>
                      }
                      <div className="SignInUpUserDiv">
                        {user ? (
                            <MyAccount className="SignInUpUserLinks" />
                        ) : (
                            <div>
                              <Link to="/sign-in" className="SignInUpUserLinks">
                                <Button variant="contained" color="primary">
                                  Sign In
                                </Button>
                              </Link>
                              <Link to="/sign-up" className="SignInUpUserLinks">
                                <Button variant="contained" color="primary">
                                  Sign Up
                                </Button>
                              </Link>
                            </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </Toolbar>
            </AppBar>
          </ElevationScroll>
          <Toolbar />
        </React.Fragment>
      </div>
    );
  }
}

export default Header;