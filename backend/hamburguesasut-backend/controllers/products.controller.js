import * as storeService from "../services/store.service.js";

export const getProducts = async (req, res) => {

    try {

        const products = await storeService.getProducts();

        res.json(products);

    } catch (error) {
    console.log("ERROR REAL:", error.message);

    res.status(500).json({
        mensaje: "Error al obtener productos",
        error: error.message
    });


    }

};