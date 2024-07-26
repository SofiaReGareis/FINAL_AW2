import { connectToDatabase } from "../connection.js"
import Sale from '../schemas/sales.schema.js'

//Funcion para crear una nueva venta
export const createSale = async ({ userId, products, totalAmount, address }) => {
    try {
        await connectToDatabase()

        const newSale = await Sale.create({
            user: userId,
            products: products,
            totalAmount: totalAmount,
            address: address
        });

        return { success: true, sale: JSON.parse(JSON.stringify(newSale)) }
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Error al crear la venta' }
    }
}

//Funcion que trae las ventas del usuario logueado.
export const getSalesByUser = async (userId) => {
    try {
        await connectToDatabase()

        const sales = await Sale.find({ user: userId }).populate('products.product')

        return { success: true, sales: JSON.parse(JSON.stringify(sales)) }
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Error al obtener las ventas' }
    }
}


