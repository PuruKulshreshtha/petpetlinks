import React from "react";
import Popup from "./Component/popup";
import config from "./config";
import callApi from "./api";
import FEATURED_POST from "./Component/featured";
import { connect } from "react-redux";
import { post } from "./Redux/Action/postAction";
import store from "./Redux/store";
import { loadMorePosts, defaultCategory } from "./helpers";

const { ROUTES } = config;

class RightContiner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ans1: false,
      status: false,
      getFeatured: false
    };
  }

  handleChange = e => {
    let isChecked = e.target.checked;
    this.setState({ isChecked });
  };

  getFileExtension = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
  };

  fileUploadHandler = e => {
    e.preventDefault();
    let fd = new FormData();
    if (localStorage.getItem("ID") !== null) {
      fd.append("author", localStorage.getItem("ID"));
      //  console.log("Fillllllllllleelelelel", e.target.selectedFiles.files[0]);
      let extension = this.getFileExtension(
        e.target.selectedFiles.files[0].name
      );
      if (
        extension === "jpg" ||
        extension === "png" ||
        extension === "jpeg" ||
        extension === "gif"
      ) {
        fd.append("selectedFiles", e.target.selectedFiles.files[0]);

        fd.append("title", e.target.title.value);
        let cat = e.target.category.value;
        fd.append("categoryId", cat);

        if (this.state.isChecked) {
          fd.append("featured", this.state.isChecked);
        } else {
          //console.log("notfound");
          fd.append("featured", false);
        }

        callApi({ method: "POST", url: ROUTES.UPLOAD_POST, data: fd }).then(
          response => {
            let { postCount } = this.props;

            //console.log(">>>>>>>>>>Poast upload");

            let content = response.data.dataFromDatabase;
            store.dispatch(post(content, postCount, 0, true));
            this.setState({ getFeatured: true });
            this.handleClick();
          }
        );
      } else {
        alert("Enter file format not supported");
      }
    } else {
      this.props.history.push("/login");
    }
  };

  handleClick = () => {
    let temp = this.state.status;
    this.setState({ status: !temp, getFeatured: false });
  };

  handleCategory = () => {
    let temp = this.state.ans1;
    this.setState({ ans1: !temp });
  };

  categoryUploadHandler = e => {
    e.preventDefault();
    const data = {
      cname: e.target.newCategory.value
    };

    callApi({ method: "POST", url: ROUTES.CATEGORY_UPLOAD, data: data })
      .then(response => {
        this.defaultCategory();
        this.handleCategory();
        alert(response.data.status);
      })
      .catch(err => {
        if (err.message === "Network Error") {
          this.props.history.push("/err");
        }
      });
  };

  categoryForm = () => {
    return (
      <div>
        <form onSubmit={this.categoryUploadHandler}>
          <input
            type="text"
            name="newCategory"
            //value={this.state.newCategory}
            //onChange={this.changeState}
            required
          />
          <div style={{ display: "inline" }} onClick={this.handleCategory}>
            <img
              height="15px"
              width="20px"
              alt="close icon"
              src="/images/close.ico"
            ></img>
          </div>
          <input style={{ marginTop: "5px" }} type="submit" />
        </form>
      </div>
    );
  };

  componentDidMount() {
    if (localStorage.getItem("ID") !== null) {
      defaultCategory();
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.state.status ? (
            <Popup
              categories={this.props.categoriesData}
              closePopup={this.handleClick}
              fileUpload={this.fileUploadHandler}
              handleChange={this.handleChange}
            />
          ) : null}
        </div>
        <div className="content_rgt">
          <div className="rght_btn">
            {" "}
            <span className="rght_btn_icon">
              <img src="/images/btn_iconb.png" alt="up" />
            </span>{" "}
            <span className="btn_sep">
              <img src="/images/btn_sep.png" alt="sep" />
            </span>{" "}
            <div onClick={this.handleClick}>Upload Post</div>{" "}
          </div>

          <div className="rght_btn">
            {" "}
            <span className="rght_btn_icon">
              <img src="/images/btn_icona.png" alt="up" />
            </span>{" "}
            <span className="btn_sep">
              <img src="/images/btn_sep.png" alt="sep" />
            </span>{" "}
            <div onClick={this.handleCategory}>UploadCategories</div>{" "}
          </div>
          <div className="rght_cate">
            <div>{this.state.ans1 ? this.categoryForm() : null}</div>
            <div className="rght_cate_hd" id="rght_cat_bg">
              Categories
            </div>
            <div className="rght_list">
              <ul>
                {this.props.categoryStatus === "Category Inserted" ||
                this.props.categoryStatus === "Category Already Exists"
                  ? this.props.categoriesData.map((data, index) => {
                      return (
                        <li key={index}>
                          <div
                            onClick={() =>
                              loadMorePosts({
                                postBy: { categoryId: data._id },
                                skipCount: 0
                              })
                            }
                          >
                            <span className="list_icon">
                              <img src="/images/icon_03.png" alt="up" />
                            </span>{" "}
                            {data.category}
                          </div>
                        </li>
                      );
                    })
                  : null}

                <li>
                  <div
                    onClick={() => {
                      loadMorePosts({
                        postBy: {},
                        skipCount: 0
                      });
                    }}
                  >
                    <span className="list_icon">
                      <img src="/images/icon_05.png" alt="up" />
                    </span>{" "}
                    All post
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="rght_cate">
            <div className="rght_cate_hd" id="opn_cat_bg">
              Featured Post
            </div>
            <div className="sub_dwn">
              <FEATURED_POST getFeatured={this.state.getFeatured} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  //console.log("?>>>>>>>>>>>>>>>?????????????????????????", state, ownProps);
  return {
    categoriesData: state.category.categoriesData,
    hasMore: state.post.hasMore,
    categoryStatus: state.category.categoryStatus,
    skipCount: state.post.skipCount,
    limitCount: state.post.limitCount,
    postCount: state.post.postCount
  };
};
export default connect(mapStateToProps)(RightContiner);
