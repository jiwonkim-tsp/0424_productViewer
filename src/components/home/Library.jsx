import React from "react";
import Slider from "react-slick";
import LibraryList from "./LibraryList";
import styled from "styled-components";
import color from "@Constants/color";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const Library = () => {
  return (
    <$Wrapper>
      <Slider {...settings}>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        {/* <LibraryList />
        <LibraryList />
        <LibraryList />
        <LibraryList />
        <LibraryList />
        <LibraryList /> */}
      </Slider>
    </$Wrapper>
  );
};

export default Library;

const $Wrapper = styled.div`
  background-color: ${color["white"]};
  border-radius: 1.5vw;
  display: flex;
`;
