import React from "react";
import config from "./config";
import Post from "./Component/post";
import { newComment } from "./Redux/Constant";
import callApi from "./api";
import { connect } from "react-redux";
import RightContiner from "./rightContainer";
import { commentInc } from "./Redux/Action/postAction";
// import { addComment } from "./Redux/Action/commentAction";
// import { posts } from "./Redux/helpers";
import store from "./Redux/store";
import isEmpty from "lodash/isEmpty";
import CommentText from "./Component/comment/commentText";
import NewComment from "./Component/comment/newComment";

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

  comment = e => {
    e.preventDefault();
    let { addComment } = this.props;
    // console.log(">>>>>>>>>>>", e.target.comments.value.trim());

    if (e.target.comments.value.trim() !== "") {
      const data = {
        comment: e.target.comments.value.trim(),
        userId: localStorage.getItem("ID"),
        postId: this.props.content[0]._id
      };
      // console.log("dATQ", data);
      callApi({ method: "POST", url: ROUTES.COMMENT_SAVE, data: data }).then(
        response => {
          if (response) {
            addComment(response.data);
            // store.dispatch(addComment(response.data));
            // console.log(">>>>>>>>>", data.postId);
            store.dispatch(commentInc(data));
            store.dispatch({ type: "posts", id: this.props.match.params });
            // posts(this.props.match.params);
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
      // posts(this.props.match.params);
      store.dispatch({ type: "posts", id: this.props.match.params });
      store.dispatch({ type: "defaultComments", id: this.props.match.params });
      //defaultComments(this.props.match.params);
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    let content = this.props.content[0];
    let commentArr = this.props.commentArr;
    return (
      <div>
        <div className="container">
          <div className="content">
            <RightContiner history={this.props.history} />
            <div className="content_lft">
              {!isEmpty(content) ? (
                <Post data={content} key={content._id} />
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
                          <CommentText
                            data={data}
                            requiredDateString={requiredDateString}
                            index={index}
                            key={index}
                          />
                        );
                      })
                    : null}
                </ul>
                <ul>
                  <NewComment
                    comment={this.comment}
                    commentRef={this.commentRef}
                    key={0}
                  />
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
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addComment: commentArr => dispatch({ type: newComment, commentArr })
  };
};
const mapStateToProps = (state, ownProps) => {
  //console.log("?>>>>>>>>>>>>>>>?????????????????????????", state.post.postData);
  return {
    content: state.post.singePostData,
    commentArr: state.comment.commentArr
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
