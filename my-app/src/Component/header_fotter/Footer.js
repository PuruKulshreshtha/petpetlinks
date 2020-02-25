import React from "react";
import FooterRight from "./footerRight";
import FooterLeft from "./footerLeft";

class Footer extends React.Component {
  render() {
    return (
      <div className="footr">
        <FooterLeft />
        <FooterRight />
      </div>
    );
  }
}
export default Footer;
