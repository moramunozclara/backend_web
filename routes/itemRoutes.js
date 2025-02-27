import { Router } from "express";
import { crearItem, leerItems, actualizarItem, borrarItem } from "../index.js";
import Item from "../models/Item.js";



const router = Router(); 

// Definir una ruta GET para obtener los items
router.get("/items", async (req, res, next) => {
    try {
        const productos = await leerItems();
        // res.json({ mensaje: "Aquí están los productos" });
        res.status(200).json(productos); // status 200: éxito
        
    } catch (error) {
        next(error); // cada next aterriza en el middleware global de error definido en index.js
    }

});

// Definir una ruta GET para obtener items por su ID (ruta de item individual)
router.get("/items/:id", async (req, res, next) => {
    try {
        const { id } = req.params; // utiliza el ID del producto en la URL para buscarlo en la database
        const producto = await Item.findById(id); // busca el producto en la base de datos por su ID
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.status(200).json(producto); // status 200: éxito
    } catch (error) {
        next(error);
    }
})

// Crear un producto
router.post("/items", async (req, res, next) => {
    const { name, description, price, servicesList, type, imageUrl } = req.body;

    try {
        const nuevoProducto = await crearItem(name, description, price, servicesList, type, imageUrl  );
        res.status(201).json(nuevoProducto); // status 201: recurso creado

    } catch (error) {
        next(error);    
    }
});

// Actualizar un producto individual
router.put("/items/:id", async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, servicesList, type  } = req.body;
    try {
        const productoActualizado = await actualizarItem(id, name, description, price, servicesList, type );
        res.status(200).json(productoActualizado);  // status 200: éxito
    } catch (error) {
        next(error);    }
});

// Borrar un producto individual
router.delete("/items/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const productoEliminado = await borrarItem(id);
        res.status(200).json(productoEliminado); // status 200: éxito
    } catch (error) {
        next(error);    }
});

export default router;
