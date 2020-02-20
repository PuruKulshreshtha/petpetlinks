import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";
import callApi from "../api";
import LIKEBUTTON from "./like";
import config from "../config";
const { ROUTES, SERVER_URL } = config;

class post extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.monthMap = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "July",
      7: "Aug",
      8: "Sept",
      9: "Oct",
      10: "Nov",
      11: "Dec"
    };
  }
  // changeState = e => {
  //   const value = e.target.value;
  //   const name = e.target.name;
  //   this.setState({
  //     [name]: value
  //   });
  // };
  toggleShare = id => {
    let temp = this.state.toggleShare;
    if (!temp) {
      this.setState({ toggleShare: !temp, opendedId: id, shareStatus: null });
    } else {
      this.setState({ toggleShare: !temp });
    }
  };

  share = (id, name, e) => {
    e.preventDefault();
    // console.log("Hello");
    let data = {
      id: id,
      name: name,
      emailShare: e.target.emailShare.value
    };

    callApi({ method: "POST", url: ROUTES.SHARE, data: data }).then(
      response => {
        let shareStatus2 = response.data.status;
        this.setState(prevState => {
          return { shareStatus: shareStatus2 };
        });
      }
    );

    this.toggleShare();
  };

  downloadFile = image => {
    fetch(`${SERVER_URL}/${image}`).then(response => {
      //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> BLOB>>>>>>>>>>>>>", response);
      response.blob().then(blob => {
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> BLOB>>>>>>>>>>>>>", blob);
        let url = window.URL.createObjectURL(blob);
        // console.log(">>>>>>>>>>>>>..URL ..>>>>>>>>>>>>>>>>>>>", url);
        let a = document.createElement("a");
        a.href = url;
        a.download = image;
        a.click();
      });
      //window.location.href = response.url;
    });
  };
  render() {
    let { data } = this.props;
    // console.log(">>>>>>>>>>>>>>>>>>>>POST CONSOLE");
    let image = get(data.author, "profilePic", "123.jpg");
    let date = new Date(data.time);
    let requiredDateString = `${date.getDate()} ${
      this.monthMap[date.getMonth()]
    },${date.getFullYear()}  ( ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} )`;

    return (
      <div>
        <div className="div_a">
          <div className="div_title">{data.title}</div>
          <div className="btm_rgt">
            <div className="btm_arc">
              {get(data.categoryId, "category", "---")}
            </div>
          </div>
          <div className="div_top">
            <div className="div_top_lft">
              <img
                src={SERVER_URL + "/" + image}
                height="40px"
                width="40px"
                style={{ borderRadius: "20px" }}
                alt=""
              />
              {/* <img src="/images/img_6.png" alt="" /> */}
              {/*Steave Waugh*/}
              {get(data.author, "username", "----")}
            </div>
            <div className="div_top_rgt">
              <span className="span_date">{requiredDateString}</span>
              <span className="span_time"></span>
            </div>
          </div>
          <br></br>
          <div className="div_image">
            <Link to={"/singlePost/" + data._id}>
              {" "}
              <img src={SERVER_URL + "/" + data.selectedFiles} alt="pet" />
            </Link>
          </div>
          <div className="div_btm">
            <div className="btm_list">
              <ul>
                <li>
                  <div
                    onClick={() => {
                      this.toggleShare(data._id);
                    }}
                  >
                    <span className="btn_icon">
                      <img src="/images/icon_001.png" alt="share" />
                    </span>
                    Share
                  </div>
                </li>

                {/* <Share
              onToggle={toggleShare => {
                this.setState({
                  toggleShare: !toggleShare
                });
              }}
            /> */}
                <li>
                  <div
                    onClick={() => {
                      this.downloadFile(data.selectedFiles);
                    }}
                  >
                    <span className="btn_icon">
                      <img
                        src="/images/download.png"
                        alt="share"
                        style={{
                          height: 20,
                          width: 20
                        }}
                      />
                    </span>
                    Download
                  </div>
                </li>
                {/* <li>
              <a
                onClick={() => {
                  this.getlike(data._id);
                }}
              >
                <span className="btn_icon">
                  <img
                    src="/images/icon_003.png"
                    alt="share"
                  />
                </span>
                {data.like.length}Likes
              </a>
            </li> */}
                <LIKEBUTTON
                  id={data._id}
                  allPosts={this.props.allpost}
                  noOflikes={get(data, "like", []).length}
                />
                <li>
                  <Link to={"/singlePost/" + data._id}>
                    <span className="btn_icon">
                      <img src="/images/icon_004.png" alt="share" />
                    </span>
                    {data.commentNo} Comments
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            {this.state.toggleShare && data._id === this.state.opendedId ? (
              <form
                onSubmit={e =>
                  this.share(data._id, localStorage.getItem("username"), e)
                }
              >
                <input
                  type="email"
                  name="emailShare"
                  style={{ borderRadius: 10 }}
                ></input>
                <input
                  type="submit"
                  style={{
                    height: 28,
                    backgroundColor: "#ec6a14",
                    color: "white",
                    width: 120
                  }}
                ></input>
              </form>
            ) : null}
          </div>
          <div>
            {data._id === this.state.opendedId ? (
              <h5>{this.state.shareStatus}</h5>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default post;
