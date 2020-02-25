import React from "react";
import { Link } from "react-router-dom";

const LoginSignUpadditionalInfo = props => {
  let { text1, text2, path } = props;
  return (
    <div className="addtnal_acnt">
      {text1}
      <li>
        <Link to={path}>{text2}</Link>
      </li>
    </div>
  );
};

export default LoginSignUpadditionalInfo;
