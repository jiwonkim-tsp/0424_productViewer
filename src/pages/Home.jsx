import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import color from "@Constants/color";
import CustomCanvas from "@Components/home/CustomCanvas";
import Library from "@Components/home/Library";

const navList = [
  { name: "Maker", link: "/maker" },
  { name: "Transfer", link: "/transfer" },
  { name: "Fit", link: "/fit" },
];

const Home = () => {
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
              <$NavLi key={list.name}>
                <Link to={list.link}>{list.name}</Link>
              </$NavLi>
            ))}
          </$Nav>
        </$Explanation>
        <Library />
      </$Left>
      <$Right>
        <CustomCanvas />
      </$Right>
    </$Wrapper>
  );
};

export default Home;

const $Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 5vw);
`;

const $Left = styled.div`
  padding: 5vw;
  margin-left: 5vw;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const $Right = styled.div`
  width: 50%;
`;

const $Explanation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.5vw;
  margin-right: 5vw;
  margin-bottom: 5vw;
`;

const $Title = styled.div`
  font-size: 2vw;
`;

const $Content = styled.div`
  position: relative;
  text-align: right;
  &::after {
    content: "";
    position: absolute;
    bottom: -1vw;
    right: 0;
    width: 7.5vw;
    border: 1px solid ${color["purple"]};
  }
`;

const $Nav = styled.ul`
  margin-top: 1vw;
  display: flex;
  gap: 0.5vw;
`;

const $NavLi = styled.li`
  width: 4.5vw;
  height: 4.5vw;
  border-radius: 1vw;
  background-color: ${color["darkGrey"]};
  a {
    font-size: 1vw;
    text-decoration: none;
    color: white;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :hover {
    background-color: ${color["purple"]};
  }
`;
