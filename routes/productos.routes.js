import { Router } from "express"
import { newProduct, findAll, findByCategory } from "../db/actions/product.action.js";

const router = Router()

//Crear un nuevo producto (solo con postman)
router.post('/create', async (req, res) => {
    const { name, desc, stock, price, image, category } = req.body

    try {
        const result = await newProduct({ name, desc, stock, price, image, category })
        res.status(200).json(result)
    } catch (error) {
        console.error('Error al crear un nuevo producto:', error);
        res.status(500).json('No se creó un nuevo producto.');
    }
})

//Endpoint para traer todos los producto.
router.get('/all', async (req, res) => {
    try {
        const productos = await findAll()

        if (productos.length > 0) {
            res.status(200).json(productos);
        } else {
            res.status(404).json('No hay productos disponibles.');
        }
    } catch (error) {
        console.error('Error al leer el archivo de productos:', error);
        res.status(500).json('Error al obtener los productos.');
    }
})

//Endpoint filtrar profuctos  por categoria
router.get('/categoria/:categoria', async (req, res) => {
    const { categoria } = req.params;
    try {
        const productos = await findByCategory(categoria)

        if (productos.length > 0) {
            res.status(200).json(productos)
        } else {
            res.status(404).json('No hay productos disponibles.')
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al leer los productos' })
    }
})

export default router


