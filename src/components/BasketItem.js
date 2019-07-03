import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import "../css/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import fire from "../Firebase/Fire";
library.add(faTrashAlt);

class BasketItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      image: this.props.image,
      volume: this.props.volume,
      description: this.props.description,
      price: this.props.price,
      count: this.props.count,
      id: this.props.id
    };
  }

  updateCount = () => {
    const db = fire.firestore();
    const idBase = this.state.id;
    const count = this.state.count;
    let docRef = db
      .collection("users")
      .doc(fire.auth().currentUser.uid)
      .collection("basket");
    console.log(idBase);
    docRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data().id === idBase) {
          docRef.doc(doc.id).update({ count: count });
        }
      });
    });
  };

  handleMinusButtonClick = () => {
    const { count, price } = this.state;
    const { onTotalChange } = this.props;
    if (count > 1) {
      this.setState({
        count: count - 1
      });
      setTimeout(() => {
        this.updateCount();
      }, 1000);
      onTotalChange(-1 * price);
    }
  };

  handlePlusButtonClick = () => {
    const { count, price } = this.state;
    const { onTotalChange } = this.props;
    this.setState({
      count: count + 1
    });
    setTimeout(() => {
      this.updateCount();
    }, 1000);
    onTotalChange(price);
  };

  handleItemCountChange = event => {
    const { onTotalChange } = this.props;
    const { count, price } = this.state;
    if (event.target.value > 0) {
      this.setState({
        count: parseInt(event.target.value)
      });
      setTimeout(() => {
        this.updateCount();
      }, 1000);
      onTotalChange((parseInt(event.target.value) - count) * price);
    }
  };

  deleteFromBasket = () => {
    const db = fire.firestore();
    const idBase = this.state.id;
    const { count, price } = this.state;
    let docRef = db
      .collection("users")
      .doc(fire.auth().currentUser.uid)
      .collection("basket");
    const { onRemove } = this.props;
    docRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data().id === idBase) {
          docRef.doc(doc.id).delete();
          document.getElementById(this.state.id).remove();
          onRemove(count * price);
        }
      });
    });
  };

  render() {
    const { name, image, volume, description, price, count, id } = this.state;
    return (
      <div className="BasketRoot" id={id}>
        <Paper className="BasketPaper">
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="subtitle1" style={{position:"absolute", right: '10px', top: '10px' }}>AMD {count * price}</Typography>

              <ButtonBase className="BasketImage">
                <img className="BasketImg" alt="complex" src={image} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {description}
                    <br />
                    {volume} l
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Count of items: {count}
                  </Typography>
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
                </Grid>
              </Grid>
              <Grid  style={
                {position: 'absolute', bottom:'10px', right: '10px'}}>
                  <Typography
                      variant="body2"
                      style={{ cursor: "pointer" }}
                      onClick={this.deleteFromBasket}
                  >
                    <FontAwesomeIcon
                        icon="trash-alt"
                        style={{ paddingRight: "5px", color: "#413F44", fontSize: '18px' }}
                    />
                    Remove
                  </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default BasketItem;
