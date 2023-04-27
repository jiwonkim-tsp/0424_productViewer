import NanumSquare from "@Assets/font/NanumSquare.woff";
import NanumSquareTtf from "@Assets/font/NanumSquare.ttf";
import NanumSquareR from "@Assets/font/NanumSquareR.woff";
import NanumSquareRTtf from "@Assets/font/NanumSquareR.ttf";
import NanumSquareL from "@Assets/font/NanumSquareL.woff";
import NanumSquareLTtf from "@Assets/font/NanumSquareL.ttf";
import NanumSquareB from "@Assets/font/NanumSquareB.woff";
import NanumSquareBTtf from "@Assets/font/NanumSquareB.ttf";
import NanumSquareEB from "@Assets/font/NanumSquareEB.woff";
import NanumSquareEBTtf from "@Assets/font/NanumSquareEB.ttf";
import { createGlobalStyle } from "styled-components";
import ResetStyle from "./resetStyle";
import color from "@Constants/color";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GlobalStyle = createGlobalStyle`
  ${ResetStyle}

  @font-face {
    font-family: 'NanumSquare';
    src: url(${NanumSquare}) format('woff'), url(${NanumSquareTtf}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    /* cursor: url(images/mouse-cursor.png) 2 2, auto; */
  }
  html {
  }
  body {
    background-color: ${color["grey"]};
    width: 100%;
    min-height: 100vh;
    font-family:'NanumSquare';
    overflow: hidden;
  }
`;

export default GlobalStyle;
