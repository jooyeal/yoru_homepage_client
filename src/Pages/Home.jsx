import React from "react";
import Baseline from "../Components/Baseline";
import Footer from "../Components/Footer";
import Introduce from "../Components/Introduce";
import Navbar from "../Components/Navbar";
import Photolist from "../Components/Photolist";
import Skill from "../Components/Skill";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Baseline />
      <Photolist />
      <Introduce />
      <Skill />
      <Footer />
    </div>
  );
}
