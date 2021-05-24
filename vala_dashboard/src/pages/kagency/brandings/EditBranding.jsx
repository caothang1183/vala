import React, { useContext, useEffect, useState } from "react";
import { ImageUploader } from "../../../components/ImageUploader/ImageUploader";
import { context } from "../../../provider";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";
import * as Action from "../../../common/constants/brandingConstant";

export default function EditBranding() {
  const { brandingState, brandingDispatch } = useContext(context);
  const { loading, brandingList } = brandingState;
  let history = useHistory();
  const { id } = useParams();

  const [image, setImage] = useState(null);
  const [branding, setBranding] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    let branding = {};

    if (brandingList.length === 0) {
      brandingDispatch(Action.actGetBrandingByIdRequest());
      api
        .get(`/branding/${id}`)
        .then((res) => {
          brandingDispatch(Action.actGetBrandingByIdSuccess());
          setBranding(res.data);
          setImage(`<img src="${res.data.url}"/>`);
          branding = res.data;
        })
        .catch((err) => {
          brandingDispatch(Action.actGetBrandingByIdFailed());
          alert(err.response);
        });
    } else {
      if (id) {
        let index = brandingList.findIndex((item) => {
          return item.id === Number(id);
        });

        if (index !== -1) {
          branding = brandingList[index];
          setImage(`<img src="${brandingList[index].url}"/>`);
        }
      }
    }
    console.log(branding);

    setBranding(branding);
  }, []);

  const handleOnChange = (event) => {
    let { name, value } = event.target;
    setBranding({
      ...branding,
      [name]: value,
    });
    console.log(branding);
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

  const handleUpdateBranding = (event) => {
    event.preventDefault();
    let linkImage = image.split(`"`);
    let url = linkImage[1].split(`"`)[0];

    brandingDispatch(Action.addBrandingAction());
    api
      .post(`/branding/${id}`, {
        name: branding.name,
        description: branding.description,
        url,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          brandingDispatch(
            Action.addBrandingSuccessAction({
              name: branding.name,
              id: res.data.id,
            })
          );
          setImage(null);
          setBranding({
            name: "",
            description: "",
          });

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
          <h3>Edit Branding</h3>

          <form onSubmit={handleUpdateBranding}>
            <h5 className="mt-3">Name</h5>
            <input
              type="text"
              name="name"
              value={branding.name}
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
              value={branding.description || ""}
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
                branding.name === "" ||
                branding.description === "" ||
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
