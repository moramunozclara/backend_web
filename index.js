import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
import  conectarDB  from "./db.js";
import Item from "./models/Item.js";


// dotenv.config();

const servidor = express();
const PORT = process.env.PORT || 4000;

conectarDB(); // Conectar a la base de datos en MongoDB

// servidor.use(cors());
servidor.use(express.json());
// servidor.use("/api/items", itemRoutes);


// // Ruta de prueba
// servidor.get("/", (req, res) => {
//     res.send(`Primera prueba de peticiones GET de mi CRUD`);
// });

// // Crear un item
export function crearItem(title, description) { // probar con crearItem();
    return new Promise(async (resolve, reject) => {
        try {

            const newItem = new Item({ title, description });
            const savedItem = await newItem.save();
            console.log("Nuevo item creado con éxito:", savedItem); //console.log para informes de éxito
            resolve(savedItem); // Devolver el item creado (para express)

        } catch (error) {
            console.error("Error al crear item:", error.message); //console.error para errores (solo en catch)
            reject("Error al crear el item"); 

        }
    });
}


// // Leer los items
export function leerItems() {
    return new Promise(async (resolve, reject) => {
        try { 

            const items = await Item.find(); // find para obtener todos los documentos
            console.log("Items en la base de datos:", items);
            resolve(items); // Devolver el item creado (para express)

        } catch (error) {
            console.error("Error al leer items:", error.message); //console.error para errores (solo en catch)
            reject("Error al leer los items"); // Devuelve el error
        }
    });
}

// // Actualizar un Item
export function actualizarItem(id, title, description) {
    return new Promise(async (resolve, reject) => {
        try {
            const nuevosDatos = { title, description }; // Datos a actualizar
            const itemActualizado = await Item.findByIdAndUpdate(id, nuevosDatos, 
            {
                new: true, // Documento actualizado
                runValidators: true, // Ejecuta las validaciones del esquema
            }
            );

            if (itemActualizado) { // si se actualiza correctamente:

                console.log("Item actualizado con éxito:", itemActualizado); // Mensaje positivo
                resolve(itemActualizado); // Devuelve el item actualizado para express

            } else {    // si no se encuentra el item:

                console.log("No se encontró el item con ID:", id);
                reject("No se encontró el item con el ID proporcionado"); // Devuelve el error

            }
        } catch (error) {
            console.error("Error al actualizar item:", error.message); //console.error para errores (solo en catch)
            reject("Error al actualizar el item"); // Devuelve el error
        }
    });
}

// // Borrar un item
export function borrarItem(id) { // borrar basado en su ID
    return new Promise(async (resolve, reject) => {
        try {

            const itemEliminado = await Item.findByIdAndDelete(id);

            if (itemEliminado) { // si se elimina el item correctamente:

                console.log("Item eliminado con éxito:", itemEliminado); // Mensaje de éxito
                resolve(itemEliminado); // Devuelve el item eliminado

            } else { // si no se encuentra el item:

                console.log("No se encontró el item con ID:", id);
                reject("No se encontró el item con el ID proporcionado"); // Devuelve el error

            }
        } catch (error) { 
            console.error("Error al borrar item:", error.message); // console.error para errores (solo en catch)
            reject("Error al borrar el item"); // Devuelve el error
        }
    });
}

servidor.use(express.static("pruebas")); // Carpeta de pruebas con index.html temporal


servidor.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


