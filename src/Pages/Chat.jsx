import React from "react";
import styled from "styled-components";
import Baseline from "../Components/Baseline";
import Chatroom from "../Components/Chatroom";
import Navbar from "../Components/Navbar";

const Container = styled.div``;

export default function Chat() {
  return (
    <Container>
      <Navbar />
      <Baseline />
      <Chatroom />
    </Container>
  );
}
