import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import color from "@Constants/color";
import example from "@Assets/images/example.png";
import prev from "@Assets/images/prev.png";
import next from "@Assets/images/next.png";

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="slick-prev"
      aria-label="Previous"
      type="button"
      onClick={onClick}
    >
      <img src={prev} />
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="slick-next"
      aria-label="Next"
      type="button"
      onClick={onClick}
    >
      <img src={next} />
    </button>
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
};

const Library = () => {
  return (
    <$SliderWrapper>
      <Slider {...settings}>
        <div>
          <img src={example} />
        </div>
        <div>
          <img src={example} />
        </div>
        <div>
          <img src={example} />
        </div>
        <div>
          <img src={example} />
        </div>
      </Slider>
    </$SliderWrapper>
  );
};

export default Library;

const $SliderWrapper = styled.div`
  background-color: ${color["white"]};
  border-radius: 1.5vw;
  .slick-prev {
    /* position: absolute;
    top: 12.65vw;
    left: 14vw; */
  }
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide {
    padding: 1.4vw;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 8vw;
    }
  }
  .slick-slide.slick-active {
    /* border: 1px solid red; */
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 0.8vw;
      right: -1vw;
      height: 10vw;
      border: 1px solid ${color["grey"]};
    }
  }
`;
