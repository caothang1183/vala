import React, { Fragment, useEffect, useReducer } from "react";
import PageDescription from "../../components/PageDescription";
import ServiceItem from "./components/ServiceItem";
import ClientsLogo from "../../components/ClientsLogo";
import "./OurWork.scss";
import Footer from "../../components/Footer";
import MetaTags from "react-meta-tags";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: true,
        ourwork: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        loading: true,
        ourwork: [],
        error: "error",
      };
    default:
      return state;
  }
};
const OurWork = () => {
  const [ourWork, dispatch] = useReducer(reducer, {
    loading: false,
    ourwork: [],
    error: "",
  });
  useEffect(() => {
    let isSubscribed = true;
    axios.get("https://kagency-api.herokuapp.com/api/topics/").then(
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
  }, []);
  var dataourWork = ourWork.ourwork;
  if (!ourWork.loading) {
    return (
      <div className="OurWork">
        <div className="container">
       
          <PageDescription
            title="Our Services"
            titleContent="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"
            content="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
          />
          <ServiceItem reverse={true} loading={true} />
          <ServiceItem loading={true} />
          <ServiceItem reverse={true} loading={true} />
          <ServiceItem loading={true} />
        </div>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="OurWork">
        <div className="container">
          <MetaTags>
            <title>Our Work | KAGENCY</title>
            <meta
              name="description"
              content="Kagency tự hào được lựa chọn bởi các đối tác như: Samsung, Gigabyte, DEE
        Net, Vala… ."
            />
            <meta property="og:title" content="Our Work  | KaGenCy" />
            <meta property="og:image" content="path/to/image.jpg" />
          </MetaTags>
          <PageDescription
            title="Our Services"
            titleContent="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"
            content="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
          />

          {dataourWork.map((item, index) => {
            if ((index + 1) % 2 === 0) {
              return (
                <ServiceItem
                  url={item.url}
                  key={item.id}
                  serviceTitle={item.name}
                  serviceContent={item.description}
                  reverse={true}
                />
              );
            } else {
              return (
                <ServiceItem
                  url={item.url}
                  key={item.id}
                  serviceTitle={item.name}
                  serviceContent={item.description}
                />
              );
            }
          })}
        </div>
        <ClientsLogo />
        <Footer />
      </div>
    </Fragment>
  );
};

export default OurWork;
