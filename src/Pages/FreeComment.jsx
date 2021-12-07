import React from "react";
import styled from "styled-components";
import Baseline from "../Components/Baseline";
import Board from "../Components/Board";
import Navbar from "../Components/Navbar";
import { postData } from "../data";
import { useSelector } from "react-redux";
import { colorMode } from "../responsive";

const Container = styled.div`
  ${({ mode }) => colorMode(mode)}
`;

export default function FreeComment() {
  const mode = useSelector((state) => state.mode.colorMode);

  return (
    <Container mode={mode}>
      <Navbar />
      <Baseline />
      <Board mode={mode} />
    </Container>
  );
}
