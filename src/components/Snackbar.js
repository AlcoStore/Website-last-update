import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';


class NewSnackbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open: this.props.open,
            vertical: 'bottom',
            horizontal: 'right',
        }
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        const { vertical, horizontal, open } = this.state;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    key={`${vertical},${horizontal}`}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    style={{ color: 'green' }}
                    message={<span id="message-id">The chosen item is in the basket</span>}
                />
            </div>
        )
    }

}

export default NewSnackbar