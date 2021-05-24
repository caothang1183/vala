import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import SubMenu from "./sub_components/SubMenu";
import ytGrey from "../assets/images/icons/yt_grey.svg";
import pinGrey from "../assets/images/icons/pin_grey.svg";
import insGrey from "../assets/images/icons/ins_grey.svg";
import inlGrey from "../assets/images/icons/inl_grey.svg";
import { FaTimes } from "react-icons/fa";
import SubscribeNews from "../components/SubscribeNews";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { IconButton, Toolbar, AppBar, Slide, Dialog } from "@material-ui/core";
import PrivacyPolicy from "../pages/privacy_policy/PrivacyPolicy";
import Term from "../pages/privacy_policy/Term";
import SocialIcon from "../socialcomponent/SocialIcon";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    height: 200,
    position: "relative",
  },

  buttoncenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const TransitionTerm = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const icons = [ytGrey, pinGrey, inlGrey, insGrey];
const Footer = ({ hiddenContact = false, url }) => {
  const backgroundModal = {
    height: "150vh",
    background: `linear-gradient(90deg, rgba(8,94,114, 0.6), rgba(8,94,114, 0.8)), 
        url('https://images.unsplash.com/photo-1573495612077-a689b084faab?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI4fGFldTZyTC1qNmV3fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const classes = useStyles();
  const [isSubscribeOpen, setSubscribeOpen] = useState(false);
  const [isPolicyOpen, setPolicyOpen] = React.useState(false);
  const [isTermOpen, setTermOpen] = React.useState(false);

  return (
    <div className="footer" id="footer">
      <div className={hiddenContact ? "d-none" : "d-block"}>
        <div className="row footer-content  container ">
          <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
            {/* INFO */}
            <h3>Contact Us</h3>
            <div className="footer-info ">
              125/2 Hoa Hung Street, Ward 12, District 10, Ho Chi Minh City
              <ul>
                <li>
                  <i className="fas fa-phone" /> 0908 999 999
                </li>
                <li>
                  <i className="far fa-paper-plane" /> info@kagency.com
                </li>
              </ul>
              <div className="subscribe">
                <Link to="/" onClick={() => setSubscribeOpen(true)}>
                  <span>Signup Newsletter</span>
                </Link>
                <Dialog
                  fullScreen
                  open={isSubscribeOpen}
                  onClose={() => setSubscribeOpen(false)}
                  TransitionComponent={Transition}
                >
                  <div style={backgroundModal}>
                    <div
                      style={{
                        cursor: "pointer",
                        color: "white",
                        display: "flex",
                        width: "90px",
                        margin: "9% auto 30px auto",
                      }}
                      className="subscribe-close"
                      onClick={() => setSubscribeOpen(false)}
                    >
                      <FaTimes
                        className="subscribe-modal-icon"
                        style={{
                          display: "block",
                          width: "40px",
                          height: "40px",
                        }}
                      />
                      <span
                        style={{
                          margin: "auto 0px",
                          fontWeight: "700",
                          fontSize: "18px",
                          textTransform: "uppercase",
                        }}
                      >
                        Close
                      </span>
                    </div>
                    <SubscribeNews />
                  </div>
                </Dialog>
              </div>
            </div>
          </div>
          <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 footer-social">
            <h3>Social Link</h3>
            <div className="footer-fanpage">
              <div
                className="fb-page"
                data-href="https://www.facebook.com/kagencyvietnam"
                data-tabs="timeline"
                data-width=""
                data-height="100px"
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
              >
                <blockquote
                  cite="https://www.facebook.com/kagencyvietnam"
                  className="fb-xfbml-parse-ignore"
                >
                  <a href="https://www.facebook.com/kagencyvietnam">Kagency</a>
                </blockquote>
              </div>
            </div>
            <div className="footer-iconlink">
              <SocialIcon icons={icons} />
            </div>
          </div>
          <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 footer-servicelink">
            {/* SERVICE LINKS */}
            {/*sub menu */}
            <SubMenu />
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="copyright">
          <div className="row">
            <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <p>Copyright©2021. KAGENCY Co.Ltd</p>
            </div>
            <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <ul>
                <li>
                  <Link to="#" onClick={() => setPolicyOpen(true)}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setTermOpen(true)} to="#">
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Start of Chính sách quyền riêng tư Modal*/}

      <Dialog
        keepMounted
        open={isPolicyOpen}
        onClose={() => setPolicyOpen(false)}
        TransitionComponent={Transition}
        fullScreen
      >
        <div color="secondary" className={classes.buttoncenter}>
          <Toolbar>
            <div className="container">
              <div
                className="btntext"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <FaTimes style={{ marginTop: 4 }} />{" "}
                <span
                  style={{ marginLeft: 5 }}
                  onClick={() => setPolicyOpen(false)}
                >
                  Close
                </span>
              </div>
            </div>
          </Toolbar>
        </div>

        <PrivacyPolicy />
      </Dialog>
      {/* End of Chính sách quyền riêng tư Modal*/}

      {/* Start of Điều khoản dịch dụ Modal*/}
      <Dialog
        fullScreen
        open={isTermOpen}
        onClose={() => setTermOpen(false)}
        TransitionComponent={TransitionTerm}
      >
        <AppBar color="secondary" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setTermOpen(false)}
              aria-label="close"
            >
              <FaTimes style={{ color: "black" }} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Term />
      </Dialog>
      {/* End of Điều khoản dịch dụ Modal*/}
    </div>
  );
};

export default Footer;
