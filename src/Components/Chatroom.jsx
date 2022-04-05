import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ConversationList from "./ConversationList";
import { useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import { useHistory } from "react-router";
import { publicRequest } from "../requestApi";
import { colorMode } from "../responsive";

const Container = styled.div`
  ${({ mode }) => colorMode(mode)}
`;

const VisitorForm = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  ${({ mode }) => colorMode(mode)}
`;

const EnterTheRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  height: 90vh;
  ${({ mode }) => colorMode(mode)}
`;

const EnterTheRoom = ({ mode, history, nickname }) => {
  const [conversation, setConversation] = useState();
  useEffect(() => {
    const getConversation = async () => {
      const res = await publicRequest.get(`conversation/${nickname}`);
      setConversation(res.data[0]._id);
    };
    getConversation();
  }, []);
  return (
    <EnterTheRoomContainer mode={mode}>
      <h2 style={{ textAlign: "center" }}>
        You are already have a talk enter the existing room?
      </h2>
      <Button
        style={{ fontSize: "36px" }}
        onClick={() => history.push(`/chat/${conversation}`)}
      >
        enter
      </Button>
    </EnterTheRoomContainer>
  );
};

export default function Chatroom({ mode }) {
  const history = useHistory();
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(false);
  const userId = useSelector((state) => state.user?.currentUser?.other?._id);

  const onEnter = async () => {
    if (nickname === "") {
      setError(true);
    } else {
      const res = await publicRequest.get(`/conversation/${nickname}`);
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
        history.push(`/chat/${res.data._id}`);
      }
    }
  };

  return (
    <Container mode={mode}>
      {userId ? (
        <ConversationList mode={mode} id={userId} />
      ) : localStorage.getItem("nickname") ? (
        <EnterTheRoom
          mode={mode}
          history={history}
          nickname={localStorage.getItem("nickname")}
        />
      ) : (
        <VisitorForm mode={mode}>
          <TextField
            required
            style={{ backgroundColor: "#f5f5f5" }}
            placeholder="Your name"
            variant="outlined"
            error={error}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Button size="large" variant="contained" onClick={onEnter}>
            ENTER
          </Button>
        </VisitorForm>
      )}
    </Container>
  );
}
