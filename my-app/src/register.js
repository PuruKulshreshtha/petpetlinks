import React from "react";

import { Link } from "react-router-dom";
import callApi from "./api";
import config from "./config";
const { ROUTES } = config;
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      termsCondition: false
    };
  }
  changeState = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  sendData = e => {
    e.preventDefault();
    // console.log("prevent", this.state);

    let checkboxCheck = document.getElementById("terms_condition").checked;
    if (checkboxCheck) {
      // console.log("Anurag");
      //console.log("Checked",checkboxCheck);
      let p = true;
      this.setState({ terms_condition: p });
      // console.log("Resdsdmfsdmf", this.state.terms_condition);
    } else {
      // console.log("Resdsdmfsdmf",this.state.terms_condition);
      //console.log("NOt Checked")
    }
    //console.log("Terms terms_condition",lfckv);

    //axios.post("http://127.0.0.1:8088/process_post",this.state)

    callApi({ method: "POST", data: this.state, url: ROUTES.SIGN_UP }).then(
      response => {
        console.log("-----------", response);
        let status = response.data.status;
        this.setState({ status });
        //alert("Status "+this.state.status);
        // if(this.state.status==='User Created Successful')
        // {
        //   window.setTimeout(this.routingFunction(),5000);
        // }
      }
    );
  };
  routingFunction = () => {
    return this.props.history.push("/login");
  };
  componentDidMount() {
    if (localStorage.getItem("ID") != null) {
      this.props.history.push("/timeline");
    } else {
      this.props.history.push("/signup");
    }
  }

  render() {
    return (
      <div>
        {this.state.status ===
        "User Created Successful Verification Link sent on your Email"
          ? setTimeout(
              function() {
                this.routingFunction();
              }.bind(this),
              2000
            )
          : null}
        <title>Create An Account</title>

        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <form onSubmit={this.sendData}>
                  <h1>Create An Account</h1>
                  <ul>
                    <li>
                      <h3>{this.state.status}</h3>
                      <span>Username</span>
                      <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.changeState}
                        placeholder="Enter your username"
                        required
                      />
                    </li>
                    <li>
                      <span>Password</span>
                      <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.changeState}
                        placeholder="Enter your password"
                        required
                      />
                    </li>
                    <li>
                      <span>Email</span>
                      <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.changeState}
                        placeholder="Enter your email"
                        required
                      />
                    </li>
                    <li>
                      <span>First Name</span>
                      <input
                        type="text"
                        name="firstName"
                        value={this.state.first_name}
                        onChange={this.changeState}
                        placeholder="Enter your first name"
                        required
                      />
                    </li>
                    <li>
                      <span>Last Name</span>
                      <input
                        type="text"
                        name="lastName"
                        value={this.state.last_name}
                        onChange={this.changeState}
                        placeholder="Enter your last name"
                        required
                      />
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id="terms_condition"
                        name="terms_condition"
                        required
                      />
                      I agree to Term &amp; Conditions
                    </li>
                    <li>
                      <input type="submit" defaultValue="Register" />
                    </li>
                  </ul>
                </form>
                <div className="addtnal_acnt">
                  I already have an account.
                  <li>
                    <Link to="/login">Login My Account !</Link>
                  </li>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text.{" "}
              </p>
              <img src="images/img_9.png" alt="" />{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
