import React from "react";
import { latest_first } from "../helpers";
const IndexButton = props => {
  let { image, text, data } = props;
  return (
    <div onClick={() => latest_first(data)}>
      <span className="list_img">
        <img src={image} alt="hey" />
      </span>
      {text}
    </div>
  );
};

export default IndexButton;
