import dotenv from "dotenv";
dotenv.config({ override: true });

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

//DESCOMENTAR CUANDO ESTEN LAS APIS
//app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
//app.use("/cart", cartRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});