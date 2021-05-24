import "./PageDescription.scss";

const PageDescription = ({ title, titleContent, content }) => {
  return (
    <div className="PageDescription">
      <div className="container">
        <div className="row">
          <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
            <div className="title">
              <h1>{title}</h1>
            </div>
          </div>
          <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 content">
            <h3>{titleContent}</h3>
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageDescription;
