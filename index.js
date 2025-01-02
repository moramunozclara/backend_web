import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
import  conectarDB  from "./db.js";


// dotenv.config();

const servidor = express();
const PORT = process.env.PORT || 4000;

conectarDB(); // Conectar a la base de datos en MongoDB

// servidor.use(cors());
servidor.use(express.json());
// servidor.use("/api/items", itemRoutes);


// Ruta de prueba
servidor.get("/", (req, res) => {
    res.send(`Primera prueba de peticiones GET de mi CRUD`);
});

servidor.use(express.static("pruebas")); // Carpeta de pruebas con index.html temporal


servidor.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


