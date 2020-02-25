import React from "react";

const Right_btn = props => {
  let { image, onClickFunc, text } = props;
  return (
    <div>
      <div className="rght_btn">
        <span className="rght_btn_icon">
          <img src={image} alt="up" />
        </span>{" "}
        <span className="btn_sep">
          <img src="/images/btn_sep.png" alt="sep" />
        </span>{" "}
        <div onClick={onClickFunc}>{text}</div>{" "}
      </div>
    </div>
  );
};

export default Right_btn;
