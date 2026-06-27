import React, { useState } from "react";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import { Link } from "react-router-dom";


function Home() {
  const [active, setActive] = useState("Inicio");
  const links = ["Inicio", "Menú", "Ubicación", "Contacto"];

  return (
    <div className="home">
      

  
<div className="hero-bg-wrapper">
  <Navbar />
  <section className="hero-bg">
    <div className="hero-bg-container">
        <p>HOME</p>
    </div>
  </section>
</div>      

    <FooterBar />
    </div>
  );
}

export default Home;
