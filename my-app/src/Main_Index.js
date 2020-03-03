import React from "react";
import CheckboxTimeline from "./Component/checkboxTimeline";
import IndexButton from "./Component/indexButton";

const Main_Index = props => {
  window.scrollTo(0, 0);
  return (
    <div>
      <CheckboxTimeline />
      <div className="post_div">
        <div className="post_list">
          <ul>
            <li>
              <IndexButton
                text={"Latest First"}
                image={"/images/img_1.png"}
                data={{ time: -1 }}
              />
            </li>
            <li>
              <IndexButton
                text={"  Oldest First"}
                image={"/images/img_2.png"}
                data={{ time: 1 }}
              />
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
              <div onClick={() => alert("Not Working comming soon")}>
                <span className="list_img">
                  <img src="images/img_4.png" alt="hey" />
                </span>
                Most Likes
              </div>
            </li>
            <li>
              <IndexButton
                text={"Most Commented"}
                image={"/images/img_5.png"}
                data={{ commentNo: -1 }}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Main_Index;
