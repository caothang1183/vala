import LinearProgress from "@material-ui/core/LinearProgress";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Provider } from "./provider";
import reportWebVitals from "./reportWebVitals";

const App = lazy(() => import("./App"));
function CustomLoadingOverlay() {
  return (
    <div
      style={{ position: "absolute", top: 0, width: "100%", zIndex: "200000" }}
    >
      <LinearProgress color="secondary" />
    </div>
  );
}
ReactDOM.render(
  <Provider>
    <Suspense fallback={<CustomLoadingOverlay />}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
