import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faNode,
  faJsSquare,
  faPython,
} from "@fortawesome/free-brands-svg-icons";
import { skillComment } from "../data";
import { colorMode } from "../responsive";

const Container = styled.div`
  margin-top: 18px;
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  ${({ mode }) => colorMode(mode)}
`;

const Top = styled.div`
  font-size: 32px;
  font-weight: 600;
`;

const Main = styled.div``;

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const Break = styled.div`
  flex-basis: 100%;
  height: 18px;
  width: 0;
`;

const Circle = styled.div`
  width: ${(props) => (props.selected ? "110px" : "75px")};
  height: ${(props) => (props.selected ? "110px" : "75px")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #000; */
  ${({ mode }) => colorMode(!mode)}
`;

export default function Skill({ mode }) {
  const [selected, setSelected] = useState(0);

  const onClick = (type) => {
    if (type === "react") {
      setSelected(0);
    } else if (type === "node") {
      setSelected(1);
    } else if (type === "js") {
      setSelected(2);
    }
  };
  return (
    <Container mode={mode}>
      <Top>My Skilltech</Top>
      <Main>{skillComment[selected].desc}</Main>
      <Footer>
        <Circle
          mode={mode}
          selected={selected === 0 ? true : false}
          onClick={() => onClick("react")}
        >
          <FontAwesomeIcon
            icon={faReact}
            color="#29B6F6"
            size={selected === 0 ? "5x" : "3x"}
          />
        </Circle>
        <Circle
          mode={mode}
          selected={selected === 1 ? true : false}
          onClick={() => onClick("node")}
        >
          <FontAwesomeIcon
            icon={faNode}
            color="#81C784"
            size={selected === 1 ? "5x" : "3x"}
          />
        </Circle>
        <Circle
          mode={mode}
          selected={selected === 2 ? true : false}
          onClick={() => onClick("js")}
        >
          <FontAwesomeIcon
            icon={faJsSquare}
            color="#FFEE58"
            size={selected === 2 ? "5x" : "3x"}
          />
        </Circle>
      </Footer>
    </Container>
  );
}
