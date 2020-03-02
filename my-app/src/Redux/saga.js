import { post } from "./Action/postAction";
import { call, takeEvery } from "redux-saga/effects";
import { categories } from "./Action/categoryAction";
import { comment } from "./Action/commentAction";
import { singlePost, filterfunc } from "./Action/postAction";
import store from "./store";
import { get } from "lodash";
import callApi from "../api";
import config from "../config";
const { ROUTES } = config;
let isLoading = false;

function* loadMorePosts({
  postBy = {},
  skipCount = 0,
  limitCount = 6
  // categoryId = this.props.categoryId
}) {
  if (isLoading) {
    return;
  }
  let postCounts = 0;

  // console.log(postBy, skipCount, limitCount);
  isLoading = true;
  const resp = yield call(callApi, {
    url: ROUTES.POST_COUNT,
    method: "POST",
    data: postBy
  });
  postCounts = resp.data.count;
  // console.log(">>>>>>>>>>>..post count", postCounts);
  if (skipCount > postCounts) {
    // console.log("qqqqqqqqqq");

    isLoading = false;
    store.dispatch(post([], postCounts, skipCount, false, postBy));
    return;
  } else {
    let data = {
      skipCount: skipCount,
      limitCount: limitCount,
      categoryId: get(postBy, "categoryId", null)
    };
    const response = yield call(callApi, {
      url: ROUTES.ALL_POSTS,
      method: "POST",
      data: data
    });
    const content = response.data.dataFromDatabase;
    // console.log(content);
    isLoading = false;
    store.dispatch(post(content, postCounts, skipCount, true, postBy));
  }
}

function* defaultCategory() {
  const response = yield call(callApi, { url: ROUTES.DEFAULT_CATEGORY });
  let c_status = response.data.status;
  const categoryArr = response.data.dataFromDatabase;

  store.dispatch(categories(categoryArr, c_status));
}

export default function* rootSaga() {
  yield takeEvery("loadMore", loadMorePosts);
  yield takeEvery("defaultCategory", defaultCategory);
}
