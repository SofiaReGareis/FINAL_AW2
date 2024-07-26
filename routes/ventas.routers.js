import { Router } from 'express';
import { createSale, getSalesByUser } from '../db/actions/sale.action.js';
const router = Router();

// Ruta para crear una nueva venta
router.post('/newSale', async (req, res) => {
    const { userId, products, totalAmount, address } = req.body;

    try {
        const result = await createSale({ userId, products, totalAmount, address });

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error al crear una nueva venta:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear una nueva venta.'
        });
    }
});

// Ruta para obtener las ventas de un usuario
router.get('/userSales/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await getSalesByUser(userId);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener las ventas del usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las ventas del usuario.'
        });
    }
});

export default router;
