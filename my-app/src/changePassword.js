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
  

getPass=(e)=>{
  e.preventDefault();
    let data={
        userId:this.props.match.params.id,
        newpassword:e.target.newpassword.value,
        confirmpassword:e.target.confirmpassword.value,
    }
   // console.log("change passs word data",data);
    if(data.newpassword===data.confirmpassword)
    {
        axios.post(`${SERVER_URL}/${ROUTES.CHANGE_PASSWORD}`,data).then((responce)=>{
            //console.log("response",responce);
            let ResultStatus=responce.data.status;
            if(ResultStatus==="Invalid Link"){
                let statusFromDatabase="Invalid Link";
                let passwordMissMatch="";
                this.setState({statusFromDatabase,passwordMissMatch});

            }
            else
            {
                this.props.history.push("/login");
            }

        })
    }
    else{
        let passwordMissMatch="Password Miss Match"
        this.setState({passwordMissMatch});
        //this.props.history.push("/login");
    }

}

  render() {
    return (
      <div>
      <div>
      <meta charSet="utf-8" />
      
      
      
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="login_sec">
              
              <h4 style={{color:"#f09717"}}>{this.state.status}</h4>
              <h2 style={{color:"#f09717"}}>{this.state.status==="Password Reterived"?this.state.pass:null}</h2>
             
              <h1>Change Password</h1>
              {this.state.passwordMissMatch?<h3 style={{color:"#ff9933"}}>Password Missmatch</h3>:null}
              {this.state.statusFromDatabase?<h2 style={{color:"#ff9933"}}>Invalid Link</h2>:null}
              <ul>
                <li>
                  <form onSubmit={this.getPass}>
                  <span>Enter New Password</span>
                  <input type="password" name="newpassword"   placeholder="New Password" required/>
                <br></br><br></br>
    
                <input type="password" name="confirmpassword"   placeholder="Confirm Password" required/>
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
