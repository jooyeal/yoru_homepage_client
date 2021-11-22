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

const LoadingBox = styled.div`
  z-index: 100;
  position: fixed;
  top: 5vh;
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
`;

export default function ImageCard({
  id,
  src,
  desc,
  comments,
  timeStamp,
  onSubmitComment,
}) {
  const [toggle, setToggle] = useState(false);
  const [username, setUsername] = useState();
  const [comment, setComment] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const timeStampToDate = (time) => {
    const splitedTime = time.split("-");
    const yearAndMonth = `${splitedTime[0]}年 ${splitedTime[1]}月`;
    const day = splitedTime[2].substring(0, 2);
    return `${yearAndMonth} ${day}日`;
  };

  const onClickToCommentSubmit = async () => {
    setIsLoading(true);
    await onSubmitComment(id, username, comment);
    setUsername("");
    setComment("");
    setIsLoading(false);
  };

  return (
    <Container>
      {isLoading && <LoadingBox>loading...</LoadingBox>}
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
              {comments?.map((c, i) => (
                <Comment key={i}>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                placeholder="comment..."
                style={{ flex: "6" }}
                size="small"
                variant="outlined"
                value={comment}
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
