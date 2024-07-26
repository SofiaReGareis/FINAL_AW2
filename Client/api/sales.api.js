//Funcion que lleva la compra al back
export async function makePurchase(order) {
    //console.log('Datos enviados a la API:', order);  // log para verificar los datos
    try {
        const response = await fetch('http://localhost:3000/sales/newSale', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })

        if (!response.ok) {
            const error = await response.json()
            console.error('Error al realizar la compra:', error)
            throw new Error('Error al realizar la compra')
        }

        return await response.json();
    } catch (error) {
        console.error('Error al realizar la compra:', error)
        throw error
    }
}

//Obtener todas las compras de usuario logueado en la SessionStorage
export async function getUserSales(userId) {
    //console.log(`Obteniendo ventas para el usuario con ID: ${userId}`)
    try {
        const response = await fetch(`http://localhost:3000/sales/userSales/${userId}`)

        if (!response.ok) {
            const error = await response.json()
            console.error('Error al obtener las compras:', error)
            throw new Error('Error al obtener las compras')
        }

        const data = await response.json()
        //console.log('Datos recibidos de la API:', data)
        return data.sales
    } catch (error) {
        console.error('Error al obtener las compras:', error)
        throw error
    }
}