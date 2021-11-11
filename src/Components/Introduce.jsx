import React from "react";
import styled from "styled-components";
import { profileImage } from "../data";

const Container = styled.div`
  margin-top: 18px;
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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
`;

export default function Introduce() {
  return (
    <Container>
      <Picture>
        <Img src={profileImage.src} />
      </Picture>
      <Comment>
        <p style={{ lineHeight: "2.5rem" }}>
          Hello, My name is <b>Cha Juyeol</b>. I'm from South Korea and now
          living in Japan. I had been majored computer engineering and now
          working as a developer. I hope you to be interested in me. thank you.
        </p>
      </Comment>
    </Container>
  );
}
