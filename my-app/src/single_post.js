import React from "react";
import config from "./config";
import Post from "./Component/post";
import callApi from "./api";
import { connect } from "react-redux";
import RightContiner from "./rightContainer";
import { singlePost, commentInc } from "./Redux/Action/postAction";
import { comment, addComment } from "./Redux/Action/commentAction";

import store from "./Redux/store";
import isEmpty from "lodash/isEmpty";

const { ROUTES } = config;

class SinglePost extends React.Component {
  constructor(props) {
    super(props);

    this.commentRef = React.createRef();
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
    //console.log("this.props", this.props.match.params);
  }

  defaultComments = () => {
    callApi({
      method: "POST",
      data: this.props.match.params,
      url: ROUTES.DEFAULT_COMMENTS
    }).then(response => {
      store.dispatch(comment(response.data.dataFromDatabase));
      // console.log(">>>>>>>>>>.... default comments", this.props.commentArr);
    });
  };

  posts = () => {
    const id = this.props.match.params;
    callApi({ method: "POST", data: id, url: ROUTES.SINGLE_POST }).then(
      response => {
        store.dispatch(singlePost(response.data));
      }
    );
  };

  comment = e => {
    e.preventDefault();
    // console.log(">>>>>>>>>>>", e.target.comments.value);
    if (e.target.comments.value !== "") {
      const data = {
        comment: e.target.comments.value,
        userId: localStorage.getItem("ID"),
        postId: this.props.content[0]._id
      };
      // console.log("dATQ", data);
      callApi({ method: "POST", url: ROUTES.COMMENT_SAVE, data: data }).then(
        response => {
          if (response) {
            store.dispatch(addComment(response.data));
            // console.log(">>>>>>>>>", data.postId);
            store.dispatch(commentInc(data));
            this.posts();
          }
          this.commentRef.current.value = "";
        }
      );
    } else {
      alert("Please first enter the comment ");
    }
  };

  componentDidMount() {
    if (
      localStorage.getItem("ID") != null &&
      this.props.match.params.id != null
    ) {
      window.scrollTo(0, 0);
      this.posts();
      this.defaultComments();
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    let content = this.props.content[0];
    let commentArr = this.props.commentArr;
    return (
      <div>
        <div>
          <div className="container">
            <div className="content">
              <RightContiner history={this.props.history} />
              <div className="content_lft">
                {!isEmpty(content) ? (
                  <Post data={content} key={content._id} allpost={this.posts} />
                ) : null}

                <div className="contnt_3">
                  <ul>
                    {commentArr
                      ? commentArr.map((data, index) => {
                          let date = new Date(data.time);
                          let requiredDateString = `${date.getDate()} ${
                            this.monthMap[date.getMonth()]
                          },${date.getFullYear()}  ( ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} )`;
                          return (
                            <div key={index}>
                              <li>
                                <div className="list_image">
                                  <div className="image_sec">
                                    <img
                                      src="/images/post_img.png"
                                      alt="hello"
                                    />
                                  </div>
                                  <div className="image_name">
                                    {data.userId.username}
                                  </div>
                                </div>
                                <div className="list_info">
                                  {data.comment}
                                  <span
                                    style={{
                                      float: "right",
                                      color: "#a5a5a6"
                                    }}
                                  >
                                    {"~ " + requiredDateString}
                                  </span>
                                </div>
                              </li>
                            </div>
                          );
                        })
                      : null}
                  </ul>
                  <ul>
                    <li>
                      <form onSubmit={this.comment}>
                        <div className="cmnt_div1">
                          <input
                            ref={this.commentRef}
                            type="text"
                            name="comments"
                            placeholder="Enter your Comment"
                            className="cmnt_bx1"
                            required
                          />
                          <input
                            type="submit"
                            className="sub_bttn1"
                            defaultValue="Submit Comment"
                          />
                        </div>
                      </form>
                    </li>
                  </ul>
                  <div className="view_div">
                    <div>View more</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="clear" />
          </div>
        </div>
        ;
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  //console.log("?>>>>>>>>>>>>>>>?????????????????????????", state.post.postData);
  return {
    content: state.post.singePostData,
    commentArr: state.comment.commentArr
  };
};
export default connect(mapStateToProps)(SinglePost);
