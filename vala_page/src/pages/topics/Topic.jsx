import React, { Fragment, useEffect, useReducer } from "react";
import MetaTags from "react-meta-tags";
import ClientsLogo from "../../components/ClientsLogo";
import Footer from "../../components/Footer";
import PageDescription from "../../components/PageDescription";
import "./Topic.scss";
import TopicList from "./TopicList";
import ServiceTable from "./ServiceTable";
import axios from "axios";
import { useLocation } from "react-router-dom";
const reducer = (stateBranding, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        brandingdata: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        brandingdata: false,
        blogs: [],
        error: "Error load data",
      };
    default:
      return stateBranding;
  }
};

const Topic = () => {
  const location = useLocation();
  const { fromNotifications } = location.state;
  // console.log(fromNotifications);
  const [branding, dispatch] = useReducer(reducer, {
    loading: true,
    data: [],
    error: "Error load data",
  });
  useEffect(() => {
    let isSubsribed = true;
    axios
      .get(
        `https://kagency-api.herokuapp.com/api/topics/${fromNotifications.id}`
      )
      .then(
        (res) => {
          if (isSubsribed) {
            dispatch({ type: "FETCH_SUCCESS", payload: res.data });
          }
        },
        (error) => {
          dispatch({ type: "FETCH_ERROR" });
        }
      );
    return () => {
      isSubsribed = false;
    };
  }, [fromNotifications.id]);
  const data = branding.brandingdata;
  return (
    <Fragment>
      <div className="Branding">
        <div className="container">
          <MetaTags>
            <title>{fromNotifications.name}| KAGENCY</title>
            <meta
              name="description"
              content="Kagency tự hào được lựa chọn bởi các đối tác như: Samsung, Gigabyte, DEE
        Net, Vala… ."
            />
            <meta property="og:title" content="Branding| KAGENCY" />
            <meta property="og:image" content="path/to/image.jpg" />
          </MetaTags>
          <PageDescription
            title={fromNotifications.name}
            content={fromNotifications.description}
          />
          <TopicList brandingList={data} />
          <ServiceTable />
        </div>
        <ClientsLogo />
        <Footer />
      </div>
    </Fragment>
  );
};

export default Topic;
