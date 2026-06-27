import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";


function Carrito() {
  return (
    <div className="carrito">
 
<div className="hero-bg-wrapper">
  <Navbar />
  <section className="hero-bg">
    <div className="hero-bg-container">
        <p>CARRITO</p>
    </div>
  </section>
</div>      

    <FooterBar />
    </div>
  );

}

export default Carrito;