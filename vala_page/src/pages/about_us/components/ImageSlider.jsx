import { React, useState } from "react";
import SliderData from "./SliderData";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./ImageSlider.scss";

const ImageSlider = () => {
  const data = SliderData;

  const [current, setCurrent] = useState(0);
  const prevImage = () => {
    setCurrent(current === 0 ? data.length - 1 : current - 1);
  };
  const nextImage = () => {
    setCurrent(current === data.length - 1 ? 0 : current + 1);
  };

  if (!Array.isArray(data) || data.length <= 0) {
    return null;
  }

  return (
    <div className="slider-control">
      <FaAngleLeft className="left-arrow" onClick={prevImage} />
      <FaAngleRight className="right-arrow" onClick={nextImage} />
      <section className="slider">
        <div className="col">
          <div className={`image-slider-content active-image-${current}`}>
            <div
              className="image-slider-wrapper"
              style={{
                transform: `translateX(-${current * (100 / data.length)}%)`,
              }}
            >
              {data.map((item, index) => {
                return (
                  <div
                    className="image"
                    id={`image-${index}`}
                    key={index}
                    onClick={() => setCurrent(index)}
                  >
                    <img src={item.image} alt={item.title} key={item.index} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="text-slider-content">
          {data.map((item, index) => {
            return (
              <div
                className={
                  index === current ? "text-slider active" : "text-slider"
                }
                key={index}
              >
                {index === current && (
                  <div className="detail">
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ImageSlider;
