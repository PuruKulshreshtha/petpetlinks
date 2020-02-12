import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = () => {
    localStorage.removeItem("ID");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
  };
  componentDidMount() {
    // console.log("???????????????????????????????????");
  }
  render() {
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
              <a className="brand">PPL</a>
              <div className="pro_info pull-right">
                <div className="pro_icn">
                  <img src="/images/pic_small.png" alt="" />
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
                    <a tabIndex={-1}>My Profile</a>
                  </li>
                  <li>
                    <a tabIndex={-1}>Message Box</a>
                  </li>
                  <li onClick={() => this.logout()}>
                    <Link to="/login"> Logout</Link>
                  </li>
                  <li className="divider" />
                  <li>
                    <a tabIndex={-1}>
                      <input type="text" placeholder="search" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="nav-collapse collapse">
                <ul className="nav">
                  <li className="active">
                    {" "}
                    <a>Home</a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a>E-Coupons</a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a>E-Brands</a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a>Resuse Market</a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a>Lost and Found</a>{" "}
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
                  <a> E-Coupons </a>
                </li>
                <li>
                  <a>E-Brands </a>
                </li>
                <li>
                  <a> Resuse Market </a>
                </li>
                <li>
                  <a> Lost and Found</a>
                </li>
              </ul>
            </div>
          </div>
          {this.props.id ? (
            <div className="header_rgt">
              <div className="flag_div">
                <img src="images/flag.png" alt="" />
              </div>
              <input type="text" placeholder="Search" className="txt_box" />
              <div className="msg_box">
                <a>
                  <span className="msg_count">100</span>
                </a>
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
                      <a tabIndex={-1}>My Profile</a>
                    </li>
                    <li>
                      <a tabIndex={-1}>Message Box</a>
                    </li>
                    <li onClick={() => this.logout()}>
                      <Link to="/login"> Logout</Link>
                    </li>
                    <li className="divider" />
                    <li>
                      <a tabIndex={-1}>
                        <input type="text" placeholder="search" />
                      </a>
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
export default Header;
