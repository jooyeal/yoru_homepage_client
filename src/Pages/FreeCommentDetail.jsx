import React from "react";
import styled from "styled-components";
import Baseline from "../Components/Baseline";
import FreeCommentDetailBoard from "../Components/FreeCommentDetailBoard";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import { colorMode } from "../responsive";

const Container = styled.div`
  ${({ mode }) => colorMode(mode)}
`;

export default function FreeCommentDetail() {
  const mode = useSelector((state) => state.mode.colorMode);

  return (
    <Container mode={mode}>
      <Navbar />
      <Baseline />
      <FreeCommentDetailBoard mode={mode} />
    </Container>
  );
}
