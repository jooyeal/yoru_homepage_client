import React from "react";
import styled from "styled-components";
import Baseline from "../Components/Baseline";
import Board from "../Components/Board";
import Navbar from "../Components/Navbar";
import { postData } from "../data";

const Container = styled.div``;

export default function FreeComment() {
  return (
    <Container>
      <Navbar />
      <Baseline />
      <Board />
    </Container>
  );
}
