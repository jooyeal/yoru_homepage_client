import React from "react";
import styled from "styled-components";
import Baseline from "../Components/Baseline";
import Footer from "../Components/Footer";
import Introduce from "../Components/Introduce";
import Navbar from "../Components/Navbar";
import Photolist from "../Components/Photolist";
import Skill from "../Components/Skill";
import {
  ScrollContainer,
  ScrollPage,
  Animator,
  batch,
  Fade,
  FadeIn,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  ZoomIn,
} from "react-scroll-motion";
import { mobile, colorMode } from "../responsive";
import { useSelector } from "react-redux";

const Container = styled.div`
  ${mobile({ display: "flex", flexDirection: "column", alignItems: "center" })}
  ${({ mode }) => colorMode(mode)}
`;

const Wrapper = styled.div`
  ${mobile({ display: "flex", flexDirection: "column", alignItems: "center" })}
`;

export default function Home() {
  const mode = useSelector((state) => state.mode.colorMode);

  return (
    <Container mode={mode}>
      <Navbar />
      <Baseline />
      <ScrollContainer>
        <ScrollPage page={0}>
          <Wrapper>
            <Animator animation={batch(Fade())}>
              <Photolist />
            </Animator>
          </Wrapper>
        </ScrollPage>
        <ScrollPage page={1}>
          <Animator animation={batch(FadeIn(), Move(0, -200))}>
            <Introduce mode={mode} />
          </Animator>
        </ScrollPage>
        <ScrollPage page={2}>
          <Animator animation={batch(Fade(), Move(), Sticky())}>
            <Skill mode={mode} />
          </Animator>
        </ScrollPage>
        <ScrollPage page={3}>
          <Animator animation={batch(Move(0, -200))}>
            <Footer mode={mode} />
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </Container>
  );
}
