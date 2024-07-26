import { getUserSales } from "../../api/sales.api.js";

// Función para cargar las compras del usuario y mostrarlas en la página
async function loadUserSales() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const userId = user.id

    try {
        const sales = await getUserSales(userId)

        const salesList = document.getElementById('listSales')
        salesList.innerHTML = ''; // Limpiar la lista antes de agregar nuevas compras

        if (sales.length > 0) {
            sales.forEach(sale => {
                const saleRow = document.createElement('tr')
                const products = sale.products.map(p => p.product?.nombre || 'Producto desconocido').join(', ')
                const quantities = sale.products.map(p => p.quantity).join(', ')

                saleRow.innerHTML = `
                    <td class="py-2 px-4 whitespace-no-wrap">${new Date(sale.date).toLocaleDateString()}</td>
                    <td class="py-2 px-4 whitespace-no-wrap">${products}</td>
                    <td class="py-2 px-4 whitespace-no-wrap">${quantities}</td>
                    <td class="py-2 px-4 whitespace-no-wrap">$${sale.totalAmount}</td>
                    <td class="py-2 px-4 whitespace-no-wrap">${sale.address}</td>
                `;
                salesList.appendChild(saleRow)
            })
        } else {
            salesList.innerHTML = '<tr><td colspan="5" class="text-center">No has realizado compras</td></tr>'
        }
    } catch (error) {
        console.error('Error al cargar las compras del usuario:', error)
        const salesList = document.getElementById('listSales');
        salesList.innerHTML = '<tr><td colspan="5" class="text-center">Error al cargar las compras</td></tr>'
    }
}

// Cargar compras del usuario al cargar la página
window.addEventListener('load', loadUserSales)