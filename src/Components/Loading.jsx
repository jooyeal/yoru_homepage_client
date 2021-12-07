import React from "react";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";

export default function Loading() {
  const mode = useSelector((state) => state.mode.colorMode);
  return (
    <ReactLoading
      type="bubbles"
      color={mode ? "#212121" : "#fafafa"}
      height="40%"
      width="40%"
    />
  );
}
