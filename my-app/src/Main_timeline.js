import React from "react";
import { filter } from "lodash";

class Main_timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(">>>>>>>>>>>>>>>>>>>", props);
  }

  profileChange = () => {
    console.log(">>>>>>>>>>>>>..profileChange");
  };
  myUploads = () => {
    //console.log("My uploads")
    let { onChangeMyAlbums, contentCopy } = this.props;
    //console.log("name",this.props.state)
    let mail = localStorage.getItem("mail");
    //console.log("mail is", mail);
    //console.log("fdshfshdf",contentCopy);
    document.getElementById("m").setAttribute("class", "active");
    document.getElementById("t").setAttribute("class", "");
    let myUploadsData = filter(contentCopy, user => {
      return user.author.email === mail;
    });
    //console.log("myupkloadas",myUploadsData);
    onChangeMyAlbums(myUploadsData);
    // console.log("my uploadas data ",myUploadsData);
    this.setState({ content: myUploadsData });
  };
  componentDidMount() {
    // console.log(this.state.Error);

    if (localStorage.getItem("ID") != null) {
      this.props.history.push("/timeline");
      //
      //this.defaultCategory();
      //this.allPosts();
    } else {
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <div>
        <div className="contnt_1">
          <div className="list_1">
            <ul>
              <li>
                <input type="checkbox" className="chk_bx" />
                Friends
              </li>
              <li>
                <input type="checkbox" className="chk_bx" />
                Flaged
              </li>
            </ul>
          </div>
          <div className="timeline_div">
            <div className="timeline_div1">
              <div className="profile_pic">
                <a onClick={this.profileChange}>
                  <img src="images/123.jpg" alt="" />
                </a>
                {/* <div className="profile_text">
                        <a >Change Profile Pic</a>
                      </div> */}
              </div>
              <div className="profile_info">
                <div className="edit_div">
                  <a>
                    Edit <img src="images/timeline_img.png" alt="" />
                  </a>
                </div>
                <div className="profile_form">
                  <ul>
                    <li>
                      <div className="div_name1">Name :</div>
                      <div className="div_name2">
                        {localStorage.getItem("username")}
                      </div>
                    </li>
                    <li>
                      <div className="div_name1">{/*Sex :*/}</div>
                      <div className="div_name2">{/*Female*/}</div>
                    </li>
                    <li>
                      <div className="div_name1">Description :</div>
                      <div className="div_name3">
                        This is an example of a comment. You can create as many
                        comments like this one or sub comments as you like and
                        manage all of your content inside Account.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="timeline_div2">
              <ul>
                <li>
                  <a id="t" className="active">
                    Timeline{" "}
                  </a>
                </li>
                <li>
                  <a>About </a>
                </li>
                <li>
                  <a>Album</a>
                </li>
                <li>
                  <a> Pets</a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      this.myUploads();
                    }}
                    id="m"
                  >
                    My Uploads{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main_timeline;
