import React, { useContext, useEffect, useState } from "react";
import { EditorComponent } from "../../../components/Editor/EditorComponent";
import { ImageUploader } from "../../../components/ImageUploader/ImageUploader";
import { imageConverter } from "./../../../utils/imageConverter";
import "./AddProject.scss";
import api from "./../../../api";
import { context } from "../../../provider";
import {
  addProjectAction,
  addProjectFailedAction,
  addProjectSuccessAction,
} from "../../../common/constants/projectConstant";
import { useHistory } from "react-router";

const AddProject = () => {
  const [html, setHtml] = useState(null);
  const [image, setImage] = useState(null);
  const [topicIdList, setTopicIdList] = useState([]);
  const [newProject, setNewProject] = useState({
    project_name: "",
    title: "",
    topic_id: "",
    description: "",
  });
  const { projectDispatch } = useContext(context);
  const [error, setError] = useState({
    project_name: "",
    title: "",
    topic_id: "",
    description: "",
    image: "",
    html: "",
  });
  const history = useHistory();

  useEffect(() => {
    api
      .get("/topics")
      .then((res) => {
        console.log(res.data);
        setTopicIdList(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  useEffect(() => {
    console.log(newProject);
    console.log("image", image);
    console.log("html", html);
  }, [newProject]);

  useEffect(() => {
    if (html === "<p><br></p>") {
      setError({ ...error, content: "*Content cannot be empty" });
    } else {
      setError({ ...error, content: "" });
    }
  }, [html]);

  useEffect(() => {
    if (image && image.search(`"`) === -1) {
      setError({ ...error, image: "*Upload an image" });
    } else {
      setError({ ...error, image: "" });
    }
  }, [image]);

  useEffect(() => {
    console.log(error);
    console.log(
      "button disabled = ",
      Object.values(error).every((property) => property === "")
    );
  }, [error]);

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleError = (e) => {
    let { name, value } = e.target;
    let mess = "";
    switch (name) {
      case "project_name":
        mess = value === "" ? "*Project name cannot be empty" : "";
        break;
      case "title":
        mess = value === "" ? "*Title cannot be empty" : "";
        break;
      case "description":
        mess = value === "" ? "*Description cannot be empty" : "";
        break;
      case "topic_id":
        mess = value === "0" ? "*Please choose a topic name" : "";
        break;
      default:
        break;
    }
    setError({
      ...error,
      [name]: mess,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(newProject).some((property) => property === "")) {
      alert("please fill in form before submitting");
    } else {
      const addingProject = {
        ...newProject,
        url: imageConverter(image),
        content: html,
      };
      projectDispatch(addProjectAction());
      api
        .post("/projects", addingProject)
        .then((res) => {
          projectDispatch(addProjectSuccessAction());
          history.push("/list-project");
          console.log(res.data);
        })
        .catch((err) => {
          projectDispatch(addProjectFailedAction());
          console.log(err);
        });
    }
  };

  return (
    <div className="container-fluid" style={{ width: "80%" }}>
      <div className="project-content">
        <h3>Add Project</h3>
        <form className="form" onSubmit={handleSubmit} style={{ width: "90%" }}>
          <div className="grid-item">
            <h5 className="mt-3"> Project Name</h5>
            <input
              name="project_name"
              className="input-name"
              type="text"
              onChange={handleChange}
              onBlur={handleError}
              onKeyUp={handleError}
            />
            <p className="text-danger">{error.project_name}</p>
          </div>
          <div className="grid-item">
            <h5 className="mt-3"> Topic Name</h5>
            <select
              name="topic_id"
              style={{ display: "block" }}
              onChange={handleChange}
              onBlur={handleError}
              onKeyUp={handleError}
            >
              <option value={0}>Choose a topic name</option>
              {topicIdList.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <p className="text-danger">{error.topic_id}</p>
          </div>
          <div className="grid-item">
            <h5 className="mt-3"> Title</h5>
            <textarea
              name="title"
              cols="60"
              rows="4"
              onChange={handleChange}
              onBlur={handleError}
              onKeyUp={handleError}
            ></textarea>
            <p className="text-danger">{error.title}</p>
          </div>
          <div className="grid-item">
            <h5 className="mt-3"> Description</h5>
            <textarea
              name="description"
              cols="60"
              rows="4"
              onChange={handleChange}
              onBlur={handleError}
              onKeyUp={handleError}
            ></textarea>
            <p className="text-danger">{error.description}</p>
          </div>
        </form>
        <div className="grid-item">
          <h5 className="mt-3"> Image</h5>
          <ImageUploader image={image} setImage={setImage} />
          <p className="text-danger">{error.image}</p>
        </div>
        <div className="grid-item">
          <h5 className="mt-3">Editor</h5>
          <EditorComponent html={html} setHtml={setHtml} />
          <p className="text-danger">{error.content}</p>
        </div>
        <button
          className="btn btn-primary mt-3"
          type="button"
          onClick={handleSubmit}
          disabled={!Object.values(error).every((property) => property === "")}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProject;
