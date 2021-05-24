import React, { useContext, useEffect, useState } from "react";
import { ImageUploader } from "../../../components/ImageUploader/ImageUploader";
import { context } from "../../../provider";
import { useHistory, useParams } from "react-router-dom";
import api from "./../../../api";
import * as Action from "../../../common/constants/topicConstant";

export default function EditTopic() {
  const { topicState, topicDispatch } = useContext(context);
  const { loading, topicList } = topicState;
  let history = useHistory();
  const { id } = useParams();

  const [image, setImage] = useState(null);
  const [topic, setTopic] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    let topic = {};

    if (topicList.length === 0) {
      topicDispatch(Action.actGetTopicByIdRequest());
      api
        .get(`/topics/${id}`)
        .then((res) => {
          topicDispatch(Action.actGetTopicByIdSuccess());
          setTopic(res.data)
          setImage(`<img src="${res.data.url}"/>`);
          topic = res.data;
        })
        .catch((err) => {
          topicDispatch(Action.actGetTopicByIdFailed());
          alert(err.response);
        });
    } else {
        
        if(id){
       
            let index = topicList.findIndex((item) => {
                return item.id === Number(id);
              });
        
              if (index !== -1) {
                topic = topicList[index];
                setImage(`<img src="${topicList[index].url}"/>`);
              }
        }
      
    }
    console.log(topic)

    setTopic(topic)

  }, []);

  const handleOnChange = (event) => {
    let { name, value } = event.target;
    setTopic({
      ...topic,
      [name]: value,
    });
    console.log(topic)
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

  const handleUpdateTopic = (event) => {
    event.preventDefault();
    let linkImage = image.split(`"`);
    let url = linkImage[1].split(`"`)[0];

    topicDispatch(Action.addTopicAction());
    api
      .post(`/topics/${id}`, 
        {
          name: topic.name,
          description: topic.description,
          url
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          topicDispatch(
            Action.addTopicSuccessAction({
              name: topic.name,
              id: res.data.id,
            })
          );
          setImage(null);
          setTopic({
            name: "",
            description: "",
          })

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
          <h3>Edit Topic</h3>

          <form onSubmit={handleUpdateTopic}>
            <h5 className="mt-3">Name</h5>
            <input
              type="text"
              name="name"
              value={topic.name}
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
              value={topic.description || ""}
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
                topic.name === "" ||
                topic.description === "" ||
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
