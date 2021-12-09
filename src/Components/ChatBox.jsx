import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useParams } from "react-router";
import { publicRequest } from "../requestApi";
import { io } from "socket.io-client";
import { colorMode } from "../responsive";

const Container = styled.div`
  ${({ mode }) => colorMode(mode)}
`;

const Wrapper = styled.div`
  height: 89vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ mode }) => colorMode(mode)}
`;

const MessageBox = styled.div`
  height: 79vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: auto;
  ${({ mode }) => colorMode(mode)}
`;

const ChatField = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${({ mode }) => colorMode(mode)}
`;

const SendMessage = styled.div`
  width: 100vw;
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  ${({ mode }) => colorMode(mode)}
`;

const ReceiveMessage = styled.div`
  width: 100vw;
  display: flex;
  gap: 15px;
  justify-content: flex-start;
  ${({ mode }) => colorMode(mode)}
`;

const Name = styled.div`
  font-weight: bold;
`;

const Text = styled.div``;

export default function ChatBox({ mode, sender, conversation }) {
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const [text, setText] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef(io("ws://yoru-home.herokuapp.com/"));
  const scrollRef = useRef();
  const thisConversation = conversation?.filter((c) => c._id === id);

  const onSubmitChat = async () => {
    setText("");

    const params = { conversationId: id, sender: sender, text };

    const receiverId = thisConversation[0].members.find(
      (member) => member !== sender
    );

    socket.current.emit("sendMessage", {
      senderId: sender,
      receiverId,
      text,
    });

    const res = await publicRequest.post("/message", params);
    setMessages([...messages, res.data]);
  };

  useEffect(() => {
    socket.current = io("ws://yoru-home.herokuapp.com/");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      thisConversation[0].members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    console.log(messages);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current?.emit("addUser", sender);
    socket.current?.on("getUsers", (users) => {
      console.log(users);
    });
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      const res = await publicRequest.get(`message/${id}`);
      setMessages(res.data);
    };
    getMessages();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container mode={mode}>
      <Wrapper mode={mode}>
        <MessageBox mode={mode}>
          {messages?.map((m, i) => (
            <div ref={scrollRef}>
              {m.sender === sender ? (
                <SendMessage key={i} mode={mode}>
                  <Text>{m.text}</Text>
                  <Name>{m.sender}</Name>
                </SendMessage>
              ) : (
                <ReceiveMessage key={i} mode={mode}>
                  <Name>{m.sender}</Name>
                  <Text>{m.text}</Text>
                </ReceiveMessage>
              )}
            </div>
          ))}
        </MessageBox>
        <ChatField mode={mode}>
          <TextField
            style={{ width: "80vw", backgroundColor: "#f5f5f5" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Send size="large" onClick={onSubmitChat} />
        </ChatField>
      </Wrapper>
    </Container>
  );
}
