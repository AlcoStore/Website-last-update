import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Divider from "@material-ui/core/Divider";
import fire from '../Firebase/Fire';
import {Redirect} from "react-router";

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.item.id,
      name: props.item.name,
      category: props.item.category,
      price: props.item.price,
      description: props.item.description,
      volume: props.item.volume,
      count: props.count,
      image: props.item.image,
      inBasket: false,
      redirectToBasket: false,
      basketItems: []
    };
  }

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
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
            this.setState({
              basketItems: [...this.state.basketItems, doc.data().id ],

            });
          });
        });
  };

  componentDidMount() {
    this.authListener();
    setTimeout(()=> {
          if (this.state.user) {
            this.getBasketItems();
            this.handleAlreadyInBasket()
          }
        }, 1000
    )
  }

  handleMinusButtonClick = () => {
    this.setState({
      count: this.state.count > 1 ? this.state.count - 1 : 1
    });
  };

  handlePlusButtonClick = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  handleItemCountChange = event => {
    this.setState({
      count: event.target.value > 1 ? parseInt(event.target.value) : 1
    });
  };

  handleSave = () => {
    const { onSave } = this.props;
    onSave(this.state);
  };

  handleAlreadyInBasket = () => {
    if(this.state.basketItems.indexOf(this.state.id) !== -1) {
      this.setState({inBasket: true})
    }
  }

  handleRedirectToBasket = () => {
    if(this.state.inBasket) {
      this.setState({redirectToBasket: true})
    }
  }

  render() {
    const {
      name,
      category,
      price,
      description,
      volume,
      image,
      count,
      inBasket,
      redirectToBasket
    } = this.state;
    const { onClose } = this.props;
    return (
      <Dialog
        open={true}
        onClose={this.handleClose}
        aria-labelledby="scroll-dialog-title"
      >
        <DialogTitle id="scroll-dialog-title" className="DialogTitle">
          {name}
        </DialogTitle>
        <DialogContent dividers={true}>
          <div className="DialogContent">
            <div className="DialogContent1">
              <img alt={category} src={image} className="DialogImage" />
            </div>
            <div className="DialogContent2">
              <DialogContentText>{description}</DialogContentText>
              <Divider variant="middle" />
              <div className="DialogContent3">
                <h4 className="ContentName">AMD {price * count}</h4>
                <div className="ContentButtonDiv">
                  <button onClick={this.handleMinusButtonClick}>
                    <FontAwesomeIcon icon="minus" />
                  </button>
                  <input
                    type="number"
                    value={count}
                    className="ContentCountItem"
                    onChange={this.handleItemCountChange}
                    min="1"
                  />
                  <button onClick={this.handlePlusButtonClick}>
                    <FontAwesomeIcon icon="plus" />
                  </button>
                </div>
                <h4 className="ContentName">{volume} l</h4>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
          {!inBasket ? (
              <Button onClick={this.handleSave} color="primary">
                <span className="ContentAddToCartSpan"> Add </span>
                <FontAwesomeIcon icon="cart-plus" />
              </Button>
          ) : (
              <Button>
                <span className="ContentAddToCartSpan" onClick={this.handleRedirectToBasket}> Already in basket </span>
              </Button>
          )}
        </DialogActions>
        {redirectToBasket && <Redirect to="/basket" />}
      </Dialog>
    );
  }
}

export default EditModal;
