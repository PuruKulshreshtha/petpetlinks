import { createStore, combineReducers } from "redux";

import categoryReducer from "./Reducers/categoryReducer";
import postReducer from "./Reducers/postReducer";
import commentReducer from "./Reducers/commentReducer";

const rootReducers = combineReducers({
  post: postReducer,
  category: categoryReducer,
  comment: commentReducer
});

const store = createStore(rootReducers);

export default store;
