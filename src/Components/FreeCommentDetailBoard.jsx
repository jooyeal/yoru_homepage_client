import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { publicRequest, userRequest } from "../requestApi";
import timeStampToDate from "../utils/timeStampToDate";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";

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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Comments = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 30vh;
  overflow-y: scroll;
`;

const Comment = styled.div`
  width: 80%;
  margin-top: 20px;
  /* display: flex; */
  word-break: break-all;
  margin-bottom: 12px;
`;

const Id = styled.span`
  margin-right: 8px;
  font-weight: bold;
`;

const CDesc = styled.span``;

const CommentForm = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export default function FreeCommentDetailBoard() {
  const isAdmin = useSelector(state=>state.user?.currentUser?.other.isAdmin)
  const { id: paramId } = useParams();
  const history = useHistory();
  const [post, setPost] = useState();
  const [showComment, setShowComment] = useState(false);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");

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

  const onClickComment = () => {
    setShowComment((prev) => !prev);
  };

  const onSubmit = async () => {
    if (username !== "" && comment !== "") {
      const params = {
        userId: username,
        desc: comment,
      };
      const res = await publicRequest.put(`post/addcomment/${paramId}`, params);
      if (res.status === 200) {
        const res = await publicRequest.get(`post/${paramId}`);
        setPost(res.data);
        setShowComment(false);
        setUsername("");
        setComment("");
      }
    } else {
      // TODO: error
      console.log("error");
    }
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
      <Comments>
        {post?.comments.map((c) => (
          <Comment key={c.id}>
            <Id>{c.userId}</Id>
            <CDesc>{c.desc}</CDesc>
          </Comment>
        ))}
      </Comments>
      <Bottom>
        {showComment && (
          <CommentForm>
            <TextField
              required
              label="NAME"
              size="large"
              style={{ width: "70vw" }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              required
              label="COMMENT"
              multiline
              rows={10}
              size="large"
              style={{ width: "70vw" }}
              onChange={(e) => setComment(e.target.value)}
            />
          </CommentForm>
        )}
        {showComment && (
          <Button
            variant="contained"
            style={{ width: "25vw" }}
            color="secondary"
            onClick={onSubmit}
          >
            submit
          </Button>
        )}
        <Button
          variant="contained"
          style={{ width: "25vw" }}
          onClick={onClickComment}
        >
          {showComment ? "cancel" : "comment"}
        </Button>
        {isAdmin && (
          <Button
            variant="contained"
            style={{ width: "25vw" }}
            onClick={onDelete}
            color="error"
          >
            Delete
          </Button>
        )}
      </Bottom>
    </Container>
  );
}
