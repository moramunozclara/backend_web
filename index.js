import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import { conectar } from "./db.js";


dotenv.config();

const servidor = express();
const PORT = process.env.PORT || 4000;

servidor.use(cors());
servidor.use(express.json());


// Ruta de prueba
servidor.get("/", (req, res) => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

servidor.listen(process.env.PORT);