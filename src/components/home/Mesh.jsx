import React from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import sofaFbx from "@Assets/images/sofa.fbx?url";
import plantFbx from "@Assets/images/plant.fbx?url";
import tableFbx from "@Assets/images/table.fbx?url";
import chairFbx from "@Assets/images/chair.fbx?url";
import { Suspense } from "react";
import { useLoader } from "@react-three/fiber";

const Mesh = () => {
  const sofa = useLoader(FBXLoader, sofaFbx);
  const plant = useLoader(FBXLoader, plantFbx);
  const table = useLoader(FBXLoader, tableFbx);

  return (
    <Suspense fallback={null}>
      <primitive object={sofa} scale={1.1} />
    </Suspense>
  );
};

export default Mesh;
