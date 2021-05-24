import React, { useEffect, useReducer, useState } from "react";
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

    case "FETCH_REQUEST":
      return {
        error: "",
        blogmore: [],
        loading: true,
      };
    default:
      return state;
  }
};
function MoreBlog({ category }) {
  const [stateBlogMore, dispatch] = useReducer(reducer, {
    error: "",
    loading: false,
    blogmore: [],
  });
  const [moreBlogList, setMoreBlogList] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    dispatch({ type: "FETCH_REQUEST" });
    axios.get("https://vala-web.herokuapp.com/api/blogs").then(
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

  useEffect(() => {
    let listByCate =
      stateBlogMore.blogmore &&
      stateBlogMore.blogmore.filter((item) => {
        return item.category_id === category.category_id;
      });

    let moreBlogList = listByCate.filter((item) => {
      return item.id !== category.id;
    });
    setMoreBlogList(moreBlogList);
  }, [category, stateBlogMore]);

  function renderMoreBlogList(){
    
    return moreBlogList.map((item) => (
      <div
        className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 more-blog-item"
        key={item.id}
      >
        <BlogItem blog={stateBlogMore.loading ? "" : item} category={[]} />
      </div>
    ));
  }
  function renderMoreBlog() {
    if (stateBlogMore.loading) {
 
      return <div></div>;
    } else {
      
      return (
        <div className="MoreBlog">
          <div className="container">
            <h3 className="read-more">Read more posts</h3>
            <div className="row">
              {renderMoreBlogList()}
              <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 more-blog-item">
                <Link to="/blog">
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
    }
  }
  return <>{renderMoreBlog()}</>;
}

export default MoreBlog;
