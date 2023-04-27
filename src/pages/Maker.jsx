import React from "react";
import styled from "styled-components";
import color from "@Constants/color";
import example from "@Assets/images/example.png";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import useMaker from "../hook/useMaker";

const Maker = () => {
  const navigate = useNavigate();
  const { canvasRef, inputRefs, imgRef, handleChange, handleSubmit } =
    useMaker();

  return (
    <$Wrapper>
      <$ExplanBox>
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
        <img src={example} />
      </$ExplanBox>
      <canvas id="canvas" ref={canvasRef} style={{ display: "none" }}></canvas>
      <div id="viewer">
        <img ref={imgRef} id="current-image" />
      </div>
      <$AddBox>
        {[0, 1, 2, 3].map((id) => (
          <$AddList key={id}>
            <label htmlFor={`input-file-${id}`}>+</label>
            <input
              id={`input-file-${id}`}
              ref={(input) => (inputRefs.current[id] = input)}
              type="file"
              onChange={() => handleChange()}
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
  height: calc(100vh - 10vw);
`;

const $ExplanBox = styled.div`
  display: flex;
  img {
    width: 40vw;
  }
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

const $BackBtn = styled.div`
  display: flex;
  align-items: center;
  font-size: 1vw;
  cursor: pointer;
`;

const $Title = styled.div`
  font-weight: normal;
  font-size: 3.5vw;
`;

const $Content = styled.div`
  /* text-align: right; */
`;

const $AddBox = styled.div`
  position: absolute;
  bottom: 0;
  margin-top: 10vw;
  box-shadow: rgba(0, 0, 0, 0.3) 0px -8px 16px -8px;
  width: 100vw;
  height: 12vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
  /* align-items: center;
  justify-content: center; */
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
    cursor: pointer;
    padding: 3vw;
    color: ${color["darkGrey"]};
  }
  input {
    display: none;
  }
`;

const $Btn = styled.button`
  width: 6.5vw;
  height: 6.5vw;
  background-color: ${color.purple};
  border-radius: 0.8vw;
`;
