import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const Transfer = () => {
  const navigate = useNavigate();
  return (
    <$Wrapper>
      <$Left>
        <$Explanation>
          <$BackBtn onClick={() => navigate(-1)}>
            <MdOutlineKeyboardArrowLeft />
            돌아가기
          </$BackBtn>
          <$Title>사용법</$Title>
          <$Content>
            <$ContentLi>
              이것은 이런 소스와 저런 소스들을 등록하여 모델링을 만들어냅니다.
            </$ContentLi>
            <$ContentLi>
              이것은 이런 소스와 저런 소스들을 등록하여 모델링을 만들어냅니다.
            </$ContentLi>
            <$ContentLi>
              이것은 이런 소스와 저런 소스들을 등록하여 모델링을 만들어냅니다.
            </$ContentLi>
          </$Content>
        </$Explanation>
      </$Left>
      <$Right></$Right>
    </$Wrapper>
  );
};

export default Transfer;

const $Wrapper = styled.div`
  /* background-color: pink; */
  width: 100%;
  height: calc(100vh - 10vw);
  display: flex;
`;

const $Left = styled.div`
  width: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const $Explanation = styled.div`
  /* background-color: yellow; */
  padding: 3vw;
  width: 30vw;
  display: flex;
  flex-direction: column;
  gap: 2vw;
`;

const $BackBtn = styled.div`
  font-size: 1vw;
`;

const $Title = styled.h1`
  font-size: 4.1vw;
`;

const $Content = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5vw;
`;

const $ContentLi = styled.li``;

const $Right = styled.div``;
