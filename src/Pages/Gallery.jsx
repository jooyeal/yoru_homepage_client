import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Baseline from "../Components/Baseline";
import ImageCard from "../Components/ImageCard";
import Navbar from "../Components/Navbar";
import { AddBox } from "@mui/icons-material";
import { photoData } from "../data";
import { useHistory } from "react-router";
import { publicRequest } from "../requestApi";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6rem;
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
`;

const LoadingBox = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
`;

export default function Gallery() {
  const history = useHistory();
  const [photos, setPhotos] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPhotos = async () => {
      const res = await publicRequest.get("photo/all");
      setPhotos(res.data);
      setIsLoading(false);
    };

    getPhotos();
  }, []);

  return (
    <Container>
      <Navbar />
      <Baseline />
      <Wrapper>
        {isLoading && <LoadingBox>loading...</LoadingBox>}
        {photos?.map((p) => (
          <ImageCard
            key={p.id}
            src={p.img}
            desc={p.desc}
            comments={p.comments}
            timeStamp={p.createdAt}
          />
        ))}
      </Wrapper>
      <FooterNavbar>
        <AddBox
          style={{ fontSize: "48px" }}
          onClick={() => history.push("/galleryupload")}
        />
      </FooterNavbar>
    </Container>
  );
}
