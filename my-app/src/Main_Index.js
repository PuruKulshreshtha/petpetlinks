import React from "react";

import { orderBy } from "lodash";
class Main_Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  latest_first = () => {
    let { onChangeFilter, contentCopy } = this.props;
    let Latest = orderBy(contentCopy, "time", "desc");
    //this.setState({content:Latest});
    onChangeFilter(Latest);
  };
  mostcommented = () => {
    let { onChangeFilter, contentCopy } = this.props;
    let mostcommentedpost = orderBy(contentCopy, "commentNo", "desc");
    //console.log("most commented response",mostcommentedpost);
    // this.setState({content:mostcommentedpost});
    onChangeFilter(mostcommentedpost);
  };
  mostclicked = () => {
    let { onChangeFilter, contentCopy } = this.props;
    let mostclick = orderBy(contentCopy, "like.length", "desc");
    //console.log("most Clicked response",mostclick);
    //this.setState({content:mostclick});
    onChangeFilter(mostclick);
  };
  Oldest_First = () => {
    let { onChangeFilter, contentCopy } = this.props;
    let Oldest = orderBy(contentCopy, "time", "asc");
    // console.log("oldest",Oldest);
    //this.setState({content:Oldest});
    onChangeFilter(Oldest);
  };

  componentDidMount() {
    // console.log(this.state.Error);

    if (localStorage.getItem("ID") != null) {
      this.props.history.push("/index");
      //this.defaultCategory();
      //this.allPosts();
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div>
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

        <div className="post_div">
          <div className="post_list">
            <ul>
              <li>
                <div>
                  <span className="list_img">
                    <img src="images/img_1.png" alt="hey" />
                  </span>
                  Latest First
                </div>
              </li>
              <li>
                <div>
                  <span className="list_img">
                    <img src="images/img_2.png" alt="hey" />
                  </span>
                  Oldest First
                </div>
              </li>
              {/*<li>
                  <a href="#">
                    <span className="list_img">
                      <img src="images/img_3.png" />
                    </span>
                    Most Pet
                  </a>
                </li>*/}
              <li>
                <div>
                  <span className="list_img">
                    <img src="images/img_4.png" alt="hey" />
                  </span>
                  Most Clicks
                </div>
              </li>
              <li>
                <div>
                  <span className="list_img">
                    <img src="images/img_5.png" alt="hey" />
                  </span>
                  Most Commented
                </div>
              </li>
            </ul>
          </div>
          {
            // <div className="post_txt">4 New Post Updates</div>
          }
        </div>
      </div>
    );
  }
}

export default Main_Index;
