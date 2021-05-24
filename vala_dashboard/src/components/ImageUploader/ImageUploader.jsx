import React from "react";
import ReactQuill from "react-quill";
import "./../../../node_modules/react-quill/dist/quill.snow.css";
import "./ImageUploader.scss";
import { Image } from "./imageModule";


export const ImageUploader = ({ image, setImage }) => {
  return (
    <div className="imageUploader">
      <ReactQuill
        className="mt-3"
        onChange={(e) => {
          console.log(e);
          setImage(e);
        }}
        value={image}
        modules={Image.modules}
        formats={Image.formats}
        placeholder={"upload image here"}
      />
      {/* {JSON.parse(data.url)} */}
      {/* <div dangerouslySetInnerHTML={{ __html: `${image}` }}></div> */}
    </div>
  );
};
