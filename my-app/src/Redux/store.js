import { createStore, combineReducers } from "redux";

import categoryReducer from "./Reducers/categoryReducer";
import postReducer from "./Reducers/postReducer";
const rootReducers = combineReducers({
  post: postReducer,
  category: categoryReducer
});

const store = createStore(rootReducers);

export default store;
