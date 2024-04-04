import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Body from "./Components/Body";
import { Provider } from "react-redux";
import appStore from "./RTKFiles/appStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <Body />
    </Provider>
  </React.StrictMode>
);
