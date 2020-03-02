import React from "react";
import { categoryUploadHandler } from "../Redux/helpers";

const CategoryUpload = props => {
  let { handleCategory } = props;
  return (
    <div>
      <form
        onSubmit={e => {
          categoryUploadHandler(e);
          handleCategory();
        }}
      >
        <input type="text" name="newCategory" required />
        <div style={{ display: "inline" }} onClick={handleCategory}>
          <img
            height="15px"
            width="20px"
            alt="close icon"
            src="/images/close.ico"
          ></img>
        </div>
        <input style={{ marginTop: "5px" }} type="submit" />
      </form>
    </div>
  );
};

export default CategoryUpload;
