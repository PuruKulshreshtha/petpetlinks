import { AllPost, Like, SinglePost, filter, comment } from "../Constant";

export const post = (postData, postCount, skipCount, hasMore, categoryId) => {
  //console.log(">>>>>>>>>>>>>>", hasMore);
  return {
    type: AllPost,
    postData: postData,
    postCount: postCount,
    skipCount: skipCount,
    hasMore: hasMore,
    categoryId: categoryId
  };
};

export const like = singePostData => {
  return {
    type: Like,
    singePostData: singePostData[0]
  };
};

export const singlePost = singePostData => {
  // console.log("?>>>>>>>>>>>>>>>>>>>>>>>??????????????", singePostData);
  return {
    type: SinglePost,
    singePostData: singePostData.dataFromDatabase
  };
};

export const filterfunc = filterData => {
  // console.log("?>>>>>>>>>>>>>>>>>>>>>>>??????????????", singePostData);
  return {
    type: filter,
    filterData: filterData
  };
};

export const commentInc = commentData => {
  // console.log("?>>>>>>>>>>>>>>>>>>>>>>>??????????????", commentData);
  return {
    type: comment,
    commentData: commentData
  };
};
