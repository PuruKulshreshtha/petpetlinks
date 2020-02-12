import React from "react";
import axios from "axios";
import callApi from "../api";
import { filter, get } from "lodash";
import config from "../config";

const { ROUTES, SERVER_URL } = config;

class FEATURED_POST extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  featuredPost = () => {
    //console.log("Called");
    callApi({ method: "GET", url: ROUTES.FEATURED_POST }).then(response => {
      //console.log("Response From featrued Post", response.data);
      const featuredPost = response.data;
      this.setState({ featuredPost });
    });
  };

  componentDidMount() {
    this.featuredPost();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.getFeatured !== this.props.getFeatured &&
      this.props.getFeatured
    ) {
      this.featuredPost();
    }
  }

  render() {
    return (
      <div>
        {this.state.featuredPost
          ? this.state.featuredPost.map(data => {
              return (
                <div key={data._id} className="feat_sec">
                  <div className="feat_sec_img">
                    <img
                      src={
                        SERVER_URL + "/" + get(data, "selectedFiles", "-----")
                      }
                      alt="ima"
                    />
                  </div>

                  <div className="feat_txt">{get(data, "title", "----")}</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">
                      {get(data, "categoryId.category", "----")}
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

export default FEATURED_POST;
