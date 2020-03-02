import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";
import categoryReducer from "./Reducers/categoryReducer";
import postReducer from "./Reducers/postReducer";
import commentReducer from "./Reducers/commentReducer";
import mySaga from "./saga";
const rootReducers = combineReducers({
  post: postReducer,
  category: categoryReducer,
  comment: commentReducer
});

const sagaMiddleWare = createSagaMiddleWare();

const store = createStore(rootReducers, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(mySaga);

export default store;
