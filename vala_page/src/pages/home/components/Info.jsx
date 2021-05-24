import InfoButton from "../../../components/InfoButton";
import SubMenu from "../../../components/sub_components/SubMenu";
import "./Info.scss";

const Info = () => (
  <div className="Info container">
    <div className="row">
      <div
        data-aos="fade-up"
        className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 info-bg-1"
      ></div>
      <div
        id="infocompany"
        className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 info"
      >
        <h4 data-aos="fade-up" className="titleintro" data-aos-delay="100">
          Về chúng tôi
        </h4>
        <h3 data-aos="fade-up" data-aos-delay="300">
          Kagency là một trong những công ty con trực thuộc hệ sinh thái của tập
          đoàn Kingdom Việt Nam. Cùng sánh vai với các công ty thuộc hệ thống:
        </h3>
        <p data-aos="fade-up">
          <strong>DEENET</strong>hệ thống phòng net.
        </p>
        <p data-aos="fade-up">
          <strong>One-K</strong> công ty cung cấp phần mềm quản lý phòng máy
        </p>
        <p data-aos="fade-up">
          <strong>K-Menet</strong> nơi tập trung đào tạo, quản lý, phát triển
          Streamer, tuyển thủ Esport, KOLs chuyên nghiệp.
        </p>
        <p data-aos="fade-up">
          <strong>K-Store</strong> công ty cung cấp các sản phẩm về công nghệ
          phòng game.
        </p>
        <p data-aos="fade-up">
          <strong>Kagency</strong> được thành lập khi thấu hiểu nhu cầu của công
          việc truyền thông là đưa đến chiến lược, giải pháp giúp doanh nghiệp
          mang lại giá trị tài chính trong hoạt động và phát triển kinh doanh
          của mình.
        </p>
        <p data-aos="fade-up">
          Mục tiêu phát triển tương lai của Kagency, khi khách hàng nhắc đến
          Kagency sẽ là một công ty cung cấp , giải pháp thực thi một cách toàn
          diện và không giới hạn trong lĩnh vực truyền thông.
        </p>
        <InfoButton data-aos="fade-up" label="View More" link="/about-us" />
      </div>
    </div>
    <div className="padding"></div>
    <div className="row info-rows">
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 info">
        <h4 data-aos="fade-up" className="darkHeading">
          Our Work
        </h4>
        <h3 data-aos="fade-up" className="darkHeading">
          <strong>Kagency</strong> "phù thuỷ" đưa thương hiệu bạn lên tầm cao
          mới.
        </h3>
        <div className="submenu">
          <SubMenu animation={true} />
        </div>

        <InfoButton data-aos="fade-up" label={"All"} horizontalPadding={true} />
      </div>
      <div
        data-aos="fade-up"
        className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 info-bg-2"
      ></div>
    </div>
  </div>
);

export default Info;
