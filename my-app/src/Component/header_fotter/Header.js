import React from "react";
import { withRouter } from "react-router-dom";
import HeaderSmall from "./headerSmall";
import HeaderRight from "./headerRight";
import HeaderLeft from "./headerLeft";

class Header extends React.Component {
  render() {
    let pathname = this.props.location.pathname;
    return (
      <div>
        <HeaderSmall />

        <div className="header">
          <HeaderLeft />
          {!["/signup", "/login", "/forget", "/verify/:id"].includes(
            pathname
          ) ? (
            <HeaderRight />
          ) : (
            void 0
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
