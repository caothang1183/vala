import { Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "./Contact.scss";
import MetaTags from 'react-meta-tags';

const Submit = (event) =>{
  alert("Not available")
  event.preventDefault();
}
const Contact = () => (
  <Fragment>
    <div className="Contact">
    <MetaTags>
            <title>Liên Hệ Với Chúng Tôi | KaGenCy</title>
            <meta name="description" content="Kagency tự hào được lựa chọn bởi các đối tác như: Samsung, Gigabyte, DEE
        Net, Vala… ." />
            <meta property="og:title" content="About Us | KaGenCy" />
            <meta property="og:image" content="path/to/image.jpg" />
          </MetaTags>
      <div className="container">
        <div className="row contact-row">
          <div className="col-12">
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  title="location"
                  className="gmap_iframe"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=125/2 Hoa Hung Street, Ward 12, District 10, Ho Chi Minh City&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
                <Link to="https://www.fridaynightfunkin.net/"></Link>
              </div>
            </div>
          </div>
          <div className="row contact-info">
            <div className="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 address">
              <h1>KAGENCY</h1>
              <p>
                125/2 Hoa Hung, Ward 12, District 10, Ho Chi Minh City, Vietnam
              </p>
              <ul>
                <li>
                  <p className="phone">
                    <span>
                      <i className="fas fa-phone" />
                    </span>
                    0908 999 999
                  </p>
                </li>
                <li>
                  <p className={"email"}>
                    <span>
                      <i className="far fa-paper-plane" />
                    </span>
                    info@kagency.com
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div className="form-contact">
                <form onSubmit={Submit} method="post">
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        id="lname"
                        name="lastname"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Your Phone"
                  />

                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Your email"
                  />

                  <textarea
                    id="message"
                    name="message"
                    placeholder="Message:"
                  ></textarea>

                  <input type="submit" value="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer hiddenContact={true} />
    </div>
  </Fragment>
);

export default Contact;
