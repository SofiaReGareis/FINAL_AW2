
// Funcion para agregar
export const addSession = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user))
}

// Funcion para obtener
export const getSession = () => {
    const user = sessionStorage.getItem('user')
    return user ? JSON.parse(user) : false
}