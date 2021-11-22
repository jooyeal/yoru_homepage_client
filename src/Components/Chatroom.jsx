import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ConversationList from "./ConversationList";
import { useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import { useHistory } from "react-router";
import { publicRequest } from "../requestApi";

const Container = styled.div``;

const VisitorForm = styled.div``;

const EnterTheRoomContainer = styled.div``;

const EnterTheRoom = ({ history, nickname }) => {
  const [conversation, setConversation] = useState();
  useEffect(() => {
    const getConversation = async () => {
      const res = await publicRequest.get(`conversation/${nickname}`);
      setConversation(res.data[0]._id);
    };
    getConversation();
  }, []);
  return (
    <EnterTheRoomContainer>
      You are already have a talk enter the existing room?
      <Button onClick={() => history.push(`/chat/${conversation}`)}>
        enter
      </Button>
    </EnterTheRoomContainer>
  );
};

export default function Chatroom() {
  const history = useHistory();
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(false);
  const userId = useSelector((state) => state.user?.currentUser?.other?._id);

  const onEnter = async () => {
    if (nickname === "") {
      setError(true);
    } else {
      const res = await publicRequest.get(`/conversation/${nickname}`);
      console.log(res);
      if (res.data === []) {
        setError(true);
      } else {
        const params = {
          senderId: nickname,
          receiverId: "617a980b1d33a7991e86a4ee",
        };
        const res = await publicRequest.post("/conversation", params);
        localStorage.setItem("nickname", nickname);
        setError(false);
      }
    }
  };

  return (
    <Container>
      {userId ? (
        <ConversationList id={userId} />
      ) : localStorage.getItem("nickname") ? (
        <EnterTheRoom
          history={history}
          nickname={localStorage.getItem("nickname")}
        />
      ) : (
        <VisitorForm>
          <TextField
            required
            label="Your name"
            variant="outlined"
            error={error}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Button variant="contained" onClick={onEnter}>
            ENTER
          </Button>
        </VisitorForm>
      )}
    </Container>
  );
}
