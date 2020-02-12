import React from "react";
import config from "./config";
import { get } from "lodash";
import Post from "./Component/post";
import callApi from "./api";
import RightContiner from "./rightContainer";
import LikeButton from "./Component/like";
const { ROUTES } = config;

class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: "",
      postId: "",
      username: "",
      requiredDateString: "",
      content: []
    };

    //console.log("this.props", this.props.match.params);
  }

  changeState = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  defaultComments = () => {
    callApi({
      method: "POST",
      data: this.props.match.params,
      url: ROUTES.DEFAULT_COMMENTS
    }).then(response => {
      //console.log("default comments--",response);
      let commentArr = response.data.dataFromDatabase;
      let c_status = response.data.status;
      // console.log("comentARR",commentArr);
      this.setState({ commentArr, c_status });
    });
  };

  posts = () => {
    const id = this.props.match.params;
    callApi({ method: "POST", data: id, url: ROUTES.SINGLE_POST }).then(
      response => {
        // console.log("Response single post",response)
        const content = response.data.dataFromDatabase;
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", content);
        const c = response.data.dataFromDatabase[0]._id;
        //console.log("Co>>>>>>>>", content.time);
        //let date = new Date(content.time);
        this.setState({ postId: c, content: content });
      }
    );
  };

  comment = e => {
    e.preventDefault();
    const data = {
      comment: this.state.comments,
      userId: localStorage.getItem("ID"),
      postId: this.state.postId
    };
    console.log("dATQ", data);
    callApi({ method: "POST", url: ROUTES.COMMENT_SAVE, data: data }).then(
      response => {
        if (response) {
          this.posts();
          this.defaultComments();
        }

        this.setState({ comments: "" });
      }
    );
  };

  componentDidMount() {
    if (
      localStorage.getItem("ID") != null &&
      this.props.match.params.id != null
    ) {
      this.posts();
      this.defaultComments();
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    let { content } = this.state;
    let { requiredDateString } = this.state;

    return (
      <div>
        <div>
          <div className="container">
            <div className="content">
              <RightContiner
                history={this.props.history}
                state={this.state.contentCopy}
                onChangeCategory={newData => {
                  this.setState({ content: newData });
                }}
              />
              <div className="content_lft">
                {content
                  ? content.map(data => {
                      return (
                        <Post data={data} key={data._id} allpost={this.posts} />
                      );
                    })
                  : null}

                <div className="contnt_3">
                  <ul>
                    {this.state.c_status === "ok"
                      ? this.state.commentArr.map((data, index) => {
                          return (
                            <div key={index}>
                              <li>
                                <div className="list_image">
                                  <div className="image_sec">
                                    <img src="/images/post_img.png" />
                                  </div>
                                  <div className="image_name">
                                    {data.userId.username}
                                  </div>
                                </div>
                                <div className="list_info">{data.comment}</div>
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
                            type="text"
                            name="comments"
                            value={this.state.comments}
                            onChange={this.changeState}
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
                    <a>View more</a>
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

export default SinglePost;
