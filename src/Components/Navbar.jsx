import React, { useState } from "react";
import styled from "styled-components";
import { Menu } from "@mui/icons-material";
import Menulist from "./Menulist";

const Container = styled.div`
  display: flex;
  position: fixed;
  background-color: white;
  top: 0;
  width: 100%;
  height: 5rem;
  z-index: 99;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  flex: 9;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 18px;
  margin-right: 12px;
  font-weight: bold;
`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const onClickMenu = () => {
    setMenuOpen(true);
  };
  return (
    <Container>
      <Menulist open={menuOpen} setOpen={setMenuOpen} />
      <Left onClick={onClickMenu}>
        <Menu style={{ fontSize: "24px", marginLeft: "12px" }} />
      </Left>
      <Right>WELCOME TO YORU'S WORLD</Right>
    </Container>
  );
}
