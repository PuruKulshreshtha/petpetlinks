import { AllPost, Like, SinglePost, filter } from "../Constant";
import findIndex from "lodash/findIndex";

const initialState = {
  postData: [],
  singePostData: [],
  skipCount: 0,
  limitCount: 2,
  hasMore: true,
  categoryId: {}
};

const postReducer = (state = initialState, action) => {
  // console.log(">>>>>>>>>>>>>>>>> Reducer console", action.postData);
  switch (action.type) {
    case AllPost:
      if (action.skipCount === 0) {
        return {
          ...state,
          postData: action.postData,
          skipCount: action.skipCount + state.limitCount,
          postCount: action.postCount,
          hasMore: action.hasMore,
          categoryId: action.categoryId
        };
      } else {
        return {
          ...state,

          postData: [...state.postData, ...action.postData],
          skipCount: action.skipCount + state.limitCount,
          postCount: action.postCount,
          categoryId: action.categoryId,
          hasMore: action.hasMore
        };
      }
    case Like: {
      let updatedContent = [...state.postData],
        activeIndex = findIndex(state.postData, function(o) {
          return o._id === action.singePostData._id;
        });

      if (activeIndex !== -1) {
        updatedContent[activeIndex] = action.singePostData;
      }
      // console.log("active incdex", activeIndex);
      // const updatedContent = state.postData.map(data => {
      //   if (data._id === action.singePostData._id) {
      //     // console.log("no", data._id, action.singePostData._id);
      //     // console.log("Yes", data.like, action.singePostData.like);
      //     data.like = action.singePostData.like;
      //     return data;
      //   } else {
      //     return data;
      //   }
      // });
      return {
        ...state,
        postData: updatedContent
      };
    }
    case SinglePost: {
      return {
        ...state,
        singePostData: action.singePostData
      };
    }
    case filter: {
      return {
        ...state,
        postData: action.filterData
      };
    }
    default:
      return state;
  }
};

export default postReducer;
