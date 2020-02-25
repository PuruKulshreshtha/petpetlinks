import React from "react";
import { Link } from "react-router-dom";
import config from "./config";
import callApi from "./api";
import LoginSignupLeft from "./Component/LoginSignUp/loginSignupLeft";
import LoginSignUpadditionalInfo from "./Component/LoginSignUp/loginSignUpadditionalInfo";
const { ROUTES } = config;

//import Child from "./child"
class Login extends React.Component {
  constructor(props) {
    //console.log("Constructor");
    super(props);
    this.state = {
      email: "",
      password: "",
      placePass: "What is your password",
      placeEmail: "What is your email"
    };
  }
  p = () => {
    //console.log("p function called");
    this.setState({ password: "" });
  };
  e = () => {
    //console.log("p function called");
    this.setState({ email: "" });
  };
  changeState = e => {
    //console.log("value=----===",e.target.name)
    let { value = "", name = "" } = e.target;
    this.setState({
      [name]: value
    });
  };

  sendData = e => {
    e.preventDefault();
    //console.log("prevent", this.state);
    let data = {
      email: e.target.email.value,
      password: e.target.password.value
    };
    //console.log(data);
    // axios
    //   .post(`${SERVER_URL}/${ROUTES.LOGIN}`, this.state)
    callApi({ method: "POST", url: ROUTES.LOGIN, data: data }).then(
      response => {
        // console.log("-----------", response.data);

        const records = response.data.dataFromDatabase;
        //localStorage.setItem("ID", records[0]._id);
        this.setState({ records });
        const ans = response.data.status;
        this.setState({ ans });

        if (
          this.state.ans !== "Invalid User or Not verified user" &&
          this.state.ans !== "Incorrect Password"
        ) {
          localStorage.setItem("ID", response.data.dataFromDatabase[0]._id);
          localStorage.setItem(
            "username",
            response.data.dataFromDatabase[0].username
          );
          localStorage.setItem("mail", response.data.dataFromDatabase[0].email);

          //localStorage.setItem("email", records[0].email);
        }

        let inputStyle = {
          border: "1px solid black"
        };

        let passwordStyle = {
          border: "1px solid black"
        };

        if (this.state.ans === "Invalid User or Not verified user") {
          inputStyle.border = "3px solid red";
          passwordStyle.border = "1px solid black";
          let temp = "Please insert correct or verified email";
          this.setState({ placeEmail: temp });
          this.setState({ inputStyle, passwordStyle });
          this.e();
        } else if (this.state.ans === "Incorrect Password") {
          inputStyle.border = "1px solid black";
          passwordStyle.border = "3px solid red";
          this.setState({ inputStyle, passwordStyle });
          let temp = "Please insert correct password";
          this.setState({ placePass: temp });
          this.p();
        } else {
          inputStyle.border = "1px solid black";
          passwordStyle.border = "1px solid black";
          let temp = "Plz insert correct password";
          let temp1 = "Plz insert correct or verified email";
          this.setState({ placePass: temp, placeEmail: temp1 });
          this.setState({ inputStyle, passwordStyle });
          //localStorage.setItem("ID", this.state.records[0]._id);
          localStorage.setItem("ID", response.data.dataFromDatabase[0]._id);
          localStorage.setItem(
            "username",
            response.data.dataFromDatabase[0].username
          );
          this.props.history.push("/index");
        }
      }
    );
  };
  componentDidMount() {
    if (localStorage.getItem("ID") != null) {
      this.props.history.push("/index");
    } else {
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="login_sec">
              <form onSubmit={this.sendData}>
                {this.state.ans ? (
                  <h4 style={{ color: "#f47b13" }}>{this.state.ans}</h4>
                ) : (
                  ""
                )}
                <h1>Log In</h1>
                <ul>
                  <li>
                    <span>Email-ID</span>
                    <input
                      type="text"
                      name="email"
                      style={this.state.inputStyle}
                      // value={this.state.email}
                      // onChange={this.changeState}
                      placeholder={this.state.placeEmail}
                    />
                  </li>
                  {this.state.ans === "Invalid User" ? (
                    <h4 style={{ color: "#f47b13" }}>{this.state.ans}</h4>
                  ) : (
                    ""
                  )}
                  <li>
                    <span>Password</span>
                    <input
                      type="password"
                      style={this.state.passwordStyle}
                      name="password"
                      // value={this.state.password}
                      //onChange={this.changeState}
                      placeholder={this.state.placePass}
                    />
                  </li>
                  {this.state.ans === "Incorrect Password" ? (
                    <h4 style={{ color: "#f47b13" }}>{this.state.ans}</h4>
                  ) : (
                    ""
                  )}
                  <li>
                    <input type="checkbox" />
                    Remember Me
                  </li>
                  <li>
                    <input type="submit" defaultValue="Log In" />

                    <Link to="/forget">Forget Password</Link>
                  </li>
                </ul>
              </form>
              <LoginSignUpadditionalInfo
                text1={" I do not have any account yet."}
                text2={"Create My Account Now !"}
                path={"/signup"}
              />
            </div>
          </div>
          <LoginSignupLeft />
        </div>
      </div>
    );
  }
}

export default Login;
