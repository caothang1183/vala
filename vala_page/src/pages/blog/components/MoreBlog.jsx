import React, { useEffect, useReducer } from "react";
import "./MoreBlog.scss";
import BlogItem from "./BlogItem";
import { FaTh } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        blogmore: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        error: "error is loading",
        loading: false,
        blogmore: [],
      };
    default:
      return state;
  }
};
const MoreBlog = ({ category }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const data = [];
  const [stateBlogMore, dispatch] = useReducer(reducer, {
    error: "",
    loading: true,
    blogmore: [],
  });
  useEffect(() => {
    let isSubscribed = true;
    axios.get("https://kagency-api.herokuapp.com/api/blogs").then(
      (res) => {
        if (isSubscribed) {
          dispatch({ type: "FETCH_SUCCESS", payload: res.data });
        }
      },
      (error) => {
        console.log(error);
        dispatch({ type: "FETCH_ERROR" });
      }
    );
    return () => {
      isSubscribed = false;
    };
  }, []);
  stateBlogMore.blogmore.forEach((blog) => {
    // console.log(blog);
    if (blog.category === category) {
      data.push(blog);
    }
  });
  // console.log(BlogData);
  // console.log(category);

  // console.log(stateBlogMore.blogmore[0]);

  return (
    <div className="MoreBlog">
      <div className="container">
        <h3 className="read-more">Read more posts</h3>
        <div className="row">
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 more-blog-item">
            <BlogItem
              blog={stateBlogMore.loading ? "" : stateBlogMore.blogmore[3]}
            />
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 more-blog-item">
            <BlogItem
              blog={stateBlogMore.loading ? "" : stateBlogMore.blogmore[65]}
              onClick={scrollToTop}
            />
          </div>
          <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 more-blog-item">
            <Link to="/blog" onClick={scrollToTop}>
              <div className="btn-all-post">
                <FaTh size={70} />
                <p>All Post</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreBlog;
