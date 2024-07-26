import { makePurchase } from "../../api/sales.api.js";

// Función para cargar productos del carrito y mostrarlos en la página
function loadCartProducts() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || []
    const cartItemsContainer = document.getElementById('cartItems')
    cartItemsContainer.innerHTML = ''; // Limpiar la lista antes de agregar nuevos productos

    if (cartItems.length > 0) {
        cartItems.forEach(product => {
            const cartItem = document.createElement('tr')
            cartItem.innerHTML = `
                <td class="px-6 py-4 whitespace-no-wrap">${product.nombre}</td>
                <td class="px-6 py-4 whitespace-no-wrap">${product.desc}</td>
                <td class="px-6 py-4 whitespace-no-wrap">$${product.precio}</td>
                <td class="px-6 py-4 whitespace-no-wrap">${product.quantity}</td>
            `;
            cartItemsContainer.appendChild(cartItem)
        });
    } else {
        cartItemsContainer.innerHTML = '<tr><td colspan="4" class="text-center">El carrito está vacío</td></tr>'
    }
}

// Función para manejar la compra
async function handlePurchase() {
    const address = document.getElementById('address').value
    console.log(address)
    const cartItems = JSON.parse(localStorage.getItem('cart')) || []
    console.log(cartItems)
    const user = JSON.parse(sessionStorage.getItem('user')) // Asumiendo que el usuario está almacenado en sessionStorage
    console.log(user)
    const Products = cartItems.map(item => ({
        product: item._id,
        quantity: item.quantity
    }));

    const totalAmount = cartItems.reduce((sum, item) => sum + item.precio * item.quantity, 0); // Calcular el monto total

    const order = {
        userId: user.id,
        products: Products,
        totalAmount: totalAmount,
        address: address,

    };

    try {
        await makePurchase(order)
        alert('Compra realizada con éxito')
        localStorage.removeItem('cart') // Limpiar el carrito después de la compra
        window.location.href = '../home/index.html'
    } catch (error) {
        alert('Error al realizar la compra')
    }
}

document.getElementById('btnCompra').addEventListener('click', handlePurchase)

// Cargar productos del carrito al cargar la página
window.addEventListener('load', loadCartProducts)
