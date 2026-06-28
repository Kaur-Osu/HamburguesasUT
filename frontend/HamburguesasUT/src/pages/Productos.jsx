import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products");
        setProductos(response.data);

      } catch (err) {
        console.error(err);
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // 🔥 Agrupar por categoría
  const productosPorCategoria = productos.reduce((acc, producto) => {
    const cat = producto.category || "otros";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(producto);
    return acc;
  }, {});

  const renderProducto = (p, index) => (
    <div key={index} className="producto-card">

      <img src={p.image} alt={p.name} className="producto-img" />

      <h3>{p.name}</h3>

      {/* mostrar todos los datos menos id */}
      <div className="producto-info">
        <p><b>Precio:</b> ${p.price}</p>




        <p><b>Descripción:</b> {p.description}</p>

        {p.includes && (
          <p><b>Incluye:</b> {p.includes}</p>
        )}
      </div>

      <button className="producto-btn">
        Agregar al carrito
      </button>
    </div>
  );

  return (
    <div className="hero-bg-wrapper">
      <Navbar />

      <div className="productos-container">
        <h1 className="productos-title">Menú</h1>

        {loading && <p className="productos-msg">Cargando productos...</p>}
        {error && <p className="productos-msg error">{error}</p>}

        {!loading && !error && (
          Object.entries(productosPorCategoria).map(([categoria, items]) => (
            <div key={categoria} className="categoria-section">

              <h2 className="categoria-title">
                {categoria.toUpperCase()}
              </h2>

              <div className="productos-grid">
                {items.map(renderProducto)}
              </div>

            </div>
          ))
        )}

      </div>

      <FooterBar />
    </div>
  );
}

export default Productos;