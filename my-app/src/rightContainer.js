import React from "react";
import Loadable from "react-loadable";
import Popup from "./Component/popup";
import config from "./config";
import callApi from "./api";
import FEATURED_POST from "./Component/featured";
import { connect } from "react-redux";
import store from "./Redux/store";
import { loadMorePosts, defaultCategory, getFileExtension } from "./helpers";
import CategoryUpload from "./Component/categoryUpload";
import Rightbtn from "./Component/right_btn";

const { ROUTES } = config;
const post = Loadable({
  loader: () => import("./Redux/Action/postAction"),
  loading() {
    return <div>Loading ....... </div>;
  }
});
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
      let extension = getFileExtension(e.target.selectedFiles.files[0].name);
      // console.log("extension", extension);
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
    // console.log("hello", data);
    callApi({ method: "POST", url: ROUTES.CATEGORY_UPLOAD, data: data })
      .then(response => {
        defaultCategory();
        this.handleCategory();
        alert(response.data.status);
      })
      .catch(err => {
        if (err.message === "Network Error") {
          this.props.history.push("/err");
        }
      });
  };

  componentDidMount() {
    if (localStorage.getItem("ID") !== null) {
      defaultCategory();
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    let { categoriesData } = this.props;
    return (
      <div>
        <div>
          {this.state.status ? (
            <Popup
              categories={categoriesData}
              closePopup={this.handleClick}
              fileUpload={this.fileUploadHandler}
              handleChange={this.handleChange}
            />
          ) : null}
        </div>
        <div className="content_rgt">
          <Rightbtn
            text={"Upload Post"}
            onClickFunc={this.handleClick}
            image={"/images/btn_iconb.png"}
          />
          <Rightbtn
            text={"Upload Category"}
            onClickFunc={this.handleCategory}
            image={"/images/btn_icona.png"}
          />

          <div className="rght_cate">
            <div>
              {this.state.ans1 ? (
                <CategoryUpload handleCategory={this.handleCategory} />
              ) : null}
            </div>
            <div className="rght_cate_hd" id="rght_cat_bg">
              Categories
            </div>
            <div className="rght_list">
              <ul>
                {categoriesData
                  ? categoriesData.map((data, index) => {
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
