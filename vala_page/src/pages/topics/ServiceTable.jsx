import "./ServiceTable.scss";
// import axios from "axios";
// import React, { useReducer, useEffect } from "react";
// const reducer = (category, action) => {
//   switch (action.type) {
//     case "FETCH_SUCCESS":
//       return {
//         categorydata: action.payload,
//         error: "",
//         loading: true,
//       };
//     case "FETCH_ERROR":
//       return {
//         categorydata: [],
//         error: "",
//         loading: true,
//       };
//     default:
//       return category;
//   }
// };
const ServiceItem = ({ image, title, description, url }) => {
  // const [category, dispatch] = useReducer(reducer, {
  //   categorydata: [],
  //   error: "",
  //   loading: false,
  // });

  // useEffect(() => {
  //   let isSubsribed = true;
  //   axios.get("https://kagency-api.herokuapp.com/api/topics/").then(
  //     (res) => {
  //       if (isSubsribed) {
  //         dispatch({ type: "FETCH_SUCCESS", payload: res.data });
  //       }
  //     },
  //     (error) => {
  //       dispatch({ type: "FETCH_ERROR" });
  //     }
  //   );
  //   return () => {
  //     isSubsribed = false;
  //   };
  // }, []);
  // console.log(category.categorydata);
  // var cate = category.categorydata;
  return (
    <div className="col-12 col-xs-12 col-sm-12col-md-4 col-lg-4 col-xl-4">
      <div className="service-item">
        <img src={image} alt="" />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const ServiceTable = () => (
  <div className="ServiceTable">
    <div className="row">
      <ServiceItem
        image="./assets/images/icons/inl_grey.svg"
        title="Strategy"
        url="/strategy"
        description="All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
      />
      <ServiceItem
        image="./assets/images/icons/tik_grey.svg"
        title="Branding"
        url="/branding"
        description="All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
      />
      <ServiceItem
        image="./assets/images/icons/tum_grey.svg"
        title="Digital Marketing"
        url="digital-maketing"
        description="All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
      />
      <ServiceItem
        image="./assets/images/icons/ins_grey.svg"
        title="Web/App"
        url="web-app"
        description="All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
      />
      <ServiceItem
        image="./assets/images/icons/fb_grey.svg"
        title="Booking"
        url="booking"
        description="All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
      />
      <ServiceItem
        image="./assets/images/icons/yt_grey.svg"
        title="Become Influencer"
        url="become-a-influencer"
        description="All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
      />
    </div>
  </div>
);

export default ServiceTable;
