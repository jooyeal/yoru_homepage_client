import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { publicRequest, userRequest } from "../requestApi";
import timeStampToDate from "../utils/timeStampToDate";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const Container = styled.div`
  width: 100vw;
  height: 89vh;
`;

const Top = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const CreatedTime = styled.div`
  width: 80vw;
  display: flex;
  justify-content: flex-start;
  font-weight: 600;
`;

const User = styled.div`
  width: 80vw;
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 20px;
`;

const Main = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.div`
  width: 80vw;
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 20px;
`;

const Desc = styled.div`
  width: 80vw;
  padding: 10px;
  height: 50vh;
  word-break: break-all;
  overflow: auto;
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-weight: 500;
  font-size: 18px;
`;

const Bottom = styled.div`
  margin-top: 30px;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export default function FreeCommentDetailBoard() {
  const {
    currentUser: {
      other: { isAdmin },
    },
  } = useSelector((state) => state.user);
  const { id: paramId } = useParams();
  const history = useHistory();
  const [post, setPost] = useState();

  useEffect(() => {
    const getPost = async () => {
      const res = await publicRequest.get(`post/${paramId}`);
      setPost(res.data);
    };
    getPost();
  }, []);

  const onDelete = async () => {
    const res = await userRequest.delete(`post/${paramId}`);
    history.push("/freecomment");
  };

  return (
    <Container>
      <Top>
        <CreatedTime>{post && timeStampToDate(post?.createdAt)}</CreatedTime>
        <User>USER: {post?.userId}</User>
      </Top>
      <Main>
        <Title>TITLE: {post?.title}</Title>
        <Desc>{post?.desc}</Desc>
      </Main>
      <Bottom>
        {isAdmin && (
          <Button variant="contained" size="large" onClick={onDelete}>
            Delete
          </Button>
        )}
      </Bottom>
    </Container>
  );
}
