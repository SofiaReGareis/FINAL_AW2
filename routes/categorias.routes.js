import { Router } from "express";
import { createCategory, findAll } from "../db/actions/category.action.js";
const router = Router()

//Endpoint para todas las cateogrias
router.get('/all', async (req, res) => {
    try {
        const result = await findAll()

        res.status(200).json(result)
    } catch (error) {
        res.status(400).json("No hay categorias disponibles")
    }
})

//Endpont para crear nueva categoria(postman)
router.post('/create', async (req, res) => {
    const { name } = req.body

    try {
        const result = await createCategory(name)

        res.status(200).json(result)
    } catch (error) {
        res.status(400).json("Error al crear categoria.")

    }
})

export default router