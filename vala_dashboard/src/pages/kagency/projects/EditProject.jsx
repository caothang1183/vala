import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  updateProjectAction,
  updateProjectFailedAction,
  updateProjectSuccessAction,
} from "../../../common/constants/projectConstant";
import { EditorComponent } from "../../../components/Editor/EditorComponent";
import { ImageUploader } from "../../../components/ImageUploader/ImageUploader";
import { context } from "../../../provider";
import { imageConverter } from "../../../utils/imageConverter";
import api from "./../../../api";

const EditProject = () => {
  const history = useHistory();
  const { id } = useParams();
  const { projectState, projectDispatch } = useContext(context);
  const { projectList } = projectState;
  const [topicIdList, setTopicIdList] = useState([]);
  const result = projectList.find((item) => item.id === id);
  console.log(result);
  const [editProject, setEditProject] = useState({
    project_name: result.project_name,
    title: result.title,
    description: result.description,
    topic_id: result.topic_id,
  });
  const [error, setError] = useState({
    project_name: "",
    title: "",
    topic_id: "",
    description: "",
    image: "",
    html: "",
  });

  const [html, setHtml] = useState(result.content);
  const [image, setImage] = useState(`<img src="${result.url}"/>`);

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

  const handleChange = (e) => {
    setEditProject({ ...editProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const edittingProject = {
      ...editProject,
      url: imageConverter(image),
      content: html,
      //   id: id,
    };
    console.log(edittingProject);
    projectDispatch(updateProjectAction());
    api
      .post(`/projects/${id}`, edittingProject)
      .then((res) => {
        projectDispatch(updateProjectSuccessAction());
        history.push("/list-project");
        console.log(res.data);
      })
      .catch((err) => {
        projectDispatch(updateProjectFailedAction());
        console.log(err.response);
      });
  };

  return (
    <div className="container-fluid" style={{ width: "80%" }}>
      <div className="project-content">
        <h3>Add Project</h3>
        <form className="form" onSubmit={handleSubmit} style={{ width: "90%" }}>
          <div className="grid-item">
            <h5 className="mt-3"> Project Name</h5>
            <input
              value={editProject.project_name}
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
              value={editProject.topic_id}
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
              value={editProject.title}
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
              value={editProject.description}
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

export default EditProject;
