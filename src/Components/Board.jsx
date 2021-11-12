import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { AddBox } from "@mui/icons-material";

const Container = styled.div``;

const Top = styled.div`
  display: flex;
  top: 5rem;
  position: fixed;
  background-color: #fff;
  width: 100vw;
  height: 12vh;
  border-bottom: 0.5px solid #c5c5c5;
  font-size: 24px;
  font-weight: bold;
`;

const Id = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const User = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  margin-top: 5rem;
`;

const Post = styled.div`
  display: flex;
  height: 20vh;
  font-size: 24px;
  font-weight: 500;
  border-bottom: 0.3px solid #dfdddd;
`;

const FooterNavbar = styled.div`
  width: 100vw;
  height: 5rem;
  position: sticky;
  bottom: 0;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Board({ postData }) {
  const history = useHistory();

  const onClickToDetail = (id) => {
    history.push(`/freecomment/${id}`);
  };

  return (
    <Container>
      <Top>
        <Id>ID</Id>
        <Title>TITLE</Title>
        <User>USER</User>
      </Top>
      <Main>
        {postData.map((p) => (
          <Post key={p.id} onClick={() => onClickToDetail(p.id)}>
            <Id>{p.id}</Id>
            <Title>{p.title}</Title>
            <User>{p.userId}</User>
          </Post>
        ))}
      </Main>
      <FooterNavbar>
        <AddBox
          style={{ fontSize: "48px" }}
          onClick={() => history.push("/freecomment/upload")}
        />
      </FooterNavbar>
    </Container>
  );
}
