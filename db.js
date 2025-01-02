import mongoose from "mongoose";
import dotenv from "dotenv";
// import postgres from "postgres";

dotenv.config();

// crear una conexión
function conectarDB() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(conexion => {
        console.log(`MongoDB conectado correctamente: ${conexion.connection.host}`);
    })
    .catch(error => {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1); // Finaliza el proceso si hay un error crítico
    });
}


export default conectarDB;
