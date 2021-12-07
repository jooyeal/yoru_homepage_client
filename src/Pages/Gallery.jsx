import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Baseline from "../Components/Baseline";
import ImageCard from "../Components/ImageCard";
import Navbar from "../Components/Navbar";
import { AddBox } from "@mui/icons-material";
import { useHistory } from "react-router";
import { publicRequest } from "../requestApi";
import { useSelector } from "react-redux";
import { colorMode } from "../responsive";
import Loading from "../Components/Loading";

const Container = styled.div`
  ${({ mode }) => colorMode(mode)}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-bottom: 6rem; */
  ${({ mode }) => colorMode(mode)}
`;

const FooterNavbar = styled.div`
  width: 100vw;
  height: 5rem;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ mode }) => colorMode(mode)}
`;

const LoadingBox = styled.div`
  z-index: 100;
  position: fixed;
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  ${({ mode }) => colorMode(mode)}
`;

export default function Gallery() {
  const history = useHistory();
  const [photos, setPhotos] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode.colorMode);

  useEffect(() => {
    const getPhotos = async () => {
      const res = await publicRequest.get("photo/all");
      setPhotos(res.data);
      setIsLoading(false);
    };

    getPhotos();
  }, []);

  const onSubmitComment = async (id, username, comment) => {
    await publicRequest.put(`photo/addcomment/${id}`, {
      username,
      comment,
    });
    const res = await publicRequest.get("photo/all");
    setPhotos(res.data);
  };
  return (
    <Container>
      <Navbar />
      <Baseline />
      <Wrapper mode={mode}>
        {isLoading && (
          <LoadingBox mode={mode}>
            <Loading />
          </LoadingBox>
        )}
        {photos?.map((p, i) => (
          <ImageCard
            mode={mode}
            id={p._id}
            key={i}
            src={p.img}
            desc={p.desc}
            comments={p.comments}
            timeStamp={p.createdAt}
            onSubmitComment={onSubmitComment}
          />
        ))}
      </Wrapper>
      <FooterNavbar mode={mode}>
        {currentUser && (
          <AddBox
            style={{ fontSize: "48px" }}
            onClick={() => history.push("/galleryupload")}
          />
        )}
      </FooterNavbar>
    </Container>
  );
}
