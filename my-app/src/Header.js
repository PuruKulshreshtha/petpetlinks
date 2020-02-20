import React from "react";
import { Link, withRouter } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = () => {
    localStorage.removeItem("ID");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    this.props.history.push("/login");
  };

  render() {
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.props.location.pathname);
    let pathname = this.props.location.pathname;
    return (
      <div>
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
              <div className="pro_info pull-right">
                <div className="pro_icn">
                  <Link to="/index">
                    {" "}
                    <img src="/images/pic_small.png" alt="" />
                  </Link>
                </div>

                <div className="pro_txt">
                  Me
                  <b className="caret" />
                </div>
                <ul
                  className="dropdown-menu"
                  role="menu"
                  aria-labelledby="dLabel"
                >
                  <li>
                    <div tabIndex={-1}>My Profile</div>
                  </li>
                  <li>
                    <div tabIndex={-1}>Message Box</div>
                  </li>
                  <li onClick={() => this.logout()}>
                    <Link to="/login"> Logout</Link>
                  </li>
                  <li className="divider" />
                  <li>
                    <div tabIndex={-1}>
                      <input type="text" placeholder="search" />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="nav-collapse collapse">
                <ul className="nav">
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
                    <div>E-Brands</div>{" "}
                  </li>
                  <li>
                    {" "}
                    <div>Resuse Market</div>{" "}
                  </li>
                  <li>
                    {" "}
                    <div>Lost and Found</div>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header">
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
          {!["/signup", "/login", "/forget", "/verify/:id"].includes(
            pathname
          ) ? (
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

                <div className="pro_info pull-right">
                  <div className="pro_icn">
                    {" "}
                    <Link to="/index">
                      {" "}
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
                      <div style={{ borderRadius: 10 }} tabIndex={-1}>
                        My Profile
                      </div>
                    </li>
                    <li>
                      <div style={{ borderRadius: 10 }} tabIndex={-1}>
                        Message Box
                      </div>
                    </li>
                    <li onClick={() => this.logout()}>
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
              </div>
            </div>
          ) : (
            void 0
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
