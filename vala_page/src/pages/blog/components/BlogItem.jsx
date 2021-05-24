import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./BlogItem.scss";
import Skeleton from "@material-ui/lab/Skeleton";

const BlogItem = ({ blog, isMain = false, loading, category }) => {

  const [categoryName, setCategoryName] = useState("")

  useEffect(() => {
    // console.log(category)
    const index = category && category.findIndex(item => {
      return item.id === blog.category_id
    })
    if(index!==-1){
      setCategoryName(category[index].name)
    }

    
  }, [blog, category])
  
   
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
    // console.log(blog)
    return (
      <div
        style={{ cursor: "pointer" }}
        className={isMain ? "BlogItem active" : "BlogItem"}
      >
        {loading ? (
          <Skeleton variant="rect" className="sketonresponsive" />
        ) : (
          <Link to={`/blog/${blog.id}`} onClick={scrollToTop}>
            <img
              src={loading ? "Loading.." : blog.url}
              alt={loading ? "Loading.." : blog.title}
            />
            <div className="blog-category">
              Category{" "}
              {loading ? <Skeleton variant="text" /> : categoryName}
            </div>
            <h3>{loading ? <Skeleton variant="text" /> : blog.title}</h3>
          </Link>
        )}
      </div>
    );
  }
};

export default BlogItem;