import React from "react";
const NewComment = props => {
  let { comment, commentRef } = props;

  return (
    <li key={0}>
      <form onSubmit={comment}>
        <div className="cmnt_div1">
          <input
            ref={commentRef}
            type="text"
            name="comments"
            placeholder="Enter your Comment"
            className="cmnt_bx1"
            required
          />
          <input
            type="submit"
            className="sub_bttn1"
            defaultValue="Submit Comment"
          />
        </div>
      </form>
    </li>
  );
};

export default NewComment;
