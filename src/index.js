import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import "@yaireo/tagify/dist/tagify.css";
import "./index.css";

import store from "./utils/store";


import App from "./containers/App";

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
