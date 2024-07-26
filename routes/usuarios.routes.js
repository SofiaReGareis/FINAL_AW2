import { Router } from 'express';
import { loginUser, createUser } from '../db/actions/user.action.js';

const router = Router();

// Ruta para el login
router.post('/login', async (req, res) => {
    const { user, password } = req.body;

    try {
        const result = await loginUser({ user, password });

        if (result.success === false) {
            return res.status(result.message === 'Usuario no encontrado' ? 404 : 401).json({
                success: false,
                message: result.message
            });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
});

// Ruta para crear un nuevo usuario(solo postman)
router.post('/newUser', async (req, res) => {
    const { nombre, apellido, user, email, password } = req.body;

    try {
        const result = await createUser({ nombre, apellido, user, email, password });

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }

        res.status(200).json({
            success: true,
            message: 'Usuario creado exitosamente'
        });
    } catch (error) {
        console.error('Error al crear un nuevo usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear un nuevo usuario.'
        });
    }
});

export default router;