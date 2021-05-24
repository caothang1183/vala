import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./index.scss";
const Kagency = lazy(() => import("./Kagency"));

function CustomLoadingOverlay() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        width: "100%",
        height: 500,
        zIndex: "200000",
      }}
    >
      <LinearProgress className="process" />
    </div>
  );
}

// const  baseUrl = document.getElementsByName('base')[0].getAttribute('href');
// const rootElement = document.getElementById('root');

ReactDOM.render(
  <Suspense fallback={<CustomLoadingOverlay />}>
    <Kagency />
  </Suspense>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
