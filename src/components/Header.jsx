import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "@Assets/images/logo.png";
import color from "@Constants/color";

const navList = [
  { name: "Home", link: "/" },
  { name: "Maker", link: "/maker" },
  { name: "Transfer", link: "/transfer" },
  { name: "Fit", link: "/fit" },
  { name: "Catalog", link: "/catalog" },
];

const Header = () => {
  const [clicked, setClicked] = useState("Home");
  return (
    <>
      <$LogoBox>
        <img src={logo} alt="logo" />
      </$LogoBox>
      <$Nav>
        {navList.map((list) => (
          <$NavLi
            key={list.name}
            onClick={() => setClicked(list.name)}
            selected={clicked === list.name}
          >
            <Link to={list.link} selected={clicked === list.name}>
              {list.name}
            </Link>
          </$NavLi>
        ))}
      </$Nav>
    </>
  );
};

export default Header;

const $LogoBox = styled.div`
  width: 100vw;
  height: 4vw;
  background-color: ${color["black"]};
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 8vw;
  }
`;

const $Nav = styled.ul`
  display: flex;
  margin-left: 5vw;
`;

const $NavLi = styled.li`
  width: 6vw;
  height: 6vw;
  border-radius: 0 0 1vw 1vw;
  background-color: ${({ selected }) => (selected ? color["purple"] : "")};
  a {
    color: ${({ selected }) => (selected ? "white" : "black")};
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;
