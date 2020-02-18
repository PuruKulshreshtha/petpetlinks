import { AllPost } from "../Constant";

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
