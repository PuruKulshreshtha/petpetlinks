import React from "react";
import callApi from "../api";
import config from "../config";
import { withRouter } from "react-router-dom";
import { like } from "../Redux/Action/postAction";
import store from "../Redux/store";
import { posts } from "../helpers";

// import { singlePost, filterfunc } from "../Redux/Action/postAction";

const { ROUTES } = config;

class LikeButton extends React.PureComponent {
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
      console.log("REs>", response.data);
      let pathname = this.props.location.pathname;
      let result = ["/timeline", "/index"].includes(pathname);
      // console.log(result);
      if (result) {
        store.dispatch(like(response.data));
      } else {
        console.log("heill", id);
        let data = { id: id };
        posts(data);
      }
    });
  };

  render() {
    return (
      <div>
        <li>
          <div
            onClick={() => {
              this.getlike();
            }}
          >
            <span className="btn_icon">
              <img src="/images/icon_003.png" alt="share" />
            </span>
            {this.props.noOflikes ? this.props.noOflikes : 0} Likes
          </div>
        </li>
      </div>
    );
  }
}

export default withRouter(LikeButton);
