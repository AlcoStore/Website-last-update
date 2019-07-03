import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Redirect} from "react-router";
import fire from "../Firebase/Fire";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faCheck);

class CheckOutDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            redirect: false
        }
    }

    deleteBasket = () => {
        const db = fire.firestore();
        let docRef = db
            .collection("users")
            .doc(fire.auth().currentUser.uid)
            .collection("basket");
        // const { onRemove } = this.props;
        docRef.get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                    docRef.doc(doc.id).delete();

                }
            );
        });
    };

    handleClickOpen = () =>{
        this.setState({open: true})
        this.deleteBasket()
    }

    handleClose = () => {
        this.setState({open: false})
    }

    handleContinueShopping = () => {
        this.setState({open: false, redirect: true});
    }
    render() {
        const {open, redirect} = this.state;
        const{totalPrice} = this.props;
        return (
            <div>
                <div className="checkoutBtn">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleClickOpen}
                    >
                        Checkout
                    </Button>
                </div>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{textAlign: 'center'}}>Successful Checkout</DialogTitle>
                    <div style={{display: 'flex', justifyContent: 'center'}}><FontAwesomeIcon
                        icon={faCheckCircle}
                        style={{
                            color: 'green',
                            fontSize: '100px',
                            textAlign: 'center'
                        }}
                    /></div>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div>Thank you for shopping with us.</div>
                            <div>Total sum of your purchase is AMD {totalPrice}</div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleContinueShopping} color="primary">
                            Continue Shopping
                        </Button>
                    </DialogActions>
                </Dialog>
                {redirect && <Redirect to="/" />}
            </div>
        );
    }
}

export default CheckOutDialog;