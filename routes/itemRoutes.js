import { Router } from "express";

const router = Router();

// Definir una ruta GET para obtener los items
router.get("/", (req, res) => {
    res.json({ mensaje: "Aquí estarán los productos" });
});

export default router;
