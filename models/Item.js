import mongoose from "mongoose";

// Esquema de cada item de la DB
const itemSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        unique: true // cada título tendrá que ser diferente, también en las pruebas ( o dará error)
    },
    description: { 
        type: String 
    },
    servicesList: { 
        type: [String], 
        default: [] 
    },
    type: { 
        type: [String], 
        default: [] 
    },
    price: { 
        type: Number, 
        required: true 
    },
    image: 
    { type: String } // la ruta de la imagen

},
{ timestamps: true, // timestamps: true agrega createdAt y updatedAt
    strict:false // strict:false me permite usar campos adicionales
});

const Item = mongoose.model("Item", itemSchema);

export default Item;