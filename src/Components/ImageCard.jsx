import {
  Article,
  CommentOutlined,
  Create,
  FavoriteBorder,
} from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { photoData } from "../data";
import { publicRequest } from "../requestApi";

const Container = styled.div`
  width: 100vw;
  margin-bottom: 24px;
  box-sizing: border-box;
  padding-bottom: 18px;
`;

const Top = styled.div`
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 0 12px;
`;

const Attr = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 18px;
  padding-right: 24px;
`;

const Desc = styled.div`
  margin-top: 18px;
  font-weight: 700;
`;

const CommentWrapper = styled.div`
  margin-top: 18px;
`;

const CommentsContainer = styled.div`
  width: 100%;
  max-height: 30vh;
  overflow-y: scroll;
`;

const Comment = styled.div`
  width: 100%;
  /* display: flex; */
  word-break: break-all;
  margin-bottom: 12px;
`;

const AddComment = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Id = styled.span`
  margin-right: 8px;
  font-weight: 700;
`;

const CDesc = styled.span``;

export default function ImageCard({ id, src, desc, comments, timeStamp }) {
  const [toggle, setToggle] = useState(false);
  const [username, setUsername] = useState();
  const [comment, setComment] = useState();

  const timeStampToDate = (time) => {
    const splitedTime = time.split("-");
    const yearAndMonth = `${splitedTime[0]}年 ${splitedTime[1]}月`;
    const day = splitedTime[2].substring(0, 2);
    return `${yearAndMonth} ${day}日`;
  };

  const onClickToCommentSubmit = () => {
    publicRequest
      .put(`photo/addcomment/${id}`, {
        username,
        comment,
      })
      .then(() => window.location.reload());
  };

  return (
    <Container>
      <Top>{timeStampToDate(timeStamp)}</Top>
      <Img src={src} />
      <Content>
        <Attr>
          <Article
            onClick={() => setToggle(false)}
            style={{ fontSize: "48px" }}
          />
          <CommentOutlined
            onClick={() => setToggle(true)}
            style={{ fontSize: "48px" }}
          />
        </Attr>
        {!toggle ? (
          <Desc>{desc}</Desc>
        ) : (
          <CommentWrapper>
            <CommentsContainer>
              {comments?.map((c) => (
                <Comment key={c.id}>
                  <Id>{c.username}</Id>
                  <CDesc>{c.comment}</CDesc>
                </Comment>
              ))}
            </CommentsContainer>
            <AddComment>
              <TextField
                placeholder="your name"
                style={{ flex: "3" }}
                size="small"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                placeholder="comment..."
                style={{ flex: "6" }}
                size="small"
                variant="outlined"
                onChange={(e) => setComment(e.target.value)}
              />
              <Create style={{ flex: "1" }} onClick={onClickToCommentSubmit} />
            </AddComment>
          </CommentWrapper>
        )}
      </Content>
    </Container>
  );
}
