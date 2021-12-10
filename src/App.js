import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Gallery from "./Pages/Gallery";
import FreeComment from "./Pages/FreeComment";
import FreeCommentDetail from "./Pages/FreeCommentDetail";
import Login from "./Pages/Login";
import GalleryUpload from "./Pages/GalleryUpload";
import FreeCommentUpload from "./Pages/FreeCommentUpload";
import Chat from "./Pages/Chat";
import ChatroomDetail from "./Pages/ChatroomDetail";

const Mobile = styled.div`
  width: 375px;
`;

export default function App() {
  const [width, setWidth] = useState(null);
  useEffect(() => {
    window.innerWidth > 768 && setWidth("375");
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/gallery" exact>
          <Gallery />
        </Route>
        <Route path="/freecomment" exact>
          <FreeComment />
        </Route>
        <Route path="/freecomment/:id" exact>
          <FreeCommentDetail />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/galleryupload" exact>
          <GalleryUpload />
        </Route>
        <Route path="/upload/freecomment" exact>
          <FreeCommentUpload />
        </Route>
        <Route path="/chat" exact>
          <Chat />
        </Route>
        <Route path="/chat/:id" exact>
          <ChatroomDetail />
        </Route>
      </Switch>
    </Router>
  );
}
