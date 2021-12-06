import React from "react";
import styled from "styled-components";
import Baseline from "../Components/Baseline";
import Footer from "../Components/Footer";
import Introduce from "../Components/Introduce";
import Navbar from "../Components/Navbar";
import Photolist from "../Components/Photolist";
import Skill from "../Components/Skill";
import { mobile } from "../responsive";

const Container = styled.div`
  ${mobile({ display: "flex", flexDirection: "column", alignItems: "center" })}
`;

export default function Home() {
  return (
    <Container>
      <Navbar />
      <Baseline />
      <Photolist />
      <Introduce />
      <Skill />
      <Footer />
    </Container>
  );
}
