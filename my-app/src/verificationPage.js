import React from "react";
import axios from "axios";

import config from "./config";

const { ROUTES, SERVER_URL } = config;

class VerificationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  verifying = () => {
    // console.log("verify");
    let data = {
      userId: this.props.match.params.id
    };

    axios.post(`${SERVER_URL}/${ROUTES.VERIFY}`, data).then(responce => {
      // console.log("response", responce);
      let resultFromDatabase = responce.data.status;
      this.setState({ resultFromDatabase });
      if (resultFromDatabase === "verified") {
        this.props.history.push("/login");
      }
    });
  };
  componentDidMount() {
    if (this.props.match.params.id !== null) {
      this.verifying();
    } else {
      this.props.push("/login");
    }
  }

  render() {
    return (
      <div>
        {this.state.resultFromDatabase
          ? alert(this.state.resultFromDatabase)
          : null}
      </div>
    );
  }
}

export default VerificationPage;
