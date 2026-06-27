import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const links = [
    {
      nombre: "Inicio",
      ruta: "/"
    },
    {
      nombre: "Menú",
      ruta: "/menu"
    },
    {
      nombre: "Carrito",
      ruta: "/carrito"
    },
    {
      nombre: "Login",
      ruta: "/login"
    }
  ];

  return (
    <div className="header-content">
      <Link to="/">
        <img
          src="/HamburguesasUT.png"
          alt="HamburguesasUT Logo"
          className="logo-img"
        />
      </Link>

      <nav className="navbar">
        <ul className="nav-links">

          {links.map((link) => (

            <li
              key={link.nombre}
              className={
                location.pathname === link.ruta
                  ? "active"
                  : ""
              }
            >

              <Link
                to={link.ruta}
                style={{
                  color: "inherit",
                  textDecoration: "none"
                }}
              >
                {link.nombre}
              </Link>

            </li>

          ))}

        </ul>

      </nav>

    </div>

  );
}

export default Navbar;