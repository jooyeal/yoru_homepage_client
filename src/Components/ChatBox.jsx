import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useParams } from "react-router";
import { publicRequest } from "../requestApi";
import { io } from "socket.io-client";

const Container = styled.div``;

const Wrapper = styled.div`
  height: 89vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MessageBox = styled.div`
  height: 79vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: auto;
`;

const ChatField = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const SendMessage = styled.div`
  width: 100vw;
  display: flex;
  gap: 15px;
  justify-content: flex-end;
`;

const ReceiveMessage = styled.div`
  width: 100vw;
  display: flex;
  gap: 15px;
  justify-content: flex-start;
`;

const Name = styled.div`
  font-weight: bold;
`;

const Text = styled.div``;

export default function ChatBox({ sender, conversation }) {
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const [text, setText] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef(io("ws://yoru-home.herokuapp.com/"));
  const scrollRef = useRef();
  const thisConversation = conversation?.filter((c) => c._id === id);

  const onSubmitChat = async () => {
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
    setText("");
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
    <Container>
      <Wrapper>
        <MessageBox>
          {messages?.map((m, i) => (
            <div ref={scrollRef}>
              {m.sender === sender ? (
                <SendMessage key={i}>
                  <Text>{m.text}</Text>
                  <Name>{m.sender}</Name>
                </SendMessage>
              ) : (
                <ReceiveMessage key={i}>
                  <Name>{m.sender}</Name>
                  <Text>{m.text}</Text>
                </ReceiveMessage>
              )}
            </div>
          ))}
        </MessageBox>
        <ChatField>
          <TextField
            style={{ width: "80vw" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <IconButton size="large" onClick={onSubmitChat}>
            <Send />
          </IconButton>
        </ChatField>
      </Wrapper>
    </Container>
  );
}
