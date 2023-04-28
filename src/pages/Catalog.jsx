import React, { useRef, useState } from "react";
import styled from "styled-components";
import color from "@Constants/color";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import CatalogCanvas from "../components/CatalogCanvas";
import background from "@Assets/images/background.png";

const Catalog = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [file, setFile] = useState(null);

  const handleClick = () => {
    const file = inputRef.current.files[0];
    console.log(file);
    setFile(file);
  };

  return (
    <$Wrapper>
      <$Maker>
        <$Explanation>
          <$BackBtn onClick={() => navigate(-1)}>
            <MdOutlineKeyboardArrowLeft />
            돌아가기
          </$BackBtn>
          <$Title>사용법</$Title>
          <$Content>
            이것은 이런 소스와 저런 소스들을 등록하여 모델링을 만들어냅니다.{" "}
            <br />
            <br />
            마우스로 좌우 스크롤을 활용하여 오브젝트 객체를 확인합니다. <br />
            <br />
            마우스로 좌우 스크롤을 활용하여 오브젝트 객체를 확인합니다.
          </$Content>
        </$Explanation>
        <$Viewer>
          <CatalogCanvas file={file} />
          {/* <img src={background} /> */}
        </$Viewer>
      </$Maker>
      <$AddBox>
        <$AddList>
          <label htmlFor="input-file">+</label>
          <input id="input-file" ref={inputRef} type="file" />
        </$AddList>
        <$Btn onClick={handleClick}></$Btn>
      </$AddBox>
    </$Wrapper>
  );
};

export default Catalog;

const $Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 20vw);
  display: flex;
  flex-direction: column;
`;

const $Maker = styled.div`
  display: flex;
  height: 100%;
`;

const $Explanation = styled.div`
  padding: 10vw;
  width: 50vw;
  display: flex;
  flex-direction: column;
  gap: 1.5vw;
  margin-right: 5vw;
  margin-bottom: 5vw;
`;

const $Viewer = styled.div`
  width: 50vw;
  margin-right: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    height: 30vw;
  }
`;

const $BackBtn = styled.div`
  display: flex;
  align-items: center;
  font-size: 1vw;
  cursor: pointer;
`;

const $Title = styled.div`
  font-weight: normal;
  font-size: 2vw;
`;

const $Content = styled.div`
  /* text-align: right; */
`;

const $AddBox = styled.div`
  position: fixed;
  bottom: 0;
  box-shadow: rgba(0, 0, 0, 0.3) 0px -8px 16px -8px;
  width: 100vw;
  height: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
`;

const $AddList = styled.div`
  width: 7vw;
  height: 7vw;
  background-color: ${color["lightGrey"]};
  border-radius: 0.8vw;
  position: relative;
  label {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 0.8vw;
    width: 7vw;
    height: 7vw;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${color["darkGrey"]};
  }
  input {
    display: none;
  }
`;

const $Btn = styled.button`
  width: 7vw;
  height: 7vw;
  background-color: ${color.purple};
  border-radius: 0.8vw;
  cursor: pointer;
`;
