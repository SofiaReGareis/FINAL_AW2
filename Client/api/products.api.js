//Trae la categoría para cargarlas en la lista desplegable:
export async function getCategory() {
    try {
        const response = await fetch('http://localhost:3000/category/all', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            console.error('Error al obtener las categorías')
            return []
        }
    } catch (error) {
        console.error('Error al obtener las categorías:', error)
        return []
    }
}

//Trae todos los productos para mostrar en la tabla
export async function getProducts() {
    try {
        const response = await fetch('http://localhost:3000/items/all', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error al obtener los productos');
            return [];
        }
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
}

//Trae desde el back los productos para ser seleccionados por categoria
export async function getProductsByCategory(category) {

    try {
        const response = await fetch(`http://localhost:3000/items/categoria/${category}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            return await response.json()
        } else {
            console.error('Error al obtener los productos por categoría')
            return []
        }
    } catch (error) {
        console.error('Error al obtener los productos por categoría:', error)
        return []
    }
}