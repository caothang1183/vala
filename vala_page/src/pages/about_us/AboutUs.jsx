import "./AboutUs.scss";
import PageDescription from "../../components/PageDescription";
import AboutVideo from "./components/AboutVideo";
import AboutDescription from "./components/AboutDescription";
import AboutImages from "./components/AboutImages";
import ClientsLogo from "../../components/ClientsLogo";
import OurTeam from "./components/OurTeam";
import { Fragment } from "react";
import Footer from "../../components/Footer";
import MetaTags from 'react-meta-tags';
const AboutUs = () => (
  <Fragment>
    <div className="AboutUs">
    <MetaTags>
            <title>About Us | KAGENCY</title>
            <meta name="description" content="KAGENCY tự hào được lựa chọn bởi các đối tác như: Samsung, Gigabyte, DEE
        Net, Vala… ." />
            <meta property="og:title" content="About Us | KAGENCY" />
            <meta property="og:image" content="path/to/image.jpg" />
          </MetaTags>
      <div className="container">
        <PageDescription
          title="About Us"
          titleContent="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
          content="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web"
        />
        <AboutVideo />
        <AboutDescription />
        <AboutImages />
      </div>
      <OurTeam />
      <ClientsLogo />
      <Footer />
    </div>
  </Fragment>
);

export default AboutUs;
