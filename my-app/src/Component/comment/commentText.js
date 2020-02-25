import React from "react";

const CommentText = props => {
  let { requiredDateString, data, index } = props;
  return (
    <div key={index}>
      <div key={index}>
        <li>
          <div className="list_image">
            <div className="image_sec">
              <img src="/images/post_img.png" alt="hello" />
            </div>
            <div className="image_name">{data.userId.username}</div>
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
    </div>
  );
};

export default CommentText;
