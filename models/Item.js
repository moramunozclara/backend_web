import mongoose from "mongoose";

// Esquema de cada item de la DB
const itemSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        unique: true // cada título tendrá que ser diferente, también en las pruebas ( o dará error)
    },
    description: { 
        type: String }
},
{ timestamps: true, // timestamps: true agrega createdAt y updatedAt
    strict:false // strict:false me permite usar campos adicionales
});

const Item = mongoose.model("Item", itemSchema);

export default Item;