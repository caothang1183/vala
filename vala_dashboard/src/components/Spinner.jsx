import React, { useContext, useEffect } from "react";
import { context } from "../provider";
import "./Spinner.scss";

const Spinner = () => {
  const { topicState, categoriesState, projectState, blogState, userState } =
    useContext(context);
  const { loading } = topicState;
  const loadingCategories = categoriesState.loading;
  const loadingProject = projectState.loading;
  const loadingBlog = blogState.loading;
  const loadingUser = userState.loading;
  useEffect(() => {
    console.log(loading);
  }, [loading]);
  return (
    <div
      className={`modal fade ${
        loading || loadingCategories || loadingProject || loadingBlog || loadingUser
          ? "show"
          : ""
      }`}
      id="loadMe"
      style={{
        display: `${
          loading || loadingCategories || loadingProject || loadingBlog || loadingUser
            ? "block"
            : ""
        }`,
      }}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="loadMeLabel"
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-body text-center">
            <div className="loader" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
