import React from "react";
import styled from "styled-components";
import Baseline from "../Components/Baseline";
import FreeCommentDetailBoard from "../Components/FreeCommentDetailBoard";
import Navbar from "../Components/Navbar";

const Container = styled.div``;

export default function FreeCommentDetail() {
  return (
    <Container>
      <Navbar />
      <Baseline />
      <FreeCommentDetailBoard />
    </Container>
  );
}
