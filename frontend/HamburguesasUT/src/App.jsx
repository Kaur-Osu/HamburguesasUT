import { Routes, Route } from "react-router-dom";

/*PAGINAS PRINCIPALES */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";


/*PAGINA ERROR */
import NotFound from "./pages/NotFound";

/*EXPORTAR RUTAS */
function App() {

    return (

        <Routes>

            {/* PUBLICAS */}

            {/* MODULO 1: INICIO */}
            <Route
                path="/"
                element={<Home />}
            />

            {/* MODULO 4: LOGIN */}
            <Route
                path="/login"
                element={<Login />}
            />

            {/* MODULO 2: CATALOGO */}
            <Route
                path="/menu"
                element={<Productos />}
            />

            {/* MODULO 3: CARRITO */}
            <Route
                path="/carrito"
                element={<Carrito />}
            />

            <Route
                path="*"
                element={<NotFound />}
            />
        </Routes>

    );

}

export default App;