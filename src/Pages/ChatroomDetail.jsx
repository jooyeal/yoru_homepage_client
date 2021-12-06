import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import Navbar from "../Components/Navbar";
import Baseline from "../Components/Baseline";
import ChatBox from "../Components/ChatBox";
import { publicRequest } from "../requestApi";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";

const Container = styled.div``;

const Wrapper = styled.div``;

export default function ChatroomDetail() {
  const [conversation, setConversation] = useState([]);
  const { id } = useParams();
  const userId = useSelector((state) => state.user?.currentUser?.other?._id);

  useEffect(() => {
    const getConversation = async () => {
      const res = await publicRequest.get(
        `conversation/${userId ?? localStorage.getItem("nickname")}`
      );
      setConversation(res.data);
    };

    getConversation();
  }, []);

  console.log(conversation);

  return (
    <Container>
      <Navbar />
      <Baseline />
      <ChatBox
        // messages={messages}
        conversation={conversation}
        userId={userId}
        sender={userId ?? localStorage.getItem("nickname")}
      />
    </Container>
  );
}
