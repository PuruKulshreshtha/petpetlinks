import React from "react";
//import { DefaultCategory } from "./Redux/Constant";
import { connect } from "react-redux";
import { post, UpdateHasMore } from "./Redux/Action/postAction";
import store from "./Redux/store";
// import LIKEBUTTON from "./Component/like";
// import { Link } from "react-router-dom";
import Post from "./Component/post";
import config from "./config";
import callApi from "./api";
import Main_index from "./Main_Index";
import Main_timeline from "./Main_timeline";
import RightContiner from "./rightContainer";
import InfiniteScroll from "react-infinite-scroller";

const { ROUTES, SERVER_URL } = config;
class Timeline extends React.Component {
  constructor(props) {
    super(props);
    //console.log(">>>>", DefaultCategory);
    this.state = {
      toggleShare: false,
      email: "",
      selectedFiles: "",

      status: false,
      emailShare: "",
      shareStatus: null,
      opendedId: "",
      hasMoreItems: true,
      limitCount: 3,
      skipCount: 0,
      content: [],
      ans: "",
      contentCopy: [],
      postCounts: 0
    };
  }

  loadMorePosts = () => {
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>Load more ");
    let postCounts = 0;
    let postby = {};
    callApi({ url: ROUTES.POST_COUNT, method: "POST", data: postby }).then(
      resp => {
        postCounts = resp.data.count;

        let { skipCount, limitCount } = this.props;

        if (skipCount > postCounts) {
          store.dispatch(post([], postCounts, skipCount, false));
          return;
        } else {
          let data = {
            skipCount: skipCount,
            limitCount: limitCount,
            category: null
          };

          // this.setState({ skipCount: skipCount + limitCount }, () => {
          //   console.log(">>", this.state.skipCount);
          // });
          callApi({ url: ROUTES.ALL_POSTS, method: "POST", data: data }).then(
            response => {
              const content = response.data.dataFromDatabase;
              // console.log("Content", content);

              //let contentCopy = content;
              //let ans = response.data.status;
              store.dispatch(post(content, postCounts, skipCount, true));
              // this.setState({
              //   content: [...this.state.content, ...content],

              //   postCounts,
              //   hasMoreItems: true,
              //   //contentCopy: [...this.state.contentCopy, ...content],
              //   skipCount: skipCount + limitCount
              // });
              // console.log(">>>>>>>>>.Content alll", this.state.content);
            }
          );
        }
      }
    );
  };

  // allPosts = () => {
  //   console.log("chal raha hu");
  //   callApi({ url: ROUTES.ALL_POST })
  //     .then(response => {
  //       // console.log("Response form all post-----------", response);
  //       // let responseFromDatabase = response.data.dataFromDatabase;
  //       //console.log("Response of Database ", responseFromDatabase);
  //       const content = response.data.dataFromDatabase;
  //       content.reverse();
  //       let contentCopy = content;
  //       let ans = response.data.status;
  //       this.setState({ content, ans, contentCopy });
  //     })
  //     .catch(err => {
  //       console.log("Err", err);
  //       if (err.message === "Network Error") {
  //         this.setState({ Error: true });
  //         console.log("Server is Not Running");
  //         this.props.history.push("/err");
  //       }
  //     });
  // };

  componentDidMount() {
    if (localStorage.getItem("ID") != null) {
      if (this.props.match.path === "/") {
        this.props.history.push("/index");
      }
    } else {
      this.props.history.push("/login");
    }
  }
  render() {
    let { content, hasMoreItems } = this.props;
    // console.log("rendering");
    return (
      <div>
        <title>Home</title>
        <div className="container">
          <div className="content">
            <RightContiner
              // contentCopy={this.state.contentCopy}
              // onChangeCategory={newData => {
              //   this.setState({ content: newData });
              // }}
              loadMore={this.loadMorePosts}
              history={this.props.history}
            />

            <div className="content_lft">
              {this.props.match.path === "/timeline" ? (
                <Main_timeline
                  contentCopy={this.state.contentCopy}
                  history={this.props.history}
                />
              ) : null}
              {this.props.match.path === "/index" ? (
                <Main_index
                  contentCopy={this.state.contentCopy}
                  history={this.props.history}
                />
              ) : null}
              <div className="contnt_2">
                <div>
                  <h3>{this.state.status}</h3>
                  <h3>{this.state.emailFromDatabase}</h3>
                </div>

                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadMorePosts}
                  hasMore={hasMoreItems}
                  threshold={1}
                  loader={
                    <div key={0}>
                      <h1>Loading...</h1>
                    </div>
                  }
                >
                  {content
                    ? content.map((data, index) => {
                        return <Post data={data} key={index} />;
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
const mapStateToProps = (state, ownProps) => {
  //console.log("?>>>>>>>>>>>>>>>?????????????????????????", state, ownProps);
  return {
    content: state.post.postData,
    limitCount: state.post.limitCount,
    skipCount: state.post.skipCount,
    hasMoreItems: state.post.hasMore
  };
};
export default connect(mapStateToProps)(Timeline);
