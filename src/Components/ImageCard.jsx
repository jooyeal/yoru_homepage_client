import { FavoriteBorder } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  margin-bottom: 24px;
  box-sizing: border-box;
  padding-bottom: 18px;
`;

const Top = styled.div`
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 0 12px;
`;

const Attr = styled.div`
  margin-top: 18px;
`;

const Desc = styled.div`
  margin-top: 18px;
`;

const CommentWrapper = styled.div`
  margin-top: 18px;
`;

const Comment = styled.div`
  width: 100%;
  /* display: flex; */
  word-break: break-all;
  margin-bottom: 12px;
`;

const Id = styled.span`
  margin-right: 8px;
  font-weight: 700;
`;

const CDesc = styled.span``;

export default function ImageCard({ src, desc, comments, timeStamp }) {
  const timeStampToDate = (time) => {
    const splitedTime = time.split("-");
    const yearAndMonth = `${splitedTime[0]}年 ${splitedTime[1]}月`;
    const day = splitedTime[2].substring(0, 2);
    return `${yearAndMonth} ${day}日`;
  };

  return (
    <Container>
      <Top>{timeStampToDate(timeStamp)}</Top>
      <Img src={src} />
      <Content>
        {/* <Attr>
          <FavoriteBorder />
        </Attr> */}
        <Desc>{desc}</Desc>
        <CommentWrapper>
          {comments?.map((c) => (
            <Comment key={c.id}>
              <Id>{c.userId}</Id>
              <CDesc>{c.desc}</CDesc>
            </Comment>
          ))}
        </CommentWrapper>
      </Content>
    </Container>
  );
}
