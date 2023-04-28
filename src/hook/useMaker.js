import React from "react";
import { useRef, useState } from "react";

const useMaker = () => {
  const canvasRef = useRef();
  const inputRefs = useRef([null, null, null, null]);
  const imgRef = useRef();
  const videoFramesList = [];
  const [loading, setLoading] = useState(false);

  function testFunc() {
    const cameras = ["camera1", "camera2", "camera3", "camera4"];

    if (imgRef.current) {
      imgRef.current.src = URL.createObjectURL(videoFramesList[2][12]);
    }

    const totalImages = videoFramesList[0].length;

    let currentImageIndex = 1;
    let currentCameraIndex = 0;

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
          1;

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
    canvasRef.current.width = video.videoWidth;
    canvasRef.current.height = video.videoHeight;
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
    //프레임 추출하는 동안 로딩이미지 보여주기
    setLoading(true);

    const interval = 1000;

    for (const video of videos) {
      let currentTime = 0;
      const frames = [];

      while (currentTime < video.duration) {
        video.currentTime = currentTime;
        await new Promise((resolve) =>
          video.addEventListener("seeked", resolve, { once: true })
        );
        const capturedFrames = await captureFrame(video);
        frames.push(...capturedFrames);
        currentTime += interval / 1000;
      }
      videoFramesList.push(frames);
      console.log(videoFramesList);
      if (videoFramesList.length === 4) {
        testFunc();
      }
    }

    setLoading(false);
  }

  // button에 클릭이벤트가 발생했을 때 실행
  function handleSubmit() {
    const files = inputRefs.current.map((input) => input && input.files[0]);
    console.log(files);

    //파일 업로드 여부 확인
    const nullIndices = files
      .map((file, index) => (file ? undefined : index))
      .filter((index) => index !== undefined)
      .map((index) => index + 1);

    if (nullIndices.length > 0) {
      alert(`${nullIndices.join(", ")}번 비디오가 로드되지 않았습니다.`);
      return;
    }
  }

  // input에 이벤트가 발생할 경우 실행
  async function handleChange(event) {
    // console.log(event.target);
    const label = event.target.previousSibling;
    label.style.backgroundColor = "#B1B1B1";
    label.innerText = "";

    const files = inputRefs.current.map((input) => input && input.files[0]);
    // console.log(files);
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
  }

  return {
    loading,
    canvasRef,
    inputRefs,
    imgRef,
    handleChange,
    handleSubmit,
  };
};

export default useMaker;
