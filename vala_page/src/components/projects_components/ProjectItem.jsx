import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import "./ProjectItem.scss";
import Skeleton from "@material-ui/lab/Skeleton";

const reducer = (stateTopic, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        topics: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        topics: {},
        error: "Error load data",
      };
    default:
      return stateTopic;
  }
};

const ProjectItem = ({ project, Loading }) => {
  var idtopic = Loading ? 1 : project.topic_id;
  const RenderTags = () => {
    const [state, dispatch] = useReducer(reducer, {
      loading: true,
      topics: {},
      error: "Error load data",
    });

    useEffect(() => {
      let isSubscribed = true;
      //mount
      axios.get(`https://kagency-api.herokuapp.com/api/topics/${idtopic}`).then(
        (res) => {
          // console.log(res.data);
          if (isSubscribed) {
            dispatch({ type: "FETCH_SUCCESS", payload: res.data });
          }
        },
        (error) => {
          console.log(error);
          dispatch({ type: "FETCH_ERROR" });
        }
      );
      //willumount
      return () => (isSubscribed = false);
    }, []);

    if (Loading === true) {
      return (
        <div>
          <Skeleton animation="wave" variant="text" width={100} height={20} />
        </div>
      );
    } else {
      return (
        <span
          data-aos="fade-up"
          data-aos-once
          className="project-tag"
          key={Loading ? "Loading" : state.topics.id}
        >
          {state.topics.name}
        </span>
      );
    }
  };

  return (
    <div className="ProjectItem">
      {Loading ? (
        <Skeleton variant="rect" className="sketonresponsive" />
      ) : (
        <img
          data-aos="fade-up"
          data-aos-once
          src={project.url}
          className="card-img-top"
          alt={project.title.replaceAll(" ", "-").replaceAll("/", "-")}
        />
      )}
      <div className="tags">
        <RenderTags />
      </div>
      <div className="card-body">
        <h5 data-aos="fade-up" data-aos-once className="card-title">
          {Loading ? (
            <Skeleton height={25} className="sktontitle" />
          ) : (
            <Link to={`/projects/${project.id}`}>{project.title}</Link>
          )}
        </h5>
        {Loading ? (
          <Skeleton height={100} className="sktontitle" />
        ) : (
          <p data-aos="fade-up" data-aos-once className="card-text">
            {project.description}
          </p>
        )}

        {/* -----------Project Item -----------*/}
      </div>
    </div>
  );
};

export default ProjectItem;
