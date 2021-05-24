import "./PageImageDescription.scss";
import Skeleton from "@material-ui/lab/Skeleton";

const PageImageDescription = ({
  url,
  titleHeader,
  titleContent,
  content = "",
  loading,
}) => {
  const backgroundBanner = {
    backgroundImage: `linear-gradient(90deg, rgba(8,94,114, 0.6), rgba(8,94,114, 0.8)), 
    url('${url}')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <div>
      {loading ? (
        <div className="PageImageDescription" style={backgroundBanner}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                <div className="title">
                  <h1>
                    <Skeleton variant="text" className="sktontitle" />
                  </h1>
                </div>
              </div>
              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 content">
                <h3>
                  <Skeleton variant="text" className="sktontitle" />
                </h3>
                <p>
                  <Skeleton variant="rect" className="sktontitle" />
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="PageImageDescription" style={backgroundBanner}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                <div className="title">
                  <h1>{titleHeader}</h1>
                </div>
              </div>
              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 content">
                <h3>{titleContent}</h3>
                <p>{content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageImageDescription;
