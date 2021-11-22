import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userRequest } from "../requestApi";
import { useHistory } from "react-router";

const Container = styled.div``;

const Wrapper = styled.div``;

const List = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
`;

const Sender = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-left: 20px;
`;

export default function ConversationList({ id }) {
  const [conversations, setConversations] = useState();
  const history = useHistory();
  
  useEffect(() => {
    const getAdminConversations = async () => {
      const res = await userRequest.get(`conversation/${id}`);
      setConversations(res.data);
    };
    getAdminConversations();
  }, []);

  return (
    <Container>
      <Wrapper>
        {conversations?.map((c, i) => (
          <List key={i} onClick={() => history.push(`/chat/${c._id}`)}>
            <Sender>{c.members[0]}</Sender>
          </List>
        ))}
      </Wrapper>
    </Container>
  );
}
