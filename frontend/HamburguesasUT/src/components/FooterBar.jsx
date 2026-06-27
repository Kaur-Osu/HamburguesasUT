import { useEffect, useState } from "react";
import {
  FaClock,
  FaPhone
} from "react-icons/fa";


function FooterBar() {


  return (
  <footer className="footer-bar">

    <div className="footer-top">

      {/* HORARIO */}
    <div className="footer-item"></div>
    <FaClock className="footer-icon" />
    <div>

      <h4>HORARIO</h4>

      <p>1:00 p.m. - 8:00 p.m.</p>

    </div>

      {/* TELÉFONOS */}

  <div className="footer-item">

    <FaPhone className="footer-icon" />

    <div>

      <h4>TELÉFONOS</h4>

      <p>Llámanos</p>

    </div>
    </div>

  </div>


      <div>

      {/* MAPA */}
      <div className="footer-mapa">
        <iframe
          title="Mapa HamburguesasUT"
          width="100%"
          height="200"
          style={{ border: 0, borderRadius: "8px" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=32.43808661574545,-114.71682816419917&z=18&output=embed"
        />

        <p className="footer-direccion">
          📍 {"Av. Jalisco, 83457 San Luis Río Colorado, Son."| "Dirección no disponible"}
        </p>
      </div>

    </div>

    <div className="footer-bottom">
      <img
        src="/HamburguesasUT.png"
        alt="HamburguesasUT"
        className="footer-logo"
      />

      <p>
        © {new Date().getFullYear()} HamburgesasUT.
        Todos los derechos reservados.
      </p>
    </div>

  </footer>
);

}

export default FooterBar;