import React, { useEffect } from "react";
import styled from "styled-components";
import color from "@Constants/color";
import example from "@Assets/images/example.png";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const Maker = () => {
  const canvasRef = useRef();
  const inputRefs = useRef([null, null, null, null]);
  const imgRef = useRef();
  const videoFramesList = [];
  const navigate = useNavigate();

  console.log(inputRefs.current[0]);
  // console.log(videoFrameList);

  function testFunc() {
    const cameras = ["camera1", "camera2", "camera3", "camera4"];

    if (imgRef.current) {
      imgRef.current.src = URL.createObjectURL(videoFramesList[2][12]);
    }

    console.log(imgRef.current.src);
    const totalImages = videoFramesList[0].length;

    let currentImageIndex = 1;
    let currentCameraIndex = 0;

    /* Function updateImage */
    function updateImage() {
      if (imgRef.current) {
        imgRef.current.src = URL.createObjectURL(
          videoFramesList[currentCameraIndex][currentImageIndex - 1]
        );
      }
    }

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function handleStart(e) {
      e.preventDefault();
      //마우스 이벤트와 터치 이벤트의 시작지점
      const startX = e.clientX || e.touches[0].clientX;
      const startY = e.clientY || e.touches[0].clientY;
      const initialImageIndex = currentImageIndex;
      const initialCameraIndex = currentCameraIndex;

      function handleMove(e) {
        //이미지 회전
        const deltaX = (e.clientX || e.touches[0].clientX) - startX;
        //카메라 움직임
        const deltaY = (e.clientY || e.touches[0].clientY) - startY;

        currentImageIndex = Math.round(
          initialImageIndex + (deltaX / viewer.clientWidth) * totalImages
        );
        currentImageIndex =
          ((((currentImageIndex - 1) % totalImages) + totalImages) %
            totalImages) +
          1; // Wrap around index

        currentCameraIndex = clamp(
          Math.round(
            initialCameraIndex -
              (deltaY / viewer.clientHeight) * (cameras.length - 1)
          ),
          0,
          cameras.length - 1
        );
        updateImage();
      }

      function handleEnd() {
        viewer.removeEventListener("mousemove", handleMove);
        viewer.removeEventListener("touchmove", handleMove);
        viewer.removeEventListener("mouseup", handleEnd);
        viewer.removeEventListener("touchend", handleEnd);
      }

      viewer.addEventListener("mousemove", handleMove);
      viewer.addEventListener("touchmove", handleMove);
      viewer.addEventListener("mouseup", handleEnd);
      viewer.addEventListener("touchend", handleEnd);
    }
    viewer.addEventListener("mousedown", handleStart);
    viewer.addEventListener("touchstart", handleStart);
  }

  async function captureFrame(video) {
    const frames = [];
    //getContext 랜더링 컨텍스트와 그리기 함수들 사용, 인수로 렌더링 컨텍스트 타입 지정
    const ctx = canvasRef.current?.getContext("2d");
    //drqwImage(image, x,y) 캔버스에서 이미지를 그림
    ctx.drawImage(video, 0, 0);
    return new Promise((resolve) => {
      canvasRef.current?.toBlob((blob) => {
        frames.push(blob);
        resolve(frames);
      });
    });
  }

  async function processVideo(videos) {
    const interval = 1000;

    for (const video of videos) {
      console.log(video);
      let currentTime = 0;
      const frames = [];

      while (currentTime < video.duration) {
        video.currentTime = currentTime;
        await new Promise((resolve) =>
          video.addEventListener("seeked", resolve, { once: true })
        );
        const capturedFrames = await captureFrame(video);
        frames.push(...capturedFrames);
        console.log(frames);
        currentTime += interval / 1000;
      }
      videoFramesList.push(frames);
      console.log(videoFramesList);
    }
  }

  console.log(videoFramesList);

  const handleChange = async (event) => {
    const files = inputRefs.current.map((input) => input && input.files[0]);
    console.log(files);
    //some 배열 안의 요소가 주어진 판별 함수를 적어도 하나라도 통과하는지 확인
    if (files.some((file) => !file)) return;

    const videos = await Promise.all(
      files.map((file) => {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(file);
        return new Promise((resolve) => {
          video.addEventListener("loadedmetadata", () => {
            resolve(video);
          });
        });
      })
    );
    await processVideo(videos);
  };

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
        <img ref={imgRef} alt="360 degree view" id="current-image" />
      </div>
      <$AddBox>
        {[0, 1, 2, 3].map((id) => (
          <$AddList key={id}>
            <label htmlFor={`input-file-${id}`}>+</label>
            <input
              id={`input-file-${id}`}
              ref={(input) => (inputRefs.current[id] = input)}
              type="file"
              onChange={handleChange}
            />
          </$AddList>
        ))}
        <$Btn onClick={() => testFunc()}></$Btn>
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
  font-size: 1vw;
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
