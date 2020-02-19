import { Comment, newComment } from "../Constant";

const initialState = {
  commentArr: []
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case Comment:
      return {
        ...state,
        commentArr: action.commentArr
      };
    case newComment:
      // console.log(action.commentArr);
      return {
        ...state,
        commentArr: [...state.commentArr, ...action.commentArr]
      };
    default:
      return state;
  }
};

export default commentReducer;
