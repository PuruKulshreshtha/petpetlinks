import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../Redux/helpers";
const HeaderDropdwon = () => {
  return (
    <div className="pro_info pull-right">
      <div className="pro_icn">
        <Link to="/index">
          <img src="/images/pic_small.png" alt="" />
        </Link>
      </div>

      <div className="pro_txt">
        Me
        <b className="caret" />
      </div>
      <ul
        className="dropdown-menu"
        style={{ borderRadius: 10 }}
        role="menu"
        aria-labelledby="dLabel"
      >
        <li>
          <Link to="/index">
            <div style={{ borderRadius: 10 }} tabIndex={-1}>
              My Profile
            </div>
          </Link>
        </li>
        <li>
          <div style={{ borderRadius: 10 }} tabIndex={-1}>
            Message Box
          </div>
        </li>
        <li onClick={() => logout()}>
          <Link style={{ borderRadius: 10 }} to="/login">
            {" "}
            Logout
          </Link>
        </li>
        <li className="divider" />
        <li>
          <div tabIndex={-1}>
            <input type="text" placeholder="search" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HeaderDropdwon;
