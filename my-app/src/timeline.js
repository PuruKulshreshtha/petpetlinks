import React, { useEffect } from "react";
import Loadable from "react-loadable";
import { connect } from "react-redux";
import Mainindex from "./Main_Index";
import Maintimeline from "./Main_timeline";
import RightContiner from "./rightContainer";
import InfiniteScroll from "react-infinite-scroller";
import { loadMorePosts } from "./helpers";

const Post = Loadable({
  loader: () => import("./Component/post"),
  loading() {
    return <div>Loading ....... </div>;
  }
});

const Timeline = props => {
  useEffect(() => {
    if (localStorage.getItem("ID") !== null) {
      if (props.match.path === "/") {
        props.history.push("/index");
      }
    } else {
      props.history.push("/login");
    }
  }, [props]);

  let { content, hasMoreItems, limitCount, skipCount } = props;
  let postBy = props.categoryId;

  return (
    <div>
      <title>Home</title>
      <div className="container">
        <div className="content">
          <RightContiner history={props.history} />

          <div className="content_lft">
            {/* <Temp /> */}
            {props.match.path === "/timeline" ? (
              <Maintimeline history={props.history} />
            ) : null}
            {props.match.path === "/index" ? (
              <Mainindex history={props.history} />
            ) : null}
            <div className="contnt_2">
              <InfiniteScroll
                pageStart={1}
                loadMore={() => {
                  loadMorePosts({
                    postBy: postBy,
                    skipCount: skipCount,
                    limitCount: limitCount
                  });
                }}
                hasMore={hasMoreItems}
                style={{ width: "100%", height: "100%" }}
                // threshold={1}
                loader={
                  <div key={0} style={{ height: "100%", width: "100%" }}>
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
};

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
