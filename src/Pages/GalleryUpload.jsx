import { Add } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import Baseline from "../Components/Baseline";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import { userRequest } from "../requestApi";

const Container = styled.div``;

const PhotoSelectBox = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  align-items: center;
  margin-bottom: 28px;
`;

const EmptyPhoto = styled.div`
  background-color: #cecece;
  opacity: 0.5;
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
`;

const Img = styled.img`
  width: 100vw;
`;

const LoadingBox = styled.div`
  position: fixed;
  top: 5vh;
  width: 100vw;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
`;

export default function GalleryUpload() {
  const [img, setImg] = useState();
  const [desc, setDesc] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const inputFile = useRef();
  const {
    currentUser: {
      other: { _id: userId },
    },
  } = useSelector((state) => state.user);

  const onClickPhotoSelector = (e) => {
    inputFile.current.click();
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onChangeImage = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImg(base64);
  };

  const onSubmit = async (e) => {
    const loadingAnimationPromise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1500);
    });
    const params = {
      userId: userId,
      desc: desc,
      img: img,
    };
    setIsLoading(true);
    const res = await userRequest
      .post("photo/upload", params)
      .then(() => loadingAnimationPromise.then(() => setIsLoading(false)));
    console.log(res);
  };

  return (
    <Container>
      <Navbar />
      <Baseline />
      {isLoading && <LoadingBox>loading...</LoadingBox>}
      <PhotoSelectBox onClick={onClickPhotoSelector}>
        <input
          ref={inputFile}
          type="file"
          id="file"
          name="file"
          onChange={onChangeImage}
          style={{ display: "none" }}
        />
        {img ? (
          <Img src={img} />
        ) : (
          <EmptyPhoto>
            <Add style={{ fontSize: "128px", color: "white" }} />
          </EmptyPhoto>
        )}
      </PhotoSelectBox>
      <CommentInputBox>
        <TextField
          style={{ width: "90%" }}
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={6}
          placeholder="something new!"
          onChange={(e) => setDesc(e.target.value)}
        />
      </CommentInputBox>
      <SubmitBox>
        <Button onClick={onSubmit} variant="contained">
          Submit
        </Button>
      </SubmitBox>
    </Container>
  );
}
