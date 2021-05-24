import Carousel from "react-multi-carousel";
import "./ProjectSlider.scss";
import ProjectItem from "../../../components/projects_components/ProjectItem";
import "react-multi-carousel/lib/styles.css";

const ProjectSlider = ({ projects }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="ProjectSlider">
      <h3>Related Projects</h3>
      <Carousel ssr partialVisbile responsive={responsive}>
        {projects.map((item, index) => {
          return (
            <div className="product-item-slider">
              <ProjectItem
                project={item}
                key={index}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ProjectSlider;
