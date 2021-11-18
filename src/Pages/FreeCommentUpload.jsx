import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestApi";
import Baseline from "../Components/Baseline";
import Navbar from "../Components/Navbar";
import { useHistory } from "react-router";

const Container = styled.div`
  width: 100vw;
`;

const Main = styled.div`
  padding-top: 30px;
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export default function FreeCommentUpload() {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [userIdError, setUserIdError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);
  const history = useHistory();

  const resetIsError = () => {
    setUserIdError(false);
    setTitleError(false);
    setDescError(false);
  };

  const onClick = async () => {
    if (userId !== "" && title !== "" && desc !== "") {
      resetIsError();
      const params = { userId, title, desc };
      const res = await publicRequest.post("post/upload", params);
      history.push("/freecomment");
    } else {
      resetIsError();
      userId === "" && setUserIdError(true);
      title === "" && setTitleError(true);
      desc === "" && setDescError(true);
    }
  };

  return (
    <Container>
      <Navbar />
      <Baseline />
      <Main>
        <TextField
          style={{ width: "80%" }}
          required
          label="Your name"
          variant="outlined"
          error={userIdError}
          onChange={(e) => setUserId(e.target.value)}
        />
        <TextField
          style={{ width: "80%" }}
          required
          label="Title"
          variant="outlined"
          error={titleError}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          style={{ width: "80%" }}
          required
          multiline
          rows={10}
          label="Description"
          variant="outlined"
          error={descError}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Button variant="contained" size="large" onClick={onClick}>
          Submit
        </Button>
      </Main>
    </Container>
  );
}
