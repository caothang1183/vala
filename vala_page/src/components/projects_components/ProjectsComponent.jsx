import axios from "axios";
import React, { Fragment, useEffect, useReducer } from "react";
import "./ProjectsComponent.scss";
import ProjectsEvenColumn from "./ProjectsEvenColumn";
import ProjectsOddColumn from "./ProjectsOddColumn";
// import Skeleton from "@material-ui/lab/Skeleton";
// import Alert from "@material-ui/lab/Alert";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      // console.log(action.payload);
      return {
        loading: true,
        projects: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        error: "error",
        loading: true,
        projects: [],
      };
    default:
      return state;
  }
};
const ProjectsComponent = ({
  headerComponent,
  activeTab,
  isHomeComponent = false,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    projects: [],
  });

  useEffect(() => {
    let isSubscribed = true;

    axios.get("https://kagency-api.herokuapp.com/api/projects").then(
      (res) => {
        if (isSubscribed) {
          dispatch({ type: "FETCH_SUCCESS", payload: res.data });
        }
      },
      (error) => {
        console.log(error);
        dispatch({ type: "FETCH_ERROR" });
      }
    );
    return () => (isSubscribed = false);
  }, []);

  var Pfilter = state.projects.filter((item) => item.topic_id === activeTab);

  var oddProject = [];
  var evenProject = [];
  if (!state.loading) {
    // console.log("loading");
  } else {
    if (activeTab === 0 || isHomeComponent) {
      state.projects.map((item, index) => {
        if ((index + 1) % 2 === 0) {
          return evenProject.push(item);
        } else {
          return oddProject.push(item);
        }
      });
    } else {
      Pfilter.map((item, index) => {
        if ((index + 1) % 2 === 0) {
          return evenProject.push(item);
        } else {
          return oddProject.push(item);
        }
      });
    }
  }

  if (!state.loading || state.projects.length === 0) {
    return (
      <Fragment>
        <div className="ProjectsComponent">
          <div className="container" id="beginAnimationId">
            <div className="row reverse-row">
              <ProjectsOddColumn
                headerComponent={headerComponent}
                projects={oddProject}
                activate={activeTab}
                loading={true}
              />
              <ProjectsEvenColumn
                activate={activeTab}
                projects={evenProject}
                loading={true}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className="ProjectsComponent">
          <div className="container">
            <div className="row reverse-row">
              <ProjectsOddColumn
                headerComponent={headerComponent}
                projects={oddProject}
                activate={activeTab}
              />
              <ProjectsEvenColumn activate={activeTab} projects={evenProject} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default ProjectsComponent;
