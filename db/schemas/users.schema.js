import mongoose from 'mongoose'

const { Schema, models, model, } = mongoose

const userSchema = Schema({
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    user: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, match: [/.+@.+\..+/, 'Por favor ingresa un correo electrónico válido'] },
    password: { type: String, required: true, minlength: 6 },
    rol: { type: String, required: true, enum: ['user', 'admin'], default: 'user' }
})

const User = models.user || model('user', userSchema)

export default User