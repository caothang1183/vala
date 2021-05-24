import React, { useContext, useEffect, useState } from "react";
import { EditorComponent } from "../../../components/Editor/EditorComponent";
import { ImageUploader } from "../../../components/ImageUploader/ImageUploader";
import * as Action from "../../../common/constants/blogConstant";
import * as ActionCate from "../../../common/constants/categoriesConstant";
import { context } from "../../../provider";
import { useHistory } from "react-router-dom";
import api from "./../../../api";

export default function AddBlog() {
  let history = useHistory();
  const { blogDispatch, blogState, categoriesState, categoriesDispatch } =
    useContext(context);
  const { isUpdate } = blogState;
  const { categoriesList } = categoriesState;
  const [html, setHtml] = useState(null);
  const [image, setImage] = useState(null);

  const [error, setError] = useState({
    title: "",
    category_id: "",
    image: "",
    content: "",
  });
  const [blog, setBlog] = useState({
    title: "",
    category_id: 0,
  });

  useEffect(() => {
    if (categoriesList.length === 0) {
      categoriesDispatch(ActionCate.fetchCategoriesAction());
      api
        .get("/cate")
        .then((res) => {
          categoriesDispatch(ActionCate.fetchCategoriesSuccessAction(res.data));
        })
        .catch((err) => {
          categoriesDispatch(ActionCate.fetchCategoriesFailedAction());
          console.log(err);
        });
    }
  }, []);

  const handleOnChange = (event) => {
    let { name, value } = event.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  const handleError = (event) => {
    let { name, value } = event.target;
    let mess = "";
    console.log(name, value)
    switch (name) {
      case "category_id":
        value === '0' ? (mess = "*Choose a category") : (mess = "");
        break;
      case "title":
        value === "" ? (mess = "*Fill in the title") : (mess = "");
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
    if (html === "<p><br></p>") {
      setError({ ...error, content: "*Fill in the content" });
    } else {
      setError({ ...error, content: " " });
    }
  }, [html]);

  useEffect(() => {
    if (image && image.search(`"`) === -1) {
      setError({ ...error, image: "*Upload image" });
    } else {
      setError({ ...error, image: "" });
    }
  }, [image]);

  const handleCreateNewBlog = (event) => {
    event.preventDefault();

    let linkImage = image.split(`"`);
      let url = linkImage[1].split(`"`)[0];
    blogDispatch(Action.actCreateNewBlogRequest());
    api
      .post("/blogs", [
        {
          url,
          title: blog.title,
          category_id: blog.category_id,
          content: html,
        },
      ])
      .then((res) => {
        blogDispatch(Action.actCreateNewBlogSuccess(res.data));
        history.push("/list-blogs");
      })
      .catch((err) => {
        blogDispatch(Action.actCreateNewBlogFailed());
        console.log(err);
      });
  };
  return (
    <div className="container-fluid addBlog">
      <div className="container-fluid" style={{ width: "80%" }}>
        <div className="addBlog__form">
          <h3>Add Blog</h3>

          <form onSubmit={handleCreateNewBlog}>
            <h5 className="mt-3"> Image</h5>
            <ImageUploader image={image} setImage={setImage} />
            <p className="text-danger">{error.image}</p>

            <h5 className="mt-3">Category</h5>
            <select
              name="category_id"
              value={blog.category_id || 0}
              onChange={handleOnChange}
              onBlur={handleError}
            >
              <option defaultValue hidden value={0}>
                Choose Category
              </option>
              {categoriesList.length === 0 ? (
                <></>
              ) : (
                categoriesList.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  );
                })
              )}
            </select>
            <p className="text-danger">
              {error.category_id}
            </p>

            <h5 className="mt-3"> Title</h5>
            <textarea
              cols="60"
              rows="3"
              name="title"
              value={blog.title}
              onChange={handleOnChange}
              onBlur={handleError}
              onKeyUp={handleError}
            ></textarea>
            <p className="text-danger">{error.title}</p>
            <h5 className="mt-3">Content</h5>
            <EditorComponent html={html} setHtml={setHtml} />
            <p className="text-danger">{error.content}</p>
            <button
              className="btn btn-primary mt-3"
              type="submit"
              disabled={
                isUpdate ||
                blog.title === "" ||
                blog.category_id === 0 ||
                html === "<p><br></p>" ||
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
