import React from "react";
import LogoPlaceHolder from "../assets/images/logo_placeholder.svg";
import "./ClientsLogo.scss";

const ClientsLogo = () => {
  const logos = [
    LogoPlaceHolder,
    LogoPlaceHolder,
    LogoPlaceHolder,
    LogoPlaceHolder,
    LogoPlaceHolder,
    LogoPlaceHolder,
    LogoPlaceHolder,
    LogoPlaceHolder,
    LogoPlaceHolder,
    LogoPlaceHolder,
    LogoPlaceHolder,
    LogoPlaceHolder,
  ];

  const randomUnique = (range, count) => {
    let nums = new Set();
    while (nums.size < count) {
      nums.add(Math.floor(Math.random() * range + 1));
    }
    return [...nums];
  };
  const delayArr = randomUnique(20, 20);
  // console.log(delayArr);

  return (
    <div className="ClientsLogo" id="endAnimationId">
      <div className="container">
        <h1 data-aos="fade-up">Our Clients</h1>
        <div className="row">
          {logos.map((logo, index) => (
            <div
              className="clientLogo-extra-small col-6 col-xs-4 col-sm-4 col-md-3 col-lg-2 col-xl-2"
              key={index}
            >
              <img
                data-aos="fade-up"
                data-aos-delay={delayArr[index] * 100 - 100}
                src={logo}
                alt=""
                key={index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsLogo;
