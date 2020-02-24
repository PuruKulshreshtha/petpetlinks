import React from "react";
import config from "./config";
import callApi from "./api";
import { get } from "lodash";
import Dropzone from "react-dropzone";
const { ROUTES, SERVER_URL } = config;
class Main_timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: "123.jpg"
    };
  }
  getFileExtension = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
  };

  defaultProfile = () => {
    let data = {
      userId: localStorage.getItem("ID")
    };
    callApi({ url: ROUTES.DEFAULT_PIC, data: data, method: "POST" }).then(
      response => {
        let profilePic1 = response.data.profilePic;
        this.setState({ profilePic: profilePic1 });
      }
    );
  };
  profileChange = pic => {
    let fd = new FormData();
    let extension = this.getFileExtension(pic[0].name);
    if (
      extension === "jpg" ||
      extension === "png" ||
      extension === "jpeg" ||
      extension === "gif"
    ) {
      fd.append("profilePic", pic[0]);
      fd.append("userId", localStorage.getItem("ID"));

      callApi({
        url: ROUTES.PROFILE_PIC,
        data: fd,
        method: "POST"
      }).then(response => {
        this.defaultProfile();
      });
    } else {
      alert("Invalid File format");
    }
  };

  myUploads = () => {
    console.log("My uploads ????????????????");
  };
  // myUploads = () => {
  //   //console.log("My uploads")
  //   let { onChangeMyAlbums, contentCopy } = this.props;
  //   //console.log("name",this.props.state)
  //   let mail = localStorage.getItem("mail");
  //   //console.log("mail is", mail);
  //   //console.log("fdshfshdf",contentCopy);
  //   document.getElementById("m").setAttribute("class", "active");
  //   document.getElementById("t").setAttribute("class", "");
  //   let myUploadsData = filter(contentCopy, user => {
  //     return user.author.email === mail;
  //   });
  //   //console.log("myupkloadas",myUploadsData);
  //   onChangeMyAlbums(myUploadsData);
  //   // console.log("my uploadas data ",myUploadsData);
  //   this.setState({ content: myUploadsData });
  // };
  componentDidMount() {
    if (localStorage.getItem("ID") !== null) {
      this.props.history.push("/timeline");
      this.defaultProfile();
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    let name = localStorage.getItem("username");
    if (name !== null) {
      name = name.toUpperCase();
    }
    let profilePic = get(this.state, "profilePic", "123.jpg");
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
              <div style={{ borderRadius: "10px" }} className="profile_pic">
                <div>
                  <Dropzone
                    onDrop={acceptedFiles => this.profileChange(acceptedFiles)}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <img
                            style={{ borderRadius: "10px" }}
                            src={`${SERVER_URL}/${profilePic}`}
                            alt=""
                          />
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  {/* <img src="images/123.jpg" alt="" /> */}
                </div>
                <div className="profile_text">
                  {/* <Dropzone
                    onDrop={acceptedFiles => console.log(acceptedFiles)}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <img src="images/123.jpg" alt="" />
                        </div>
                      </section>
                    )}
                  </Dropzone> */}
                  {/* <a onClick={() => this.uploadProfilePic}>
                    Change Profile Pic
                  </a> */}
                </div>
              </div>
              <div className="profile_info">
                <div className="edit_div">
                  <div>
                    Edit <img src="images/timeline_img.png" alt="" />
                  </div>
                </div>
                <div className="profile_form">
                  <ul>
                    <li>
                      <div className="div_name2">Name : {name}</div>
                      <div className="div_name2"></div>
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
                  <div
                    id="t"
                    className="active"
                    onClick={() => {
                      document.getElementById("t").className = "active";
                      document.getElementById("m").className = "";
                    }}
                  >
                    Timeline{" "}
                  </div>
                </li>
                <li>
                  <div>About </div>
                </li>
                <li>
                  <div>Album</div>
                </li>
                <li>
                  <div> Pets</div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      document.getElementById("m").className = "active";
                      document.getElementById("t").className = "";
                      this.myUploads();
                    }}
                    id="m"
                  >
                    My Uploads{" "}
                  </div>
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
