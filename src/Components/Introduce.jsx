import React from "react";
import styled from "styled-components";
import { profileImage } from "../data";
import { mobile, colorMode } from "../responsive";

const Container = styled.div`
  margin-top: 18px;
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  ${mobile({ flexDirection: "row", marginTop: "78px" })}
  ${({ mode }) => colorMode(mode)}
`;

const Picture = styled.div`
  border-radius: 50%;
  width: 50vw;
  height: 50vw;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Comment = styled.div`
  font-size: 22px;
  font-weight: 500;
  padding: 0 10px;
  ${mobile({ width: "50vw" })}
`;

export default function Introduce({ mode }) {
  return (
    <Container mode={mode}>
      <Picture>
        <Img src={profileImage.src} />
      </Picture>
      <Comment>
        Hello, My name is <b>Cha Juyeol</b>. I'm from South Korea and now living
        in Japan. I majored in computer science and am now working as a web
        developer. If you are interested in me, please to contact me
      </Comment>
    </Container>
  );
}
