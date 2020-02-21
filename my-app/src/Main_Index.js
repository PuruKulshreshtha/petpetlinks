import React from "react";
// import { connect } from "react-redux";
import { filterfunc } from "./Redux/Action/postAction";
import store from "./Redux/store";
import config from "./config";
import callApi from "./api";
// import { orderBy } from "lodash";
const { ROUTES } = config;

class Main_Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  latest_first = data => {
    callApi({ url: ROUTES.FILTER, data: data, method: "POST" }).then(res => {
      store.dispatch(filterfunc(res.data));
      // console.log(res);
    });
  };

  componentDidMount() {
    if (localStorage.getItem("ID") != null) {
      this.props.history.push("/index");
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div>
        <div className="list_1">
          <ul>
            <li>
              <input type="checkbox" className="chk_bx" />
              Friends
            </li>
            <li>
              <input type="checkbox" className="chk_bx" />
              Flaged
            </li>
          </ul>
        </div>

        <div className="post_div">
          <div className="post_list">
            <ul>
              <li>
                <div onClick={() => this.latest_first({ time: -1 })}>
                  <span className="list_img">
                    <img src="images/img_1.png" alt="hey" />
                  </span>
                  Latest First
                </div>
              </li>
              <li>
                <div onClick={() => this.latest_first({ time: 1 })}>
                  <span className="list_img">
                    <img src="images/img_2.png" alt="hey" />
                  </span>
                  Oldest First
                </div>
              </li>
              {/*<li>
                  <a href="#">
                    <span className="list_img">
                      <img src="images/img_3.png" />
                    </span>
                    Most Pet
                  </a>
                </li>*/}
              <li>
                <div onClick={() => alert("Not Working comming soon")}>
                  <span className="list_img">
                    <img src="images/img_4.png" alt="hey" />
                  </span>
                  Most Likes
                </div>
              </li>
              <li>
                <div onClick={() => this.latest_first({ commentNo: -1 })}>
                  <span className="list_img">
                    <img src="images/img_5.png" alt="hey" />
                  </span>
                  Most Commented
                </div>
              </li>
            </ul>
          </div>
          {
            // <div className="post_txt">4 New Post Updates</div>
          }
        </div>
      </div>
    );
  }
}

export default Main_Index;
