import React from "react";
import { categoryUploadHandler } from "../helpers";

const CategoryUpload = props => {
  let { handleCategory } = props;
  const categoryUploadHandlerCaller = e => {
    categoryUploadHandler(e);
    handleCategory();
  };

  return (
    <div>
      <form onSubmit={e => categoryUploadHandlerCaller(e)}>
        <input
          type="text"
          name="newCategory"
          //value={this.state.newCategory}
          //onChange={this.changeState}
          required
        />
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
