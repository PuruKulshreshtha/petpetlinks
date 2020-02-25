import React from "react";
import { Link } from "react-router-dom";

const HeaderLeft = () => {
  return (
    <div className="header_lft">
      <div className="logo">
        <Link to="/timeline">
          <img src="/images/logo.png" alt="IMG" />
        </Link>
      </div>
      <div className="navigatn">
        <ul>
          <li>
            <Link to="/timeline">Home</Link>
          </li>
          <li>
            <div> E-Coupons </div>
          </li>
          <li>
            <div>E-Brands </div>
          </li>
          <li>
            <div> Resuse Market </div>
          </li>
          <li>
            <div> Lost and Found</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderLeft;
