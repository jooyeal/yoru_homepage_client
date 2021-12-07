import React, { useState } from "react";
import styled from "styled-components";
import { DarkMode, LightMode, Menu, MoreVert } from "@mui/icons-material";
import Menulist from "./Menulist";
import { IconButton } from "@mui/material";
import { Menu as MenuComp, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setColorMode, setLangMode } from "../store/modeSlice";
import { colorMode } from "../responsive";

const Container = styled.div`
  display: flex;
  position: fixed;
  background-color: white;
  top: 0;
  width: 100%;
  height: 5rem;
  z-index: 99;
  ${({ mode }) => colorMode(mode)}
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
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode.colorMode);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const moreOpen = Boolean(anchorEl);

  const onClickMenu = () => {
    setMenuOpen(true);
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
      <Left onClick={onClickMenu}>
        <Menu style={{ fontSize: "24px", marginLeft: "12px" }} />
      </Left>
      <Right>
        <div onClick={onClickMore}>
          <MoreVert />
        </div>
        <MenuComp anchorEl={anchorEl} open={moreOpen} onClose={onCloseMore}>
          <MenuItem onClick={() => onClickColorMode()}>
            {mode ? (
              <DarkMode fontSize="large" />
            ) : (
              <LightMode fontSize="large" />
            )}
          </MenuItem>
          <MenuItem onClick={() => onClickLang("jpn")}>JPN</MenuItem>
          <MenuItem onClick={() => onClickLang("kor")}>KOR</MenuItem>
          <MenuItem onClick={() => onClickLang("eng")}>ENG</MenuItem>
        </MenuComp>
      </Right>
    </Container>
  );
}
