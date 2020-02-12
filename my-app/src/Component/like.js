import React from "react";
import callApi from "../api";
import config from "../config";

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
      console.log("REs>", response);

      this.props.allPosts();
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

export default LikeButton;
