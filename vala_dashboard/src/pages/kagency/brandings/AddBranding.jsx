import React, { useContext, useEffect, useState } from "react";
import { ImageUploader } from "../../../components/ImageUploader/ImageUploader";
import { context } from "../../../provider";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import * as Action from "../../../common/constants/brandingConstant";
export default function AddBranding() {
  const { brandingState, brandingDispatch } = useContext(context);
  const { loading } = brandingState;
  let history = useHistory();

  const [image, setImage] = useState(null);
  const [newBranding, setNewBranding] = useState({
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
    setNewBranding({
      ...newBranding,
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

  const handleCreateNewBranding = (event) => {
    event.preventDefault();
    let linkImage = image.split(`"`);
    let url = linkImage[1].split(`"`)[0];

    brandingDispatch(Action.addBrandingAction());
    api
      .post("/branding", [
        {
          name: newBranding.name,
          description: newBranding.description,
          url,
        },
      ])
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          brandingDispatch(
            Action.addBrandingSuccessAction({
              name: newBranding.name,
              id: res.data.id,
            })
          );

          history.push("/list-branding");
        }
      })
      .catch((err) => {
        brandingDispatch(Action.addBrandingFailedAction());
        alert(err.response.data.message);
      });
  };
  return (
    <div className="container-fluid addBranding">
      <div className="container-fluid" style={{ width: "80%" }}>
        <div className="addBranding__form">
          <h3>Add Branding</h3>

          <form onSubmit={handleCreateNewBranding}>
            <h5 className="mt-3">Name</h5>
            <input
              type="text"
              name="name"
              value={newBranding.name}
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
              value={newBranding.description || ""}
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
                newBranding.name === "" ||
                newBranding.description === "" ||
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
