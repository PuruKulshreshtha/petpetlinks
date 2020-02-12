import React from "react";
import LIKEBUTTON from "./Component/like";
import { Link } from "react-router-dom";
import config from "./config";
import callApi from "./api";
import Main_index from "./Main_Index";
import Main_timeline from "./Main_timeline";
import RightContiner from "./rightContainer";
import InfiniteScroll from "react-infinite-scroller";
//import InfiniteScroll from "react-infinite-scroll-component";
const { ROUTES, SERVER_URL } = config;
class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleShare: false,
      email: "",
      selectedFiles: "",
      description: "",
      items: Array.from({ length: 2 }),
      status: false,
      emailShare: "",
      shareStatus: null,
      opendedId: "",
      hasMore: true,
      limitCount: 2,
      skipCount: 0,
      content: [],
      ans: "",
      contentCopy: []
    };
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

  toggleShare = id => {
    let temp = this.state.toggleShare;
    if (!temp) {
      this.setState({ toggleShare: !temp, opendedId: id, shareStatus: null });
    } else {
      this.setState({ toggleShare: !temp });
    }
  };

  loadMore = async () => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>Load more ");
    let postCounts = 0;
    let k = await callApi({ url: ROUTES.POST_COUNT, method: "POST" });
    // .then(response => {
    //   console.log('resp', response.data.count);
    //   postCounts = response.data.count;
    //   console.log('Hwy >>>>>>>@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@>>.', postCounts);
    // });
    postCounts = k.data.count;
    console.log("Hwy >>>>>>>>>>>>>>>>>>>>>>>>>>.", postCounts);
    let { skipCount, limitCount } = this.state;
    console.log(">>>>>> skip ", skipCount, limitCount);
    if (skipCount > postCounts) {
      this.setState({ hasMore: false });
      return;
    } else {
      let data = {
        skipCount: skipCount,
        limitCount: limitCount
      };
      this.setState({ skipCount: skipCount + limitCount }, () => {
        console.log(">>", this.state.skipCount);
      });
      callApi({ url: ROUTES.ALL_POSTS, method: "POST", data: data }).then(
        response => {
          const content = response.data.dataFromDatabase;
          console.log("Content", content);

          //let contentCopy = content;
          let ans = response.data.status;
          this.setState({
            content: [...this.state.content, ...content],
            ans,
            contentCopy: [...this.state.contentCopy, ...content]
          });
        }
      );
    }
  };

  // getlike = i => {
  //   //this.setState({like:true});
  //   const data = {
  //     id: i,
  //     dataUpadteToArray: localStorage.getItem("ID")
  //   };
  //   //console.log("Button id",i);
  //   //axios.post(`${SERVER_URL}/${ROUTES.LIKE}`,data)
  //   callApi({ method: "POST", url: ROUTES.LIKE, data: data }).then(response => {
  //     //console.log("lik Response -----------", response);

  //     this.allPosts();
  //   });
  // };
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
  share = (id, name) => {
    let data = {
      id: id,
      name: name,
      emailShare: this.state.emailShare
    };
    //console.log("Hello share", data);
    callApi({ method: "POST", url: ROUTES.SHARE, data: data }).then(
      response => {
        // console.log("Response share ", response);
        let shareStatus2 = response.data.status;
        this.setState(prevState => {
          return { shareStatus: shareStatus2 };
        });
        // alert(this.state.shareStatus);
      }
    );
    this.setState({ emailShare: "" });
    this.toggleShare();
  };

  changeState = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  allPosts = () => {
    callApi({ url: ROUTES.ALL_POST })
      .then(response => {
        // console.log("Response form all post-----------", response);
        // let responseFromDatabase = response.data.dataFromDatabase;
        //console.log("Response of Database ", responseFromDatabase);
        const content = response.data.dataFromDatabase;
        content.reverse();
        let contentCopy = content;
        let ans = response.data.status;
        this.setState({ content, ans, contentCopy });
      })
      .catch(err => {
        console.log("Err", err);
        if (err.message === "Network Error") {
          this.setState({ Error: true });
          console.log("Server is Not Running");
          this.props.history.push("/err");
        }
      });
  };

  componentDidMount() {
    if (localStorage.getItem("ID") != null) {
      if (this.props.match.path === "/") {
        this.props.history.push("/index");
      }
      //this.allPosts();
      //this.loadMore();
    } else {
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <div>
        <title>Home</title>
        <div className="container">
          <div className="content">
            <RightContiner
              contentCopy={this.state.contentCopy}
              onChangeCategory={newData => {
                this.setState({ content: newData });
              }}
              allPost={this.allPosts}
              history={this.props.history}
            />

            <div className="content_lft">
              {this.props.match.path === "/timeline" ? (
                <Main_timeline
                  contentCopy={this.state.contentCopy}
                  history={this.props.history}
                  onChangeMyAlbums={newData => {
                    this.setState({ content: newData });
                  }}
                />
              ) : null}
              {this.props.match.path === "/index" ? (
                <Main_index
                  contentCopy={this.state.contentCopy}
                  history={this.props.history}
                  onChangeFilter={newData => {
                    this.setState({ content: newData });
                  }}
                />
              ) : null}
              <div className="contnt_2">
                <div>
                  {" "}
                  <h3>{this.state.status}</h3>
                  <h3>{this.state.emailFromDatabase}</h3>
                </div>
                {
                  //<div>{this.state.ans==="Profile Inserted"?this.postGenerate():null}</div>
                }
                <InfiniteScroll
                  length={this.state.skipCount}
                  loadMore={this.loadMore}
                  hasMore={this.state.hasMore}
                  loader={
                    <div key={0}>
                      <h1>Loading...</h1>
                    </div>
                  }
                >
                  {this.state.content
                    ? this.state.content.map((data, index) => {
                        let date = new Date(data.time);
                        let requiredDateString = `${date.getDate()} ${
                          this.monthMap[date.getMonth()]
                        },${date.getFullYear()}  ( ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} )`;
                        return (
                          <div key={index}>
                            {
                              //console.log("url",url)
                            }

                            <div className="div_a">
                              <div className="div_title">{data.title}</div>
                              <div className="btm_rgt">
                                <div className="btm_arc">
                                  {data.categoryId.category}
                                </div>
                              </div>
                              <div className="div_top">
                                <div className="div_top_lft">
                                  <img src="images/img_6.png" alt="" />
                                  {/*Steave Waugh*/}
                                  {data.author.username}
                                </div>
                                <div className="div_top_rgt">
                                  <span className="span_date">
                                    {requiredDateString}
                                  </span>
                                  <span className="span_time"></span>
                                </div>
                              </div>
                              <div className="div_image">
                                <Link to={"/singlePost/" + data._id}>
                                  {" "}
                                  <img
                                    src={
                                      "http://127.0.0.1:8088/" +
                                      data.selectedFiles
                                    }
                                    alt="pet"
                                  />
                                </Link>
                              </div>
                              <div className="div_btm">
                                <div className="btm_list">
                                  <ul>
                                    <li>
                                      <a
                                        onClick={() => {
                                          this.toggleShare(data._id);
                                        }}
                                      >
                                        <span className="btn_icon">
                                          <img
                                            src="images/icon_001.png"
                                            alt="share"
                                          />
                                        </span>
                                        Share
                                      </a>
                                    </li>
                                    {/* <Share
                                    onToggle={toggleShare => {
                                      this.setState({
                                        toggleShare: !toggleShare
                                      });
                                    }}
                                  /> */}
                                    <li>
                                      <a
                                        onClick={() => {
                                          this.downloadFile(data.selectedFiles);
                                        }}
                                      >
                                        <span className="btn_icon">
                                          <img
                                            src="images/download.png"
                                            alt="share"
                                            style={{
                                              height: 20,
                                              width: 20
                                            }}
                                          />
                                        </span>
                                        Download
                                      </a>
                                    </li>
                                    {/* <li>
                                    <a
                                      onClick={() => {
                                        this.getlike(data._id);
                                      }}
                                    >
                                      <span className="btn_icon">
                                        <img
                                          src="images/icon_003.png"
                                          alt="share"
                                        />
                                      </span>
                                      {data.like.length}Likes
                                    </a>
                                  </li> */}
                                    <LIKEBUTTON
                                      id={data._id}
                                      allPosts={this.allPosts}
                                      noOflikes={data.like.length}
                                    />
                                    <li>
                                      <Link to={"/singlePost/" + data._id}>
                                        <span className="btn_icon">
                                          <img
                                            src="images/icon_004.png"
                                            alt="share"
                                          />
                                        </span>
                                        {data.commentNo} Comments
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div>
                                {this.state.toggleShare &&
                                data._id === this.state.opendedId ? (
                                  <form
                                    onSubmit={() =>
                                      this.share(
                                        data._id,
                                        localStorage.getItem("username")
                                      )
                                    }
                                  >
                                    <input
                                      type="email"
                                      name="emailShare"
                                      value={this.state.emailShare}
                                      onChange={this.changeState}
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
                      })
                    : null}
                </InfiniteScroll>
              </div>
              <nav>
                <li></li>
              </nav>
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
    );
  }
}

export default Timeline;
