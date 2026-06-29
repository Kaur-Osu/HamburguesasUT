import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [carrito, setCarrito] = useState({});

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products");
        console.log("📦 PRODUCTS RAW:", response.data);

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

  // =========================
  // ⭐ RATING PROMEDIO
  // =========================
  const getAverageRating = (ratings = []) => {
    if (!Array.isArray(ratings) || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + (r.value || 0), 0);
    return sum / ratings.length;
  };

  // =========================
  // ⭐ ESTRELLAS
  // =========================
  const Stars = ({ rating = 0 }) => (
    <div className="stars-container hover-big">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.min(Math.max(rating - (i - 1), 0), 1);

        return (
          <div key={i} className="star">
            <div className="star-empty">☆</div>
            <div className="star-filled" style={{ width: `${fill * 100}%` }}>
              ★
            </div>
          </div>
        );
      })}
    </div>
  );

  // =========================
  // 🛒 CARRITO
  // =========================
  const agregar = (id, stock) => {
    setCarrito((prev) => {
      const actual = prev[id] || 0;
      if (actual >= stock) return prev;
      return { ...prev, [id]: actual + 1 };
    });
  };

  const quitar = (id) => {
    setCarrito((prev) => {
      const actual = prev[id] || 0;

      if (actual <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }

      return { ...prev, [id]: actual - 1 };
    });
  };

  // =========================
  // 🧠 KEY SEGURA (IMPORTANTE)
  // =========================
  const getId = (p) => p._id || p.id || p.name;

  // =========================
  // 📦 AGRUPAR
  // =========================
  const productosPorCategoria = productos.reduce((acc, p) => {
    const cat = p.category || "otros";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  // =========================
  // 🧩 PRODUCTO
  // =========================
  const renderProducto = (p) => {
    const id = getId(p);

    const rating = getAverageRating(p.rating);
    const cantidad = carrito[id] || 0;
    const sinStock = p.stock <= 0;

    console.log("🧩 RENDER:", p.name, "ID:", id);

    return (
      <div key={id} className="producto-card">

        <img src={p.image} alt={p.name} className="producto-img" />

        <div className="producto-body">

          <h3 className="producto-name">{p.name}</h3>

          <p className="producto-price">${p.price}</p>

          <p className="producto-extra">
            <b>Categoría:</b> {p.category}
          </p>

          <Stars rating={rating} />

          <p className="producto-rating-text">
            Rating: {rating.toFixed(1)} / 5
          </p>

          <p className={`producto-stock ${sinStock ? "out-stock" : ""}`}>
            Stock: {p.stock}
          </p>

          {sinStock ? (
            <button className="producto-btn" disabled>
              SIN STOCK
            </button>
          ) : cantidad === 0 ? (
            <button
              className="producto-btn"
              onClick={() => agregar(id, p.stock)}
            >
              Agregar al carrito
            </button>
          ) : (
            <div className="cart-controls">
              <button onClick={() => quitar(id)}>-</button>
              <span>{cantidad}</span>
              <button onClick={() => agregar(id, p.stock)}>+</button>
            </div>
          )}

        </div>
      </div>
    );
  };

  return (
    <div className="hero-bg-wrapper">
      <Navbar />

      <div className="productos-container">
        <h1 className="productos-title">Menú</h1>

        {loading && <p className="productos-msg">Cargando productos...</p>}
        {error && <p className="productos-msg error">{error}</p>}

        {!loading && !error &&
          Object.entries(productosPorCategoria).map(([cat, items]) => (
            <div key={cat}>
              <h2 className="categoria-title">{cat.toUpperCase()}</h2>

              <div className="productos-grid">
                {items.map(renderProducto)}
              </div>
            </div>
          ))}
      </div>

      <FooterBar />
    </div>
  );
}

export default Productos;