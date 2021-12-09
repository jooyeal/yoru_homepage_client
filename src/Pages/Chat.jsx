import React from "react";
import styled from "styled-components";
import Baseline from "../Components/Baseline";
import Chatroom from "../Components/Chatroom";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import { colorMode } from "../responsive";

const Container = styled.div`
  ${({ mode }) => colorMode(mode)}
`;

export default function Chat() {
  const mode = useSelector((state) => state.mode.colorMode);

  return (
    <Container mode={mode}>
      <Navbar />
      <Baseline />
      <Chatroom mode={mode} />
    </Container>
  );
}
