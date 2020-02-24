import React, { Component } from "react";

class ProfilePic extends Component {
  render() {
    return (
      <div>
        <div className="popup1">
          <h4 style={{ textAlign: "center" }}>
            Profile Pic of {this.props.name}
          </h4>
          <div className="topright">
            <div onClick={this.props.closePopup}>
              <img
                height="20px"
                width="30px"
                alt="close"
                src="/images/close.ico"
              ></img>
            </div>
          </div>
          <div
            style={{
              // border: "10px solid white",
              width: "80%",
              margin: "35px",
              height: "70%",
              padding: "20px"
            }}
          >
            <img
              alt="profilepic"
              src={this.props.image}
              style={{
                objectFit: "contain",
                height: "100%",
                width: "100%",
                float: "left"
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePic;
