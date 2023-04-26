import React from "react";

const useMaker = () => {
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

  return {handleChange}
};

export default useMaker;
