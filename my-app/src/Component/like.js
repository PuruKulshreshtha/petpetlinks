import React from "react";
import callApi from "../api";
import config from "../config";
import { withRouter } from "react-router-dom";
import { like } from "../Redux/Action/postAction";
import store from "../Redux/store";
import { posts } from "../Redux/helpers";

// import { singlePost, filterfunc } from "../Redux/Action/postAction";

const { ROUTES } = config;

const LikeButton = props => {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }
  const getlike = () => {
    let { id } = props;
    const data = {
      id: id,
      dataUpadteToArray: localStorage.getItem("ID")
    };

    callApi({
      method: "POST",
      url: ROUTES.LIKE,
      data: data
    }).then(response => {
      // console.log("REs>", response.data);
      let pathname = props.location.pathname;
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
  let { noOflikes } = props;
  return (
    <div>
      <li>
        <div
          onClick={() => {
            getlike();
          }}
        >
          <span className="btn_icon">
            <img src="/images/icon_003.png" alt="share" />
          </span>
          {noOflikes ? noOflikes : 0} Likes
        </div>
      </li>
    </div>
  );
};

export default withRouter(LikeButton);
