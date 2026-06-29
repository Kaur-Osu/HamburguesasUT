import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [carrito, setCarrito] = useState({});

  // =========================
  // FILTROS
  // =========================
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("todos");
  const [orden, setOrden] = useState("");

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products");

        console.log("📦 PRODUCTS:", response.data);

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
  // RATING
  // =========================
  const getAverageRating = (ratings = []) => {
    if (!Array.isArray(ratings) || ratings.length === 0) return 0;
    return ratings.reduce((a, r) => a + (r.value || 0), 0) / ratings.length;
  };

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
  // CARRITO
  // =========================
  const getId = (p) => p._id || p.name;

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
  // LIMPIAR FILTROS
  // =========================
  const limpiar = () => {
    setSearch("");
    setCategoria("todos");
    setOrden("");
  };

  // =========================
  // FILTRADO + ORDEN
  // =========================
  const productosProcesados = productos
    .filter((p) => {
      const matchSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCat =
        categoria === "todos" || p.category === categoria;

      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (orden === "precio-asc") return a.price - b.price;
      if (orden === "precio-desc") return b.price - a.price;
      if (orden === "nombre-asc") return a.name.localeCompare(b.name);
      if (orden === "nombre-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  // =========================
  // AGRUPAR
  // =========================
  const productosPorCategoria = productosProcesados.reduce(
    (acc, p) => {
      const cat = p.category || "otros";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(p);
      return acc;
    },
    {}
  );

  // =========================
  // PRODUCTO
  // =========================
  const renderProducto = (p) => {
    const id = getId(p);
    const rating = getAverageRating(p.rating);
    const cantidad = carrito[id] || 0;

    const sinStock = p.stock <= 0;

    return (
      <div key={id} className="producto-card">
        <img src={p.image} className="producto-img" />

        <div className="producto-body">
          <h3 className="producto-name">{p.name}</h3>

          <p className="producto-price">${p.price}</p>

          <p className="producto-extra">
            Categoría: {p.category}
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

        {/* =========================
            FILTROS BAR
        ========================= */}
        <div className="filtros-bar">

          <input
            className="search-input"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="todos">Mostrar todos</option>
            <option value="comida">Comida</option>
            <option value="bebidas">Bebidas</option>
            <option value="postres">Postres</option>
          </select>

          <select
            className="filter-select"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="">Sin ordenar</option>
            <option value="precio-asc">Precio ↓</option>
            <option value="precio-desc">Precio ↑</option>
            <option value="nombre-asc">Nombre A-Z</option>
            <option value="nombre-desc">Nombre Z-A</option>
          </select>

          <button className="clear-btn" onClick={limpiar}>
            Limpiar
          </button>
        </div>

        {/* ========================= */}
        {loading && <p className="productos-msg">Cargando...</p>}
        {error && <p className="productos-msg error">{error}</p>}

        {!loading &&
          !error &&
          Object.entries(productosPorCategoria).map(([cat, items]) => (
            <div key={cat}>
              <h2 className="categoria-title">
                {cat.toUpperCase()}
              </h2>

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