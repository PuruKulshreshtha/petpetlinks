import React from "react";
import callApi from "../api";
import config from "../config";
import { withRouter } from "react-router-dom";
import { like } from "../Redux/Action/postAction";
import store from "../Redux/store";
const { ROUTES, SERVER_URL } = config;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getlike = () => {
    let { id } = this.props;
    const data = {
      id: id,
      dataUpadteToArray: localStorage.getItem("ID")
    };

    callApi({
      method: "POST",
      url: ROUTES.LIKE,
      data: data
    }).then(response => {
      //console.log("REs>", response);
      let pathname = this.props.location.pathname;
      let result = ["/timeline", "/index"].includes(pathname);
      if (result) {
        store.dispatch(like(response.data));
      } else {
        this.props.allPosts();
      }
    });
  };

  render() {
    return (
      <div>
        <li>
          <a
            onClick={() => {
              this.getlike();
            }}
          >
            <span className="btn_icon">
              <img src="/images/icon_003.png" alt="share" />
            </span>
            {this.props.noOflikes ? this.props.noOflikes : 0} Likes
          </a>
        </li>
      </div>
    );
  }
}

export default withRouter(LikeButton);
