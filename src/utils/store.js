import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers/index";

import loadingMiddleware from "../middlewares/loadingMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [loadingMiddleware, thunk];
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middlewares)
));

export default store;