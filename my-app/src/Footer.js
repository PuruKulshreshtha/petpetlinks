import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div>
        <div className="clear" />
        <div className="footr">
          <div className="footr_lft">
            <div className="footer_div1">
              Copyright © Pet-Socail 2014 All Rights Reserved
            </div>
            <div className="footer_div2">
              <a>Privacy Policy </a>| <a> Terms &amp; Conditions</a>
            </div>
          </div>
          <div className="footr_rgt">
            <ul>
              <li>
                <a href="https://www.facebook.com">
                  <img src="images/social_1.png" alt="" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/login?lang=en">
                  <img src="images/social_2.png" alt="" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/">
                  <img src="images/social_3.png" alt="" />
                </a>
              </li>
              <li>
                <a href="https://www.pinterest.com/">
                  <img src="images/social_4.png" alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default Footer;
