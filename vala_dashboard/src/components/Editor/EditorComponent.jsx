import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "./../../../node_modules/react-quill/dist/quill.snow.css";
import "./Editor.scss";

import { Editor } from "./editorModule";

export const EditorComponent = ({ html, setHtml }) => {
  

  return (
    <div className="editor">
      <ReactQuill
        className="mt-3"
        onChange={(e) => {
          setHtml(e);
        }}
        value={html}
        modules={Editor.modules}
        formats={Editor.formats}
        placeholder={"write something in here"}
      />
      {/* <div dangerouslySetInnerHTML={{ __html: `${html}` }}></div> */}
    </div>
  );
  
   

   
  
};
