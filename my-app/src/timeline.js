import React from "react";
import { connect } from "react-redux";
import { post } from "./Redux/Action/postAction";
import store from "./Redux/store";
import { get } from "lodash";
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
    this.state = {};
  }

  loadMorePosts = ({
    postBy = this.props.categoryId,
    skipCount = this.props.skipCount,
    limitCount = this.props.limitCount,
    categoryId = this.props.categoryId
  }) => {
    let postCounts = 0;
    callApi({ url: ROUTES.POST_COUNT, method: "POST", data: postBy }).then(
      resp => {
        postCounts = resp.data.count;

        if (skipCount > postCounts) {
          store.dispatch(post([], postCounts, skipCount, false, postBy));
          return;
        } else {
          let data = {
            skipCount: skipCount,
            limitCount: limitCount,
            categoryId: get(postBy, "categoryId", null)
          };
          callApi({ url: ROUTES.ALL_POSTS, method: "POST", data: data }).then(
            response => {
              const content = response.data.dataFromDatabase;

              store.dispatch(
                post(content, postCounts, skipCount, true, postBy)
              );
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
    if (localStorage.getItem("ID") !== null) {
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
              loadMore={this.loadMorePosts}
              history={this.props.history}
            />

            <div className="content_lft">
              {this.props.match.path === "/timeline" ? (
                <Main_timeline history={this.props.history} />
              ) : null}
              {this.props.match.path === "/index" ? (
                <Main_index history={this.props.history} />
              ) : null}
              <div className="contnt_2">
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
  return {
    content: state.post.postData,
    limitCount: state.post.limitCount,
    skipCount: state.post.skipCount,
    hasMoreItems: state.post.hasMore,
    categoryId: state.post.categoryId
  };
};
export default connect(mapStateToProps)(Timeline);
