import React from "react";
import HeaderDropdwon from "./headerDropdown";
const HeaderSmall = () => {
  return (
    <div className="navbar navbar-inverse navbar-fixed-top">
      <div className="navbar-inner">
        <div className="container">
          <button
            type="button"
            className="btn btn-navbar"
            data-toggle="collapse"
            data-target=".nav-collapse"
          >
            {" "}
            <span className="icon-bar" /> <span className="icon-bar" />{" "}
            <span className="icon-bar" />{" "}
          </button>
          <div className="brand">PPL</div>
          <HeaderDropdwon />
          <div className="nav-collapse collapse">
            <ul style={{ color: "white" }} className="nav">
              <li className="active">
                {" "}
                <div>Home</div>{" "}
              </li>
              <li>
                {" "}
                <div>E-Coupons</div>{" "}
              </li>
              <li>
                {" "}
                <div>E-Brands </div>{" "}
              </li>
              <li>
                {" "}
                <div>Resuse Market</div>{" "}
              </li>
              <li>
                {" "}
                <div>Lost and Found </div>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSmall;
