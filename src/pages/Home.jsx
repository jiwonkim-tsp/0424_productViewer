import React from "react";
import styled from "styled-components";
import color from "@Constants/color";
import Slider from "react-slick";
import { useLocation, useOutletContext } from "react-router-dom";
import example from "@Assets/images/example.png";

const navList = [
  { name: "Maker", link: "/maker" },
  { name: "Transfer", link: "/transfer" },
  { name: "Fit", link: "/fit" },
];

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
};

const Home = () => {
  // const { pathname } = useLocation();
  // console.log(pathname);

  function hook() {
    const chan = useOutletContext();
    console.log(chan);
  }

  return (
    <$Wrapper>
      <$Left>
        <$Explanation>
          <$Title>서비스 제목</$Title>
          <$Content>
            이것은 이런 소스와 저런 소스들을 등록하여
            <br /> 모델링을 만들어냅니다. <br />
            <br />
            이것은 이런 소스와 저런 소스들을 등록하여 <br /> 모델링을
            만들어냅니다.
          </$Content>
          <$Nav>
            {navList.map((list) => (
              <$NavLi key={list.name}>{list.name}</$NavLi>
            ))}
          </$Nav>
        </$Explanation>
        <Slider {...settings}>
          <$SliderLi>
            <img src={example} />
          </$SliderLi>
          <$SliderLi>
            <img src={example} />
          </$SliderLi>
          <$SliderLi>
            <img src={example} />
          </$SliderLi>
        </Slider>
      </$Left>
      <$Right>
        {/* <Slider>
          <$SliderLi>
            <img src={example} />
          </$SliderLi>
          <$SliderLi>
            <img src={example} />
          </$SliderLi>
          <$SliderLi>
            <img src={example} />
          </$SliderLi>
        </Slider> */}
      </$Right>
    </$Wrapper>
  );
};

export default Home;

const $Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 10vw);
`;

const $Left = styled.div`
  /* background-color: pink; */
  margin-left: 5vw;
  width: 50vw;
  display: flex;
  flex-direction: column;
  .slick-slider {
    background-color: ${color["white"]};
    border-radius: 1.5vw;
  }
`;

const $Right = styled.div``;

const $Explanation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.5vw;
  margin-right: 5vw;
  margin-bottom: 5vw;
`;

const $Title = styled.h1`
  font-size: 3.5vw;
`;

const $Content = styled.div`
  position: relative;
  text-align: right;
  &::after {
    content: "";
    position: absolute;
    top: 7vw;
    right: 0;
    width: 12vw;
    border: 1px solid ${color["purple"]};
  }
`;

const $Nav = styled.ul`
  margin-top: 1.5vw;
  display: flex;
  gap: 1vw;
`;

const $NavLi = styled.li`
  width: 5.5vw;
  height: 5.5vw;
  border-radius: 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color["purple"]};
  color: white;
`;

const $SliderLi = styled.div`
  position: relative;
  padding: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
  &::after {
    content: "";
    position: absolute;
    top: 1.5vw;
    right: 0;
    height: 12vw;
    border: 1px solid ${color["grey"]};
  }
  img {
    border: 1px solid blue;
    width: 10vw;
  }
`;
