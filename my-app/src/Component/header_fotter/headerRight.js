import React from "react";
import HeaderDropdwon from "./headerDropdown";
const HeaderRight = () => {
  return (
    <div className="header_rgt">
      <div className="flag_div">
        <img src="images/flag.png" alt="" />
      </div>
      <input type="text" placeholder="Search" className="txt_box" />
      <div className="msg_box">
        <div>
          <span className="msg_count" style={{ color: "white" }}>
            100
          </span>
        </div>
      </div>
      <div className="info_div">
        {/* <div className="image_div">
    {" "}
    <Link to="/index">
      <img src="/images/pic.png" alt="" />
    </Link>{" "}
  </div> */}

        <HeaderDropdwon />
      </div>
    </div>
  );
};

export default HeaderRight;
