import { connectToDatabase } from "../connection.js"
import Category from "../schemas/category.schema.js"

//Funcion que crea cateogrias que se asocian a productos (solo postman).
export const createCategory = async (name) => {
    try {
        await connectToDatabase()
        const res = await Category.create({ nombre: name })

        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    }
}

//Funcion que trae todas las categorias
export const findAll = async () => {
    try {
        await connectToDatabase()
        const res = await Category.find().select("nombre")
        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    }
}