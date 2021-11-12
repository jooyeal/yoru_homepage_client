import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Gallery from "./Pages/Gallery";
import FreeComment from "./Pages/FreeComment";
import PostDetail from "./Pages/PostDetail";
import Login from "./Pages/Login";
import GalleryUpload from "./Pages/GalleryUpload";
import FreeCommentUpload from "./Components/FreeCommentUpload";

export default function App() {
  return (
    <div>
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
            <PostDetail />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/galleryupload" exact>
            <GalleryUpload />
          </Route>
          <Route path="/freecomment/upload">
            <FreeCommentUpload />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
