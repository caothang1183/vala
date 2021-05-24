import axios from "axios";
import { Fragment, useEffect, useReducer } from "react";
import { FaRegCalendarAlt, FaUserCircle } from "react-icons/fa";
import MetaTags from "react-meta-tags";
import { useParams } from "react-router";
import inlGrey from "../../assets/images/icons/inl_grey.svg";
import insGrey from "../../assets/images/icons/ins_grey.svg";
import pinGrey from "../../assets/images/icons/pin_grey.svg";
import ytGrey from "../../assets/images/icons/yt_grey.svg";
import ClientsLogo from "../../components/ClientsLogo";
import Footer from "../../components/Footer";
import "./BlogDetailPage.scss";
import MoreBlog from "./components/MoreBlog";
import Skeleton from "@material-ui/lab/Skeleton";

const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: true,
        blogsdetail: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        error: "error",
        loading: true,
        blogsdetail: {},
      };
    default:
      return state;
  }
};

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blogDetail, dispatch] = useReducer(reducer, {
    loading: false,
    blogsdetail: {},
    error: "",
  });
  const load = blogDetail.loading;

  useEffect(() => {
    let isSubscribed = true;
    axios.get(`https://vala-web.herokuapp.com/api/blogs/${id}`).then(
      (res) => {
        console.log(res.data);
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
  }, [id]);

  const BlogHeader = () => {
    const backgroundBanner = {
      backgroundImage: `linear-gradient(0deg, rgba(8,94,114, 0.4), rgba(8,94,114, 0.4)), 
        url('${
          blogDetail.error === "error"
            ? "https://via.placeholder.com/1200x600.png?text=Kagency "
            : "" && load
            ? "https://via.placeholder.com/1200x600.png?text=Kagency"
            : blogDetail.blogsdetail.url
        }')`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
    };
    var date = new Date(blogDetail.blogsdetail.created_at);
    var date_create =
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
      "/" +
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "/" +
      date.getFullYear();
    return (
      <div className="BlogDetailHeader" style={backgroundBanner}>
        <div className="container">
          <MetaTags>
            <title>
              {blogDetail.error === "error"
                ? "Sever is Not Available "
                : "" && load
                ? "Loading"
                : blogDetail.blogsdetail.title}
              | VALA
            </title>
            <meta
              name="description"
              content="Kagency tự hào được lựa chọn bởi các đối tác như: Samsung, Gigabyte, DEE
        Net, Vala… ."
            />
            <meta
              property="og:title"
              content={
                blogDetail.error === "error"
                  ? "No data "
                  : "" && load
                  ? "Loading"
                  : blogDetail.blogsdetail.title
              }
            />
            <meta
              property="og:image"
              content={load ? "" : blogDetail.blogsdetail.url}
            />
          </MetaTags>
          <div className="row">
            <div className="col-12">
              <div className="title">
                <h1>
                  {blogDetail.error === "error" ? (
                    <Skeleton animation="wave" width={"70%"} />
                  ) : "" && load ? (
                    <Skeleton animation="wave" variants="h1" width={"70%"} />
                  ) : (
                    blogDetail.blogsdetail.title
                  )}
                </h1>
              </div>
              <ul>
                <li>
                  <FaUserCircle /> by{" "}
                  {blogDetail.error === "error" ? (
                    <Skeleton animation="wave" variants="h1" />
                  ) : "" && load ? (
                    <Skeleton animation="wave" variants="text" />
                  ) : (
                    blogDetail.blogsdetail.created_by
                  )}
                </li>
                <li>
                  <FaRegCalendarAlt /> at{" "}
                  {blogDetail.error === "error" ? (
                    <Skeleton animation="wave" variants="h1" />
                  ) : "" && load ? (
                    <Skeleton animation="wave" variants="h1" />
                  ) : (
                    date_create
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const createMarkup = () => {
    return {
      __html: `${!load ? "" : blogDetail.blogsdetail.content}`,
    };
  };
  return (
    <Fragment>
      <div className="BlogDetailPage ql-editor">
        <BlogHeader />
        <div className="container">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={createMarkup()}
          ></div>
          <div className="icon-link">
            <img src={ytGrey} alt="" />
            <img src={pinGrey} alt="" />
            <img src={inlGrey} alt="" />
            <img src={insGrey} alt="" />
          </div>
        </div>
        <MoreBlog category={blogDetail.blogsdetail} />
        <ClientsLogo />
        <Footer />
      </div>
    </Fragment>
  );
};

export default BlogDetailPage;
