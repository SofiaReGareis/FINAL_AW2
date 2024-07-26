import { connectToDatabase } from "../connection.js"
import Product from "../schemas/products.schema.js"

//Funcion para crear un nuevo producto(solo desde postman)
export const newProduct = async ({ name, desc, price, stock, image, category }) => {
    try {
        await connectToDatabase()
        const res = await Product.create({ nombre: name, desc, precio: price, cantidad: stock, imagen: image, categoria: category })
        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    }
}

//Funcion que trae todos los productos de la db
export const findAll = async () => {
    try {
        await connectToDatabase()
        const res = await Product.find().populate({ path: "categoria" })
        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    }
}

//Funcion que trae todos los productos de la db de la categoria solicitada.
export const findByCategory = async (category) => {
    try {
        await connectToDatabase()
        const res = await Product.find({ categoria: category }).populate({ path: "categoria" })
        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    }
}