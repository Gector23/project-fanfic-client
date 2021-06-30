import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import "@yaireo/tagify/dist/tagify.css";
import "./index.css";

import rootReducer from "./reducers/index";

import loadingMiddleware from "./middlewares/loadingMiddleware";

import App from "./containers/App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [loadingMiddleware, thunk];
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middlewares)
));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
