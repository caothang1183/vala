import ImageCompress from "quill-image-compress";
import ImageResize from "quill-image-resize-module-react";
import { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";

Quill.register("modules/imageCompress", ImageCompress);
Quill.register("modules/ImageResize", ImageResize);
Quill.register("modules/imageUploader", ImageUploader);

export const Editor = {
  modules: {
    imageUploader: {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("image", file);

          fetch(
            "https://api.imgbb.com/1/upload?key=9c2563a79da4f0094b6ee0c789a54f68",
            {
              method: "POST",
              body: formData,
            }
          )
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              resolve(result.data.url);
            })
            .catch((error) => {
              reject("Upload failed");
              console.error("Error:", error);
            });
        });
      },
    },

    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      [{ align: "center" }, { align: "right" }, { align: "justify" }],
      [("bold", "italic", "underline", "strike", "blockquote")],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
          ],
        },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    ImageResize: {
      modules: ["Resize", "DisplaySize"],
    },
    // imageCompress: {
    //   quality: 0.4, // default
    //   maxWidth: 1000, // default
    //   maxHeight: 1000, // default
    //   imageType: "image/jpeg", // default
    //   debug: true, // default
    // },
  },
  formats: [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
  ],
  //   propTypes: { placeholder: PropTypes.string },
};
