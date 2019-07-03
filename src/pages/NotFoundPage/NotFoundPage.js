import React from "react";
import Fab from "@material-ui/core/Fab";
import { Redirect } from "react-router";

class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToAboutUs: false,
      redirectToHome: false
    };
  }

  handleContactUsChange = () => {
    this.setState({ redirectToAboutUs: true });
  };

  handleVisitHomeChange = () => {
    this.setState({ redirectToHome: true });
  };

  render() {
    const { redirectToHome, redirectToAboutUs } = this.state;
    return (
      <div className="notFoundPage">
        <div className="notFoundPageText">
          <h1 className="text404">404 error</h1>
          <div>Probably you are too drunk.</div>
          <div style={{ fontSize: "20px" }}>
            If you aren't able to make an order via computer, please{" "}
            <span className="contactUs" onClick={this.handleContactUsChange}>
              contact us
            </span>
          </div>
          <Fab
            variant="extended"
            aria-label="Delete"
            onClick={this.handleVisitHomeChange}
          >
            Visit Home
          </Fab>
        </div>
        {redirectToHome && <Redirect to="/" />}
        {redirectToAboutUs && <Redirect to="/about-us" />}
      </div>
    );
  }
}

export default NotFoundPage;
