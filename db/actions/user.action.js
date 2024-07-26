import { connectToDatabase } from "../connection.js"
import bcrypt from 'bcrypt';
import User from '../schemas/users.schema.js'

//crear un usuario - solo postman actualmente
export const createUser = async ({ nombre, apellido, user, email, password, rol }) => {
    try {
        await connectToDatabase()

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 8)

        const newUser = await User.create({
            nombre,
            apellido,
            user,
            email,
            password: hashedPassword,
            rol
        });

        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Error al crear usuario' }
    }
}

//Funcion para Login de usuario 
export const loginUser = async ({ user, password }) => {
    try {
        await connectToDatabase()

        // Buscar el usuario por su nombre de usuario
        const foundUser = await User.findOne({ user })
        if (!foundUser) {
            return { success: false, message: 'Usuario no encontrado' }
        }

        // Comparar la contraseña proporcionada con la contraseña hasheada almacenada
        const passwordMatch = await bcrypt.compare(password, foundUser.password)
        if (!passwordMatch) {
            return { success: false, message: 'Contraseña incorrecta' }
        }

        // Login exitoso
        const userData = {
            id: foundUser.id,
            nombre: foundUser.nombre,
            apellido: foundUser.apellido,
            user: foundUser.user,
            status: true
        };

        return JSON.parse(JSON.stringify(userData))
    } catch (error) {
        console.log('Error en el login:', error);
        return { success: false, message: 'Error en el login' }
    }
}