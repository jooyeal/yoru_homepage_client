import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import Baseline from "../Components/Baseline";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../store/apiCalls";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 5rem);
`;

const TextFieldWrapper = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  flex: 4;
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const onClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password }).then(history.push("/"));
  };

  return (
    <Container>
      <Navbar />
      <Baseline />
      <Wrapper>
        <TextFieldWrapper>
          <TextField
            style={{ marginBottom: "24px" }}
            id="user-id"
            label="USER ID"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="user-password"
            label="USER PASSWORD"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </TextFieldWrapper>
        <ButtonWrapper>
          <Button size="large" variant="contained" onClick={onClick}>
            LOG IN
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}
