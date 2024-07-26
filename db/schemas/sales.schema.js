import mongoose from 'mongoose'

const { Schema, models, model } = mongoose

const saleSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true }, //Usuario que realiza la compra
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'product', required: true }, //producto
        quantity: { type: Number, required: true } //Cantidad de producto
    }],
    totalAmount: { type: Number, required: true }, //Campo para el total
    address: { type: String, required: true }, // Campo para la dirección
    date: { type: Date, default: Date.now } //Fecha de la compra
});

const Sale = models.sale || model('sale', saleSchema)

export default Sale
