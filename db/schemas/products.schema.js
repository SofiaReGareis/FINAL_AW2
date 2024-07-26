import mongoose from 'mongoose'

const { Schema, models, model, ObjectId } = mongoose

const ProductSchema = new Schema({
    nombre: { type: String, required: true },           // Nombre del producto
    desc: { type: String, required: true },             // Descripción del producto
    precio: { type: Number, required: true },           // Precio del producto
    cantidad: { type: Number, default: 0 },             // Cantidad disponible del producto
    imagen: { type: String },                           // Ruta de la imagen del producto
    categoria: { type: ObjectId, required: true, ref: "category" } // Categoria del producto (de otro schema)
})

const Product = models.product || model('product', ProductSchema)

export default Product