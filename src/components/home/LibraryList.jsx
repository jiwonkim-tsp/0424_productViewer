import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Mesh from "./Mesh";
import styled from "styled-components";
import color from "@Constants/color";
import example from "@Assets/images/example.png";

const LibraryList = () => {
  return (
    <$List>
      <img src={example} />
    </$List>
  );
};

export default LibraryList;

const $List = styled.div`
  width: 12vw;
  /* background-color: pink; */
  position: relative;
  padding: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 1.3vw;
    right: 0;
    height: 10vw;
    border: 1px solid ${color["grey"]};
  }
  img {
    width: 10vw;
  }
`;
