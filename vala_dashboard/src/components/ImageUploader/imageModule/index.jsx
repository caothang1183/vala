import ImageUploader from "quill-image-uploader";
import {Quill} from 'react-quill'

Quill.register("modules/imageUploader", ImageUploader);

export const Image = {
  modules: {
    imageUploader: {
      upload: file => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("image", file);

          fetch(
            "https://api.imgbb.com/1/upload?key=9c2563a79da4f0094b6ee0c789a54f68",
            {
              method: "POST",
              body: formData
            }
          )
            .then(response => response.json())
            .then(result => {
              console.log(result);
              resolve(result.data.url);
            })
            .catch(error => {
              reject("Upload failed");
              console.error("Error:", error);
            });
        });
      }
    },
    toolbar: [["image"]],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
   
  },
 
  formats: ["image"],
  //   propTypes: { placeholder: PropTypes.string },
};
