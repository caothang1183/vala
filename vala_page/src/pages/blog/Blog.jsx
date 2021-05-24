import React from "react";
import PageImageDescription from "../../components/PageImageDescription";
import Footer from "../../components/Footer";
import ClientsLogo from "../../components/ClientsLogo";
import BlogItem from "./components/BlogItem";
import { Fragment, useEffect, useState } from "react";
import InfoButton from "../../components/InfoButton";
import "./Blog.scss";
import MetaTags from "react-meta-tags";
import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";

export default function BlogList() {
  const [blogList, setBlogList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
 

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://vala-web.herokuapp.com/api/cate")
      .then((result) => {
        if (result.status === 200) {
          setCategoryList(result.data);
          setIsLoading(false);
        } else {
          return Promise.reject({
            response: {
              data: result.data,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });

    axios
      .get("https://vala-web.herokuapp.com/api/blogs")
      .then((result) => {
        if (result.status === 200) {
          // console.log(result.data)
          setBlogList(result.data);
          setIsLoading(false);
        } else {
          return Promise.reject({
            response: {
              data: result.data,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const renderCategoryList = () => {
    if (categoryList.length > 0) {
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
            {categoryList === ""
              ? "Loading"
              : categoryList.slice(0, 3).map((item) => (
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
    }
  };

  function renderBlogList() {
    if (activeTab === 0) {
        return blogList.map((item, i) => {
            return (
              <div
                className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4"
                key={i}
              >
                <BlogItem blog={item} key={i}  category={categoryList}
                      activeTab={activeTab}/>
              </div>
            );
          })
    }
    else {
        let list = blogList.filter(item => {
            return Number(item.category_id) === activeTab
        })

        return list && list.map((item, i) => {
            return (
              <div
                className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4"
                key={i}
              >
                <BlogItem blog={item} key={i}  category={categoryList}
                      activeTab={activeTab}/>
              </div>
            );
          })
    }
  }

  function renderBlogContent() {
    if (!isLoading && categoryList.length > 0 && blogList.length > 0) {
      return (
        <Fragment>
          <div className="Blog">
            <MetaTags>
              <title>Blog| VALA</title>
              <meta
                name="description"
                content="Kagency tự hào được lựa chọn bởi các đối tác như: Samsung, Gigabyte, DEE
        Net, Vala… ."
              />
              <meta property="og:title" content="About Us | VALA" />
              <meta property="og:image" content="path/to/image.jpg" />
            </MetaTags>
            <PageImageDescription
              url={"https://wallpaperaccess.com/full/656665.jpg"}
              titleHeader="blog"
              titleContent="News, insights, and creative BLOG culture from VALA."
            />
            <div className="container">
              <div className="blog-content">
                <div className="row">
                  <div className="col-12 col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                    {renderCategoryList()}

                    <BlogItem
                      blog={
                        isLoading ? (
                          <Skeleton variant="rect" width={210} height={118} />
                        ) : (
                          blogList[0]
                        )
                      }
                      isMain={true}
                      category={categoryList}
                      loadmain={isLoading}
                    />
                  </div>
                  <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <BlogItem
                      category={categoryList}
                      activeTab={activeTab}
                      blog={
                        isLoading ? (
                          <Skeleton variant="rect" width={210} height={118} />
                        ) : (
                          blogList[1]
                        )
                      }
                    />
                    <BlogItem
                      category={categoryList}
                      blog={
                        isLoading ? (
                          <Skeleton variant="rect" width={210} height={118} />
                        ) : (
                          blogList[2]
                        )
                      }
                    />
                  </div>
                </div>
                <div className="row">

                    {renderBlogList()}
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
    } else {
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
                    {renderCategoryList()}
                    <BlogItem
                      blog={""}
                      loading={true}
                      category={categoryList}
                    />
                  </div>
                  <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <BlogItem
                      blog={""}
                      loading={true}
                      category={categoryList}
                    />
                  </div>
                  <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <BlogItem
                      blog={""}
                      loading={true}
                      category={categoryList}
                    />
                  </div>
                  <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <BlogItem
                      blog={""}
                      loading={true}
                      category={categoryList}
                    />
                  </div>
                  <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <BlogItem
                      blog={""}
                      loading={true}
                      category={categoryList}
                    />
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
    }
  }
  return <>{renderBlogContent()}</>;
}
