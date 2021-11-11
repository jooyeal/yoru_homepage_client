import { Mail, Phone } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { Instagram, GitHub } from "@mui/icons-material";

const Container = styled.div`
  margin-top: 18px;
  background-color: #e8eaf6;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Top = styled.div`
  font-weight: bold;
  font-size: 48px;
`;

const Main = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  height: 4rem;
  align-items: center;
`;

const Desc = styled.div`
  flex: 8;
  margin-left: 12px;
  font-size: 24px;
  font-weight: bold;
`;

export default function Footer() {
  return (
    <Container>
      <Top>Contact</Top>
      <Main>
        <Content>
          <Mail style={{ flex: 2, fontSize: "48px" }} />
          <Desc>jyol234@gmail.com</Desc>
        </Content>
        <Content>
          <Phone style={{ flex: 2, fontSize: "48px" }} />
          <Desc>070-4431-7266</Desc>
        </Content>
        <Content>
          <Instagram style={{ flex: 2, fontSize: "48px" }} />
          <Desc>yoru_cha</Desc>
        </Content>
        <Content>
          <GitHub style={{ flex: 2, fontSize: "48px" }} />
          <Desc>jooyeal</Desc>
        </Content>
      </Main>
    </Container>
  );
}
