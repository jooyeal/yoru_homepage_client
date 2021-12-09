import React, { useState } from "react";
import styled from "styled-components";
import { DarkMode, LightMode, Menu, MoreVert } from "@mui/icons-material";
import Menulist from "./Menulist";
import { IconButton } from "@mui/material";
import { Menu as MenuComp, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setColorMode, setLangMode } from "../store/modeSlice";
import { colorMode } from "../responsive";
import UseAnimation from "react-useanimations";
import AnimatedMenu from "react-useanimations/lib/menu2";

const Container = styled.div`
  display: flex;
  position: fixed;
  background-color: white;
  top: 0;
  width: 100%;
  height: 5rem;
  z-index: 101;
  ${({ mode }) => colorMode(mode)}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  filter: ${({ mode }) =>
    !mode
      ? "invert(0%) sepia(34%) saturate(796%) hue-rotate(9deg) brightness(92%) contrast(104%)"
      : "invert(100%) sepia(1%) saturate(1608%) hue-rotate(327deg) brightness(112%) contrast(92%)"};
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
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode.colorMode);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const moreOpen = Boolean(anchorEl);

  const onClickMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const onClickMore = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseMore = () => {
    setAnchorEl(null);
  };

  const onClickColorMode = () => {
    dispatch(setColorMode());
    setAnchorEl(null);
  };

  const onClickLang = (lang) => {
    dispatch(setLangMode(lang));
    setAnchorEl(null);
  };

  return (
    <Container mode={mode}>
      <Menulist mode={mode} open={menuOpen} setOpen={setMenuOpen} />
      <Left mode={mode} onClick={onClickMenu}>
        {/* <Menu style={{ fontSize: "24px", marginLeft: "12px" }} /> */}
        <UseAnimation
          reverse={menuOpen}
          // onClick={onClickMenu}
          size={50}
          animation={AnimatedMenu}
        />
      </Left>
      <Right>
        <div onClick={onClickMore}>
          <MoreVert fontSize="large" />
        </div>
        <MenuComp anchorEl={anchorEl} open={moreOpen} onClose={onCloseMore}>
          <MenuItem onClick={() => onClickColorMode()}>
            {mode ? (
              <DarkMode fontSize="large" />
            ) : (
              <LightMode fontSize="large" />
            )}
          </MenuItem>
          {/* <MenuItem onClick={() => onClickLang("jpn")}>JPN</MenuItem>
          <MenuItem onClick={() => onClickLang("kor")}>KOR</MenuItem>
          <MenuItem onClick={() => onClickLang("eng")}>ENG</MenuItem> */}
        </MenuComp>
      </Right>
    </Container>
  );
}
