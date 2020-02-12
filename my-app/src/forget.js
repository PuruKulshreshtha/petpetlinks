import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config  from "./config";


const {ROUTES,SERVER_URL} = config;




class Forget extends React.Component { 
  constructor(props)
  {
    super(props)
    this.state={
      email:""
    }
  }
  
  changeState = (e)=>{
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    })}
getPass=(e)=>{
  e.preventDefault();

    axios.post(`${SERVER_URL}/${ROUTES.FORGET_PASSWORD}`,this.state)
    .then((response)=>{
      console.log("-----------",response);
      let status=response.data.status;
      if(status==="Password Reterived"){
     let pass=response.data.dataFromDatabase[0].password    
      this.setState({status,pass});}
      else{
        this.setState({status})
      }     
    this.setState({email:""})
} );
}

  render() {
    return (
      <div>
      <div>
      <meta charSet="utf-8" />
      <title>Forgot Password</title>
      <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
      <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
      
      
      
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="register_sec">
              
              <h4 style={{color:"#f09717"}}>{this.state.status}</h4>
              <h2 style={{color:"#f09717"}}>{this.state.status==="Password Reterived"?this.state.pass:null}</h2>
             
              <h1>Forgot Password</h1>
              <ul>
                <li>
                  <form onSubmit={this.getPass}>
                  <span>Enter E-mail ID</span>
                  <input type="text" name="email" value={this.state.email} onChange={this.changeState}  placeholder="User@gmail.com" />
                <br></br><br></br>
                
                  <input type="submit"  defaultValue="Submit" />
                  
                  </form>
                </li>
                <li><Link to="/login">For login click here</Link></li>
              </ul>
            </div>
          </div>
          <div className="content_lft">
            <h1>Welcome from PPL!</h1>
            <p className="discrptn">
              There are many variations of passages of Lorem Ipsum available, but
              the majority have suffered alteration in some form, by injected
              humour, or randomised words which don't look even slightly believable.
              If you are going to use a passage of Lorem Ipsum, you need to be sure
              there isn't anything embarrassing hidden in the middle of text.{" "}
            </p>
            <img src="images/img_9.png" alt="" />
          </div>
        </div>
      </div>
      <div className="clear" />
      
    </div>;
    
      </div>
    );
  }
}

export default Forget;
