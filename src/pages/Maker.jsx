import React from "react";
import styled from "styled-components";
import color from "@Constants/color";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import useMaker from "../hook/useMaker";
import Loading from "@Components/Loading";

const Maker = () => {
  const navigate = useNavigate();
  const { loading, canvasRef, inputRefs, imgRef, handleChange, handleSubmit } =
    useMaker();

  console.log(loading);

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
            이것은 이런 소스와 저런 소스들을 등록하여
            <br /> 모델링을 만들어냅니다. <br />
            <br />
            이것은 이런 소스와 저런 소스들을 등록하여 <br /> 모델링을
            만들어냅니다.
          </$Content>
        </$Explanation>
        <$Viewer>
          {loading && <Loading />}
          <canvas
            id="canvas"
            ref={canvasRef}
            style={{ display: "none" }}
          ></canvas>
          <div id="viewer">
            <img ref={imgRef} id="current-image" />
          </div>
        </$Viewer>
      </$Maker>
      <$AddBox>
        {[0, 1, 2, 3].map((id) => (
          <$AddList key={id}>
            <label htmlFor={`input-file-${id}`}>+</label>
            <input
              id={`input-file-${id}`}
              ref={(input) => (inputRefs.current[id] = input)}
              type="file"
              onChange={(event) => handleChange(event)}
            />
          </$AddList>
        ))}
        <$Btn onClick={() => handleSubmit()}></$Btn>
      </$AddBox>
    </$Wrapper>
  );
};

export default Maker;

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
