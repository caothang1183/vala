import React, { useContext, useEffect, useState } from "react";
import { ImageUploader } from "../../../components/ImageUploader/ImageUploader";
import { context } from "../../../provider";
import { useHistory } from "react-router-dom";
import api from "./../../../api";
import * as Action from "../../../common/constants/topicConstant";
export default function AddTopic() {
  const { topicState, topicDispatch } = useContext(context);
  const { loading } = topicState;
  let history = useHistory();

  const [image, setImage] = useState(null);
  const [newTopic, setNewTopic] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState({
    name: "",
    decription: "",
    image: "",
  });
  const handleOnChange = (event) => {
    let { name, value } = event.target;
    setNewTopic({
      ...newTopic,
      [name]: value,
    });
  };

  const handleError = (event) => {
    let { name, value } = event.target;
    let mess = "";
    switch (name) {
      case "name":
        value === "" ? (mess = "*Fill in the name") : (mess = "");
        break;
      case "description":
        value === "" ? (mess = "*Fill in the description") : (mess = "");
        break;

      default:
        break;
    }
    setError({
      ...error,
      [name]: mess,
    });
  };

  useEffect(() => {
    if (image && image.search(`"`) === -1) {
      setError({ ...error, image: "*Upload image" });
    } else {
      setError({ ...error, image: "" });
    }
  }, [image]);

  const handleCreateNewTopic = (event) => {
    event.preventDefault();
    let linkImage = image.split(`"`);
    let url = linkImage[1].split(`"`)[0];

    topicDispatch(Action.addTopicAction());
    api
      .post("/topics", [
        {
          name: newTopic.name,
          description: newTopic.description,
          url,
        },
      ])
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          topicDispatch(
            Action.addTopicSuccessAction({
              name: newTopic.name,
              id: res.data.id,
            })
          );

          history.push("/list-topic");
        }
      })
      .catch((err) => {
        topicDispatch(Action.addTopicFailedAction());
        alert(err.response.data.message);
      });
  };
  return (
    <div className="container-fluid addTopic">
      <div className="container-fluid" style={{ width: "80%" }}>
        <div className="addTopic__form">
          <h3>Add Topic</h3>

          <form onSubmit={handleCreateNewTopic}>
            <h5 className="mt-3">Name</h5>
            <input
              type="text"
              name="name"
              value={newTopic.name}
              onChange={handleOnChange}
              onBlur={handleError}
              onKeyUp={handleError}
            />
            <p className="text-danger">{error.name}</p>

            <h5 className="mt-3"> Image</h5>
            <ImageUploader image={image} setImage={setImage} />
            <p className="text-danger">{error.image}</p>

            <h5 className="mt-3"> Description</h5>
            <textarea
              cols="60"
              rows="3"
              name="description"
              value={newTopic.description || ""}
              onChange={handleOnChange}
              onBlur={handleError}
              onKeyUp={handleError}
            ></textarea>
            <p className="text-danger">{error.description}</p>

            <br />
            <button
              className="btn btn-primary mt-3"
              type="submit"
              disabled={
                loading ||
                newTopic.name === "" ||
                newTopic.description === "" ||
                !image ||
                (image && image.search(`"`) === -1)
              }
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
