import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";
import React, { Fragment, useEffect, useReducer, useState } from "react";
import ClientsLogo from "../../components/ClientsLogo";
import Footer from "../../components/Footer";
import PageDescription from "../../components/PageDescription";
import ProjectsComponent from "../../components/projects_components/ProjectsComponent";
import "./Projects.scss";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        category: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        error: "",
        loading: false,
        category: [],
      };
    default:
      return state;
  }
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [stateCategory, setCateGory] = useReducer(reducer, {
    error: "",
    loading: true,
    category: [],
  });

  useEffect(() => {
    axios.get(`https://kagency-api.herokuapp.com/api/topics/`).then(
      (res) => {
        setCateGory({ type: "FETCH_SUCCESS", payload: res.data });
      },
      (error) => {
        setCateGory({ type: "FETCH_ERROR" });
      }
    );
  }, []);
  // console.log(stateCategory.loading);

  const HeaderComponent = () => (
    <div className="projects-header">
      <ul>
        <li
          onClick={() => setActiveTab(0)}
          className={activeTab === 0 ? "active" : ""}
        >
          All
        </li>
        {stateCategory.loading ? (
          <Skeleton variant="text" />
        ) : (
          stateCategory.category.map((item) => (
            <li
              className={activeTab === item.id ? "active" : ""}
              onClick={() => setActiveTab(item.id)}
              key={item.id}
            >
              {item.name}
            </li>
          ))
        )}

        <li>
          <i className="fa fa-plus fa-lg" aria-hidden="true"></i>
        </li>
      </ul>
    </div>
  );
  return (
    <Fragment>
      <div className="Projects">
        <PageDescription
          title="Projects"
          titleContent="Kagency tự hào được lựa chọn bởi các đối tác như: Samsung, Gigabyte, DEE Net, Vala… Sự tận tâm của Kagency được minh chứng qua sự hiệu quả và đảm bảo mọi nhu cầu của khách hàng đều được hoàn thành một cách trọn vẹn nhất."
          content="Với Kagency chúng tôi, khách hàng như một đối tác, chính vì vậy sự phối hợp giữa Kagency và khách hàng là sự kết nối chặt chẽ khiến suốt quá trình đồng hành diễn ra một cách thuận lợi. Kết quả đạt được về sự tăng trưởng doanh thu, danh tiếng thương hiệu của đối tác được đẩy mạnh hơn mong đợi. Đó là lý do vì sao Kagency ngày càng được nhiều khách hàng lựa chọn như là một đối tác chiến lược."
        />

        <div className="project-list">
          <ProjectsComponent
            activeTab={activeTab}
            headerComponent={<HeaderComponent />}
          />
        </div>
        <ClientsLogo />
        <Footer />
      </div>
    </Fragment>
  );
};
export default Projects;
