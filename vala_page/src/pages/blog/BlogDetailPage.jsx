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
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        blogsdetail: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        error: "error",
        loading: false,
        blogsdetail: {},
      };
    default:
      return state;
  }
};

const BlogDetailPage = () => {
  const { id } = useParams();
  const [stateblogdetail, dispatch] = useReducer(reducer, {
    loading: true,
    blogsdetail: {},
    error: "",
  });
  const load = stateblogdetail.loading;

  useEffect(() => {
    let isSubscribed = true;
    axios.get(`https://kagency-api.herokuapp.com/api/blogs/${id}`).then(
      (res) => {
        if (isSubscribed) {
          dispatch({ type: "FETCH_SUCCESS", payload: res.data });
        }
      },
      (error) => {
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
          stateblogdetail.error === "error"
            ? "https://via.placeholder.com/1200x600.png?text=Kagency "
            : "" && load
            ? "https://via.placeholder.com/1200x600.png?text=Kagency"
            : stateblogdetail.blogsdetail.url
        }')`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
    };
    var date = new Date(stateblogdetail.blogsdetail.created_at);
    var date_create =
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
      "/" +
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "/" +
      date.getFullYear();
    // console.log(dt);
    return (
      <div className="BlogDetailHeader" style={backgroundBanner}>
        <div className="container">
          <MetaTags>
            <title>
              {stateblogdetail.error === "error"
                ? "Sever is Not Available "
                : "" && load
                ? "Loading"
                : stateblogdetail.blogsdetail.title}
              | KAGENCY
            </title>
            <meta
              name="description"
              content="Kagency tự hào được lựa chọn bởi các đối tác như: Samsung, Gigabyte, DEE
        Net, Vala… ."
            />
            <meta
              property="og:title"
              content={
                stateblogdetail.error === "error"
                  ? "No data "
                  : "" && load
                  ? "Loading"
                  : stateblogdetail.blogsdetail.title
              }
            />
            <meta
              property="og:image"
              content={load ? "" : stateblogdetail.blogsdetail.url}
            />
          </MetaTags>
          <div className="row">
            <div className="col-12">
              <div className="title">
                <h1>
                  {stateblogdetail.error === "error" ? (
                    <Skeleton animation="wave" width={"70%"} />
                  ) : "" && load ? (
                    <Skeleton animation="wave" variants="h1" width={"70%"} />
                  ) : (
                    stateblogdetail.blogsdetail.title
                  )}
                </h1>
              </div>
              <ul>
                <li>
                  <FaUserCircle /> by{" "}
                  {stateblogdetail.error === "error" ? (
                    <Skeleton animation="wave" variants="h1" />
                  ) : "" && load ? (
                    <Skeleton animation="wave" variants="text" />
                  ) : (
                    stateblogdetail.blogsdetail.created_by
                  )}
                </li>
                <li>
                  <FaRegCalendarAlt /> at{" "}
                  {stateblogdetail.error === "error" ? (
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
      __html: `${
        stateblogdetail.error === "error"
          ? "<p>Bài viết không tồn tại</p>"
          : "" && load
          ? "Loading"
          : stateblogdetail.blogsdetail.content
      }`,
    };
  };
  // console.log(load ? "Loading" : stateblogdetail.blogsdetail.category_id);
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
        <MoreBlog
          category={
            load ? (
              <Skeleton animation="wave" variants="h1" />
            ) : (
              stateblogdetail.blogsdetail
            )
          }
        />
        <ClientsLogo />
        <Footer />
      </div>
    </Fragment>
  );
};

export default BlogDetailPage;
