import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 100;
`;

const Top = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #d6d6d6;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  font-size: 24px;
  font-weight: 600;
`;

export default function Menulist({ open, setOpen }) {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  const onClickClose = () => {
    setOpen(false);
  };

  const onClickContent = (type) => {
    if (type === "top") {
      window.scrollTo({ top: 0 });
      setOpen(false);
    } else if (type === "introduce") {
      window.scrollTo({ top: window.innerHeight + 18 });
      setOpen(false);
    } else if (type === "skill") {
      window.scrollTo({ top: window.innerHeight * 2 + 18 });
      setOpen(false);
    } else if (type === "contact") {
      window.scrollTo({ top: window.innerHeight * 3 + 18 * 2 });
      setOpen(false);
    }
  };

  const onClickPushTo = (path) => {
    history.push(`${path}`);
    setOpen(false);
  };

  return open ? (
    <Container>
      <Top>
        <Close
          style={{ marginLeft: "12px" }}
          onClick={onClickClose}
          fontSize="large"
        />
      </Top>
      <Main>
        {pathname === "/" ? (
          <>
            <Content onClick={() => onClickContent("top")}>Top</Content>
            <Content onClick={() => onClickContent("introduce")}>
              Introduce
            </Content>
            <Content onClick={() => onClickContent("skill")}>Skill</Content>
            <Content onClick={() => onClickContent("contact")}>Contact</Content>
            <hr></hr>
            <Content onClick={() => onClickPushTo("/gallery")}>Gallery</Content>
            <Content onClick={() => onClickPushTo("/freecomment")}>
              Free Comment
            </Content>
            <Content onClick={() => onClickPushTo("/chat")}>Lets Talk</Content>
          </>
        ) : (
          <>
            <Content onClick={() => onClickPushTo("/")}>Home</Content>
            <Content onClick={() => onClickPushTo("/gallery")}>Gallery</Content>
            <Content onClick={() => onClickPushTo("/freecomment")}>
              Free Comment
            </Content>
            <Content onClick={() => onClickPushTo("/chat")}>Lets Talk</Content>
          </>
        )}
      </Main>
    </Container>
  ) : null;
}
