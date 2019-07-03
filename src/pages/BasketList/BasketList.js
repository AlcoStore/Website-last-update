import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "../../css/index.css";
import fire from "../../Firebase/Fire";
import BasketItem from "../../components/BasketItem.js";
import { Link } from "react-router-dom";
import lcoLogo from "../../Images/IcoLogo.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Footer from "../../components/Footer";
import MyAccount from "../../components/MyAccount";
import Loader from '../../components/Loader';
import {Redirect} from "react-router-dom";
import CheckOutDialog from '../../components/CheckOutDialog'

class BasketList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      discount: false,
      editedItem: this.props,
      showEditModal: false,
      totalPrice: 0,
      basketItems: [],
      check: true,
      idBase: "",
      user: null,
      loader: true
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user && user.emailVerified) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
        this.getBasketItems();
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  };

  getBasketItems = () => {
    const db = fire.firestore();
    db.collection("users")
      .doc(fire.auth().currentUser.uid)
      .collection("basket")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let { totalPrice } = this.state;
          this.setState({
            basketItems: [...this.state.basketItems, { ...doc.data() }],
            totalPrice:
              parseInt(totalPrice) +
              parseInt(doc.data().price) * parseInt(doc.data().count),
            idBase: doc.id,
            check: false
          });
        });
        this.setState({ loader: false });
      });
  };


  RemoveItem = price => {
    const { totalPrice } = this.state;
    const checki = totalPrice - price === 0;
    this.setState({
      totalPrice: totalPrice - price,
      check: checki
    });
  };

  TotalChange = price => {
    const { totalPrice } = this.state;
    this.setState({
      totalPrice: totalPrice + price
    });
  };

  // handleCheckout = () => {
  //   const messaging = fire.messaging();
  //   messaging
  //     .requestPermission()
  //     .then(() => {
  //       console.log("permission");
  //       return messaging.getToken();
  //     })
  //     .then(token => console.log(token))
  //     .catch(() => console.log("error"));
  // };

  render() {
    const { basketItems, totalPrice, check, user, loader} = this.state;
    return (
      <div className="main-wrap">
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
              {user && <MyAccount className="SignInUpUserLinks" /> }
            </div>
          </Toolbar>
        </AppBar>
        <Toolbar />
        {loader ? (
          <Loader/>
        ) : (
          <div>
            <div>
              {basketItems.map((item, index) => {
                return (
                  <BasketItem
                    key={index}
                    {...item}
                    onRemove={this.RemoveItem}
                    onTotalChange={this.TotalChange}
                  />
                );
              })}
            </div>
            <div className="EmptyBasket">
              <Grid className="EmptyBasketGrid">
                <Grid>
                  <Paper className="EmptyBasketText">
                    {check
                      ? "Your basket is empty."
                      : "Total Price: AMD " + totalPrice}
                  </Paper>
                </Grid>
              </Grid>
              {!check && <CheckOutDialog
                  totalPrice={totalPrice}
              />}
            </div>
          </div>
        )}

        <Footer />
      </div>
    );
  }
}

export default BasketList;
