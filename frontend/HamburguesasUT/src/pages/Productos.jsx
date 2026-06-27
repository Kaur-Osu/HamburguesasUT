import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";


function Productos() {
  return (
    <div className="MENU">
 
<div className="hero-bg-wrapper">
  <Navbar />
  <section className="hero-bg">
    <div className="hero-bg-container">
        <p>PRODUCTOS</p>
    </div>
  </section>
</div>      

    <FooterBar />
    </div>
  );

}

export default Productos;