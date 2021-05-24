import React, { useContext, useEffect, useState } from "react";
import { EditorComponent } from "../../../components/Editor/EditorComponent";
import { ImageUploader } from "../../../components/ImageUploader/ImageUploader";
import * as Action from "../../../common/constants/blogConstant";
import * as ActionCate from "../../../common/constants/categoriesConstant";
import { context } from "../../../provider";
import api from "./../../../api";
import { useHistory, useParams } from "react-router-dom";

export default function EditBlog() {
  let history = useHistory();
  const { id } = useParams();
  const { blogDispatch, blogState, categoriesState, categoriesDispatch } =
    useContext(context);
  const { isUpdate, blogList } = blogState;
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

 

  function setDataBlogEdit(list) {
  
    if (id) {
      let index = list.findIndex((item) => {
        return item.id === id;
      });
      
      if (index !== -1) {
        setBlog(list[index]);
        setImage(`<img src="${list[index].url}"/>`);
        setHtml(list[index].content);
      
      }
    }
  }

  useEffect(() => {
    if (blogList.length === 0) {
      blogDispatch(Action.actGetListBlogRequest());
      api
        .get("/blogs")
        .then((res) => {
          blogDispatch(Action.actGetListBlogSuccess(res.data));
          setDataBlogEdit(res.data)
        })
        .catch((err) => {
          blogDispatch(Action.actGetListBlogFailed());
          console.log(err);
        });
    } else {
      setDataBlogEdit(blogList)
    }

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



  const handleError = (event) => {
    let { name, value } = event.target;
    let mess = "";
    switch (name) {
      case "category_id":
        mess = value === "0" ? "*Choose a category":""
        break;
      case "title":
        mess = value === '' ? "*Fill in the title" : ""
        break;
      default:
        break;
    }
    setError({
      ...error,
      [name]: mess,
    });
  };


  const handleOnChange = (event) => {
    let { name, value } = event.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  const handleUpdateBlog = (event) => {
    event.preventDefault();

 
      let linkImage = image.split(`"`);
      let url = linkImage[1].split(`"`)[0];
 
    blogDispatch(Action.actUpdateBlogRequest());
    api
      .post(`/blogs/${id}`, {
        category_id: blog.category_id,
        title: blog.title,
        content: html,
        url,
      })
      .then((res) => {
        blogDispatch(Action.actUpdateBlogSuccess(res.data));
        history.push("/list-blogs");
      })
      .catch((err) => {
        blogDispatch(Action.actUpdateBlogFailed());
        console.log(err);
      });
  };

  return (
    <div className="container-fluid addBlog">
      <div className="container-fluid" style={{ width: "80%" }}>
        <div className="addBlog__form">
          <h3>Edit Blog</h3>

          <form onSubmit={handleUpdateBlog}>
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
            <h5 className="mt-3">Content</h5>
            <EditorComponent html={html} setHtml={setHtml} />
            <p className="text-danger">{error.content}</p>

            <button
              className="btn btn-primary mt-3"
              type="submit"
              disabled={isUpdate ||
                blog.title === "" ||
                blog.category_id === 0 ||
                html === "<p><br></p>" ||
                !image ||
                (image && image.search(`"`) === -1)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
