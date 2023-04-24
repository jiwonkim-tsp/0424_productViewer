import React, { useEffect } from "react";
import styled from "styled-components";
import color from "@Constants/color";
import example from "@Assets/images/example.png";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const Maker = () => {
  const canvasRef = useRef();
  const inputRefs = useRef([null, null, null, null]);
  const imgRef = useRef();
  const videoFrameList = [];
  let frames = [];

  function testFunc() {
    const cameras = ["camera1", "camera2", "camera3", "camera4"];

    if (imgRef.current) {
      imgRef.current.src = URL.createObjectURL(videoFrameList[2][12]);
    }

    console.log(imgRef.current.src);
    const totalImages = videoFrameList[0].length;

    let currentImageIndex = 1;
    let currentCameraIndex = 0;

    /* Function updateImage */
    function updateImage() {
      if (imgRef.current) {
        imgRef.current.src = URL.createObjectURL(
          videoFrameList[currentCameraIndex][currentImageIndex - 1]
        );
      }
    }

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function handleStart(e) {
      e.preventDefault();
      const startX = e.clientX || e.touches[0].clientX;
      const startY = e.clientY || e.touches[0].clientY;
      const initialImageIndex = currentImageIndex;
      const initialCameraIndex = currentCameraIndex;

      function handleMove(e) {
        const deltaX = (e.clientX || e.touches[0].clientX) - startX;
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
    return new Promise((resolve) => {
      const ctx = canvasRef.current?.getContext("2d");
      ctx.drawImage(video, 0, 0);
      canvasRef.current?.toBlob((blob) => {
        frames.push(blob);
        videoFrameList.push(frames);
        // console.log(videoFrameList);
        // if (videoFrameList.length === 25) {
        //   const url = window.URL.createObjectURL(videoFrameList[2][12]);
        //   if (imgRef.current) {
        //     imgRef.current.src = url;
        //     console.log(imgRef.current.src);
        //   }
        // }
        resolve();
      });
    });
  }

  async function processVideo(video) {
    console.log(video);
    const interval = 1000;
    let currentTime = 0;

    while (currentTime < video.duration) {
      video.currentTime = currentTime;
      await new Promise((resolve) =>
        video.addEventListener("seeked", resolve, { once: true })
      );
      await captureFrame(video);
      currentTime += interval / 1000;
    }
  }

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);

    await new Promise((resolve) => {
      video.addEventListener("loadedmetadata", () => {
        if (canvasRef.current) {
          canvasRef.current.width = video.videoWidth;
          canvasRef.current.height = video.videoHeight;
        }
        resolve();
      });
    });

    await processVideo(video);
  };

  return (
    <$Wrapper>
      {/* <$ExplanBox>
        <$Explanation>
          <Link to="/">돌아가기</Link>
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
      </$ExplanBox> */}
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
        <button onClick={() => testFunc()}>제출</button>
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

const $Title = styled.div`
  font-weight: normal;
  font-size: 3.5vw;
`;

const $Content = styled.div`
  /* text-align: right; */
`;

const $AddBox = styled.div`
  margin-top: 10vw;
  box-shadow: rgba(0, 0, 0, 0.3) 0px -8px 16px -8px;
  width: 100vw;
  height: 15vw;
  display: flex;
  gap: 10vw;
  /* align-items: center;
  justify-content: center; */
  button {
    padding: 2vw;
    background-color: pink;
  }
`;

const $AddList = styled.div`
  /* position: relative; */
  label {
    /* position: absolute; */
    border-radius: 0.8vw;
    background-color: ${color["lightGrey"]};
    color: ${color["darkGrey"]};
    cursor: pointer;
    padding: 3vw 3.5vw;
  }
  input {
    display: none;
  }
`;
