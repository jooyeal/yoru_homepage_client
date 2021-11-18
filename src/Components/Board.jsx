import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { AddBox } from "@mui/icons-material";
import { publicRequest } from "../requestApi";

const Container = styled.div``;

const Top = styled.div`
  display: flex;
  top: 5rem;
  position: fixed;
  align-items: center;
  background-color: #fff;
  width: 100vw;
  height: 12vh;
  border-bottom: 0.5px solid #c5c5c5;
  font-size: 24px;
  font-weight: bold;
`;

const Id = styled.div`
  width: 10vw;
  display: block;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
`;

const Title = styled.div`
  width: 50vw;
  display: block;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
`;

const User = styled.div`
  width: 40vw;
  display: block;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
`;

const Main = styled.div`
  margin-top: 5rem;
`;

const Post = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
  font-size: 24px;
  font-weight: 500;
  border-bottom: 0.3px solid #dfdddd;
  gap: 10px;
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

const Nothing = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 28px;
`;

export default function Board() {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  const onClickToDetail = (id) => {
    history.push(`/freecomment/${id}`);
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await publicRequest.get("post/");
      setPosts(res.data);
    };
    getPost();
  }, []);
  return (
    <Container>
      <Top>
        <Id>NO</Id>
        <Title type="bar">TITLE</Title>
        <User type="bar">USER</User>
      </Top>
      {posts.length !== 0 ? (
        <Main>
          {posts.map((p, i) => (
            <Post key={p._id} onClick={() => onClickToDetail(p._id)}>
              <Id>{i + 1}</Id>
              <Title>{p.title}</Title>
              <User>{p.userId}</User>
            </Post>
          ))}
        </Main>
      ) : (
        <Nothing>Post does not exist</Nothing>
      )}
      <FooterNavbar>
        <AddBox
          style={{ fontSize: "48px" }}
          onClick={() => history.push("/upload/freecomment")}
        />
      </FooterNavbar>
    </Container>
  );
}
