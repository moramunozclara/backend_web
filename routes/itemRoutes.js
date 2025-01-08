import { Router } from "express";
import { crearItem, leerItems, actualizarItem, borrarItem } from "../index.js";


const router = Router(); 

// Definir una ruta GET para obtener los items
router.get("/", async (req, res) => {
    try {
        const productos = await leerItems();
        // res.json({ mensaje: "Aquí están los productos" });
        res.status(200).json(productos); // status 200: éxito
        
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" }); // error en la API
    }

});

// Definir una ruta GET para obtener items por su id (item individual)
    

// Crear un producto
router.post("/", async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const nuevoProducto = await crearItem(name, description, price);
        res.status(201).json(nuevoProducto); // status 201: recurso creado

    } catch (error) {
        res.status(500).json({ error: "Error al crear el producto" }); // error en la API
    }
});

// Actualizar un producto individual
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        const productoActualizado = await actualizarItem(id, name, description, price);
        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el producto" }); // error en la API
    }
});

// Borrar un producto individual
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const productoEliminado = await borrarItem(id);
        res.status(200).json(productoEliminado); // status 200: éxito
    } catch (error) {
        res.status(500).json({ error: "Error al borrar el producto" }); // error en la API
    }
});

export default router;
