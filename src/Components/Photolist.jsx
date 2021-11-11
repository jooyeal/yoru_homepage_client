import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { photoData } from "../data";

const Container = styled.div`
  width: 100vw;
  display: flex;
  overflow: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 0.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const Img = styled.img`
  width: 100vw;
  object-fit: cover;
`;

const Left = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 50%;
  margin-left: 12px;
  z-index: 20;
`;

const Right = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 50%;
  right: 0;
  margin-right: 12px;
  z-index: 20;
`;

export default function Photolist() {
  const [slideIndex, setSlideIndex] = useState(0);
  const onClickArrow = (type) => {
    if (type === "right") {
      setSlideIndex((prev) => (prev < photoData.length - 1 ? prev + 1 : 0));
    } else {
      setSlideIndex((prev) => (prev === 0 ? photoData.length - 1 : prev - 1));
    }
  };

  useEffect(() => {
    const autoIncrease = () =>
      setInterval(
        () =>
          setSlideIndex((prev) => (prev < photoData.length - 1 ? prev + 1 : 0)),
        5000
      );
    autoIncrease();
    return clearInterval(autoIncrease);
  }, []);
  return (
    <Container>
      <Left onClick={onClickArrow}>
        <ArrowLeftOutlined fontSize="large" />
      </Left>
      <Wrapper slideIndex={slideIndex}>
        {photoData.map((p) => (
          <Slide key={p.id}>
            <Img src={p.src} />
          </Slide>
        ))}
      </Wrapper>
      <Right onClick={() => onClickArrow("right")}>
        <ArrowRightOutlined fontSize="large" />
      </Right>
    </Container>
  );
}
