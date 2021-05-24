import Aos from "aos";
import "aos/dist/aos.css";
import React, { Fragment, useEffect } from "react";
import MetaTags from "react-meta-tags";
import ClientsLogo from "../../components/ClientsLogo";
import Footer from "../../components/Footer";
import ProjectsComponent from "../../components/projects_components/ProjectsComponent";
import Banner from "./components/Banner";
import Info from "./components/Info";
import NewProjectButton from "./components/NewProjectButton";
import News from "./components/news_components/News";
import "./Home.scss";
import $ from "jquery";
function Home() {
  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      let scroll_pos = window.scrollY + $(window).height();
      const beginAnimationPosition = $("#beginAnimationId").offset().top;
      // console.log(beginAnimationPosition);
      const endAnimationPosition = $("#endAnimationId").offset().top;
      if (
        scroll_pos > beginAnimationPosition &&
        scroll_pos < endAnimationPosition
      ) {
        $(".Home").addClass("change-background");
        $(".InfoButton").addClass("dark");
        $(".InfoButton-padding").addClass("dark");
        $(".darkHeading").addClass("darkText");
      } else {
        $(".Home").removeClass("change-background");
        $(".InfoButton").removeClass("dark");
        $(".InfoButton-padding").removeClass("dark");
        $(".darkHeading").removeClass("darkText");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const HeaderComponent = () => (
    <div className="projects-header" id="beginAnimationId">
      <MetaTags>
        <title>Trang chủ | KAGENCY</title>
        <meta
          name="description"
          content="Kagency tự hào được lựa chọn bởi các đối tác như: Samsung, Gigabyte, DEE
        Net, Vala… ."
        />
        <meta property="og:title" content="Trang chủ | KaGenCy" />
        <meta property="og:image" content="path/to/image.jpg" />
      </MetaTags>
      <h3 data-aos="fade-up" className="introduction">
        Kagency tự hào được lựa chọn bởi các đối tác như: Samsung, Gigabyte, DEE
        Net, Vala… Sự tận tâm của Kagency được minh chứng qua sự hiệu quả và đảm
        bảo mọi nhu cầu của khách hàng đều được hoàn thành một cách trọn vẹn
        nhất.
      </h3>
      <p data-aos="fade-up" className="introduction">
        Với Kagency chúng tôi, khách hàng như một đối tác, chính vì vậy sự phối
        hợp giữa Kagency và khách hàng là sự kết nối chặt chẽ khiến suốt quá
        trình đồng hành diễn ra một cách thuận lợi. Kết quả đạt được về sự tăng
        trưởng doanh thu, danh tiếng thương hiệu của đối tác được đẩy mạnh hơn
        mong đợi. Đó là lý do vì sao Kagency ngày càng được nhiều khách hàng lựa
        chọn như là một đối tác chiến lược.
      </p>
    </div>
  );
  return (
    <Fragment>
      <div className="Home">
        <Banner />
        <Info />
        <div
          className="projects-component"
          onScroll={() => alert("Table Scrolled")}
        >
          <ProjectsComponent
            headerComponent={<HeaderComponent />}
            isHomeComponent={true}
          />
        </div>
        <ClientsLogo />
        <News />
        <Footer />
      </div>
      <NewProjectButton />
    </Fragment>
  );
}

export default Home;
