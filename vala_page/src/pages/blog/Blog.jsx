import PageImageDescription from "../../components/PageImageDescription";
import Footer from "../../components/Footer";
import ClientsLogo from "../../components/ClientsLogo";
import BlogItem from "./components/BlogItem";
import { Fragment, useReducer, useEffect, useState } from "react";
import InfoButton from "../../components/InfoButton";
import "./Blog.scss";
import MetaTags from "react-meta-tags";
import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";

const reducer = (stateBlog, action) => {
  console.log(stateBlog);
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: true,
        blogs: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        loading: true,
        blogs: [],
        error: "error",
      };
    default:
      return stateBlog;
  }
};

const Blog = () => {
  // console.log(category);
  const [stateBlog, dispatch] = useReducer(reducer, {
    loading: false,
    blogs: [],
    error: "",
  });
  const [categoryBlogst, setcategoryBlogst] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    let isSubscribed = true;
    axios.get("https://kagency-api.herokuapp.com/api/blogs").then(
      (res) => {
        if (isSubscribed) {
          // console.log(res.data);
          dispatch({ type: "FETCH_SUCCESS", payload: res.data });
        }
      },
      (error) => {
        console.log(error.messages);
        dispatch({ type: "FETCH_ERROR" });
      }
    );
    return () => (isSubscribed = false);
  }, []);
  // console.log(stateBlog);

  const CategoryBlog = () => {
    useEffect(() => {
      let isSubscribed = true;

      axios.get("https://kagency-api.herokuapp.com/api/cate").then(
        (res) => {
          if (isSubscribed) {
            setcategoryBlogst(res.data);
          }
        },
        (error) => {
          // console.log(error);
        }
      );
      return () => (isSubscribed = false);
    }, []);
    return (
      <div className="col-12 categories">
        <ul>
          <li style={{ cursor: "pointer" }}>
            <div
              onClick={() => setActiveTab(0)}
              key={0}
              className={
                activeTab === 0 ? "category-item active" : "category-item"
              }
            >
              All{" "}
            </div>
          </li>
          {categoryBlogst === ""
            ? "Loading"
            : categoryBlogst.slice(0, 3).map((item) => (
                <li key={item.id} style={{ cursor: "pointer" }}>
                  <div
                    className={
                      activeTab === item.id
                        ? "category-item active"
                        : "category-item"
                    }
                    onClick={() => setActiveTab(item.id)}
                  >
                    {item.name}
                  </div>
                </li>
              ))}
        </ul>
      </div>
    );
  };

  var loadblog = stateBlog.loading;
  var filter = Object.values(stateBlog.blogs).filter(
    (item) => item.category_id === activeTab
  );
  // console.log(filter);

  if (!loadblog || stateBlog.blogs.length === 0) {
    return (
      <Fragment>
        <div className="Blog">
          <PageImageDescription
            url={"https://wallpaperaccess.com/full/656665.jpg"}
            titleHeader="blog"
            titleContent="News, insights, and creative BLOG culture from KAGENCY."
            loading={true}
          />
          <div className="container">
            <div className="blog-content">
              <div className="row">
                <div className="col-12 col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                  <CategoryBlog />
                  <BlogItem blog={""} loading={true} />
                </div>
                <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <BlogItem blog={""} loading={true} />
                </div>
                <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <BlogItem blog={""} loading={true} />
                </div>
                <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <BlogItem blog={""} loading={true} />
                </div>
                <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <BlogItem blog={""} loading={true} />
                </div>
                {/* <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <BlogItem blog={""} loading={true} />
                </div>
                <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <BlogItem blog={""} loading={true} />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className="Blog">
          <MetaTags>
            <title>Blog| KAGENCY</title>
            <meta
              name="description"
              content="Kagency tự hào được lựa chọn bởi các đối tác như: Samsung, Gigabyte, DEE
        Net, Vala… ."
            />
            <meta property="og:title" content="About Us | KAGENCY" />
            <meta property="og:image" content="path/to/image.jpg" />
          </MetaTags>
          <PageImageDescription
            url={"https://wallpaperaccess.com/full/656665.jpg"}
            titleHeader="blog"
            titleContent="News, insights, and creative BLOG culture from KAGENCY."
          />
          <div className="container">
            <div className="blog-content">
              <div className="row">
                <div className="col-12 col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                  <CategoryBlog />

                  <BlogItem
                    blog={
                      stateBlog.loading ? (
                        <Skeleton variant="rect" width={210} height={118} />
                      ) : (
                        stateBlog.blogs[0]
                      )
                    }
                    isMain={true}
                    category={categoryBlogst}
                    loadmain={stateBlog.loading}
                  />
                </div>
                <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <BlogItem
                    activeTab={activeTab}
                    blog={
                      stateBlog.loading ? (
                        <Skeleton variant="rect" width={210} height={118} />
                      ) : (
                        stateBlog.blogs[1]
                      )
                    }
                  />
                  <BlogItem
                    blog={
                      stateBlog.loading ? (
                        <Skeleton variant="rect" width={210} height={118} />
                      ) : (
                        stateBlog.blogs[2]
                      )
                    }
                  />
                </div>
              </div>
              <div className="row">
                {activeTab === 0
                  ? stateBlog.blogs.map((item, i) => {
                      return (
                        <div
                          className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4"
                          key={i}
                        >
                          <BlogItem blog={item} key={i} />
                        </div>
                      );
                    })
                  : filter.map((item, i) => {
                      return (
                        <div
                          className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4"
                          key={i}
                        >
                          <BlogItem blog={item} key={i} />
                        </div>
                      );
                    })}
              </div>
            </div>
            <div className="more">
              <InfoButton label="load more" />
            </div>
          </div>

          <ClientsLogo />
          <Footer />
        </div>
      </Fragment>
    );
  }
};

export default Blog;
