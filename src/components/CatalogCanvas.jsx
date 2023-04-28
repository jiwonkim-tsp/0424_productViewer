import React from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import background from "@Assets/images/background.png";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import tableFbx from "@Assets/images/table.fbx?url";

// const Orbit = () => {
//   const {camera, gl} = useThree()
//   camera.rotation.set(deg2rad(-30), 0, 0);
//   camera.position.set(0, 6, 6)
//   return(
//     <orbitControls args={[camera, gl.domElement]}/>
//   );
// }

const CatalogCanvas = ({ file }) => {
  // let loader;

  // if (file && file.type === "model/fbx") {
  //   loader = new FBXLoader();
  // } else if (file && file.type === "model/gltf+json") {
  //   loader = new GLTFLoader();
  // } else {
  //   return null;
  // }

  const modelUrl = URL.createObjectURL(file);
  console.log(modelUrl);
  // const [model, setModel] = useState(null);

  // const Upload = () => {
  //   const { scene } = useThree();
  //   useEffect(() => {
  //     loader.load(modelUrl, (model) => {
  //       scene.add(model);
  //       setModel(model);
  //     });
  //     return () => {
  //       if (model) {
  //         scene.remove(model);
  //       }
  //     };
  //   }, [modelUrl, scene, loader, model]);
  // };
  console.log(file);
  console.log(tableFbx);
  // const uploadedFile = useLoader(FBXLoader, file);
  // console.log(uploadedFile);
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <Upload /> */}
      {/* {uploadedFile && <primitive object={uploadedFile} />} */}
    </Canvas>
  );
};

export default CatalogCanvas;
