import { Comment, newComment } from "../Constant";

export const comment = commentArr => {
  return {
    type: Comment,
    commentArr: commentArr
  };
};

export const addComment = commentArr => {
  return {
    type: newComment,
    commentArr: commentArr
  };
};
