import React, { useEffect, useState } from "react";
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
import Typist from "react-typist";
import ReactRotatingText from "react-rotating-text";
import { mobile, colorMode } from "../responsive";
import { useSelector } from "react-redux";

const Container = styled.div`
  ${mobile({ display: "flex", flexDirection: "column", alignItems: "center" })}
  ${({ mode }) => colorMode(mode)}
`;

const Top = styled.div`
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
              <Top>
                <Typist
                  avgTypingDelay={50}
                  cursor={{
                    show: false,
                    blink: false,
                    element: "|",
                    hideWhenDone: false,
                    hideWhenDoneDelay: 1000,
                  }}
                >
                  <h1 style={{ fontSize: "68px" }}> WELCOME TO YORU WORLD </h1>
                  <br />
                  <span style={{ fontWeight: "500" }}>
                    THIS WEBSITE IS MY PERSONAL PROJECT. AND IM STILL MODIFYING
                    IT. IF YOU HAVE ANY QUESTION PLEASE COMMENT TO FREECOMMENT
                  </span>
                </Typist>
                <h2 style={{ fontSize: "36px" }}>
                  <ReactRotatingText
                    items={[
                      "WEB DEVELOPER",
                      "FRONTEND",
                      "BACKEND",
                      "IZAKAYA GURUMET",
                    ]}
                  />
                </h2>
              </Top>
            </Animator>
          </Wrapper>
        </ScrollPage>
        <ScrollPage page={1}>
          <Wrapper>
            <Animator animation={batch(Fade())}>
              <Photolist />
            </Animator>
          </Wrapper>
        </ScrollPage>
        <ScrollPage page={2}>
          <Animator animation={batch(FadeIn(), Move(0, -200))}>
            <Introduce mode={mode} />
          </Animator>
        </ScrollPage>
        <ScrollPage page={3}>
          <Animator animation={batch(Fade(), Move(0, -50))}>
            <Skill mode={mode} />
          </Animator>
        </ScrollPage>
        <ScrollPage page={4}>
          <Animator animation={batch(Move(0, -200))}>
            <Footer mode={mode} />
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </Container>
  );
}
