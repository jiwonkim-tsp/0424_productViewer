import React from "react";
import { Canvas } from "@react-three/fiber";
import Mesh from "./Mesh";
import { SpotLight } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as dat from "dat.gui";

const CustomCanvas = () => {
  function Helper() {
    const { gl, scene, camera } = useThree();
    const helper = new THREE.CameraHelper(camera);
    const gui = new dat.GUI();
    scene.add(helper);
  }

  const spotLight = new THREE.SpotLight(0xc7c7c7);

  function Light() {
    const { gl, scene, camera } = useThree();

    spotLight.intensity = 1;
    spotLight.distance = 0;
    spotLight.angle = 2;
    spotLight.penumbra = 1;
    spotLight.decay = 2.2;
    spotLight.focus = 1;
    spotLight.castShadow = true;
    spotLight.position.set(30, 10, 30);
    spotLight.target.position.set(7, 8, 5);
    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(spotLight, spotLightHelper);
  }

  function Gui() {
    const gui = new dat.GUI();
    gui.add(spotLight.position, "x", -100, 100).name("spotLightX");
    gui.add(spotLight.position, "y", -100, 100).name("spotLightY");
    gui.add(spotLight.position, "z", -100, 100).name("spotLightZ");
    gui.add(spotLight.target.position, "x", -50, 50).name("spotLightZ");
    gui.add(spotLight.target.position, "y", -50, 50).name("spotLightZ");
    gui.add(spotLight.target.position, "z", -50, 50).name("spotLightZ");
    gui.add(spotLight, "intensity", 10000, 20000).name("spotLightIntensity");
    // gui
    //   .addColor(new ColorGUIHelper(spotLight, "color"), "value")
    //   .name("spotLight");
  }

  const cameraParams = {
    x: 0,
    y: 50,
    z: 100,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
  };

  function CameraGui() {
    const gui = new dat.GUI();
    const { camera } = useThree();

    gui.add(cameraParams, "x", -300, 200).onChange(() => {
      camera.position.x = cameraParams.x;
    });

    gui.add(cameraParams, "y", 0, 300).onChange(() => {
      camera.position.y = cameraParams.y;
    });

    gui.add(cameraParams, "z", -200, 200).onChange(() => {
      camera.position.z = cameraParams.z;
    });

    gui.add(cameraParams, "rotateX", -180, 180).onChange(() => {
      camera.rotation.x = THREE.MathUtils.degToRad(cameraParams.rotateX);
    });

    gui.add(cameraParams, "rotateY", -180, 180).onChange(() => {
      camera.rotation.y = THREE.MathUtils.degToRad(cameraParams.rotateY);
    });

    gui.add(cameraParams, "rotateZ", -180, 180).onChange(() => {
      camera.rotation.z = THREE.MathUtils.degToRad(cameraParams.rotateZ);
    });
  }
  return (
    <Canvas camera={{ position: [-133, 237, 210] }}>
      {/* <Gui /> */}
      <CameraGui />
      {/* <Helper /> */}
      {/* <Light /> */}
      <ambientLight args={["#ffffff", 0.3]} />
      <directionalLight args={["#ffffff", 0.8]} />
      <OrbitControls />
      <Mesh />
    </Canvas>
  );
};

export default CustomCanvas;
