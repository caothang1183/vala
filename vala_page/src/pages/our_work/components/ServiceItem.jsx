import Aos from "aos";
import "aos/dist/aos.css";
import "./ServiceItem.scss";
import Skeleton from "@material-ui/lab/Skeleton";

Aos.init({ duration: 800, once: true });
const ServiceItem = ({
  url,
  serviceTitle,
  serviceContent,
  reverse = false,
  loading = false,
}) => (
  <div className="ServiceItem">
    <div
      className={reverse ? "row service-item reverse-col" : "row service-item"}
    >
      <div className="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        {loading ? (
          <Skeleton
            variant="rect"
            animation="wave"
            className="sketonresponsive"
          />
        ) : (
          <img className="service-image" src={url} alt="" />
        )}
      </div>
      <div className="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div className="service-content">
          <h1>{loading ? <Skeleton animation="wave" /> : serviceTitle}</h1>
          <p data-aos="fade-up">
            {loading ? (
              <Skeleton
                variant="rect"
                animation="wave"
                className="sketonresponsive"
              />
            ) : (
              serviceContent
            )}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ServiceItem;
