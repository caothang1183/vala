import React from "react";
import { Link } from "react-router-dom";
import "./BlogItem.scss";
import Skeleton from "@material-ui/lab/Skeleton";

const BlogItem = ({ blog, isMain = false, loading }) => {
  // console.log(blog);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (blog === null) {
    return (
      <div>
        {/* <Alert style={{ marginTop: "10px" }} severity="error">
          Failed request from server
        </Alert> */}
      </div>
    );
  } else {
    return (
      <div
        style={{ cursor: "pointer" }}
        className={isMain ? "BlogItem active" : "BlogItem"}
      >
        {loading ? (
          <Skeleton variant="rect" className="sketonresponsive" />
        ) : (
          <Link
            to={`/blog/${loading ? "Loading.." : blog.id}`}
            onClick={scrollToTop}
          >
            <img
              src={loading ? "Loading.." : blog.url}
              alt={loading ? "Loading.." : blog.title}
            />
            <div className="blog-category">
              Category{" "}
              {loading ? <Skeleton variant="text" /> : blog.category_id}
            </div>
            <h3>{loading ? <Skeleton variant="text" /> : blog.title}</h3>
          </Link>
        )}
      </div>
    );
  }
};

export default BlogItem;
