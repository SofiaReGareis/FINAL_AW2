import { getProducts, getProductsByCategory, getCategory } from "../../api/products.api.js";

//Funcion que carga las categorias en la lista desplegable
async function loadCategories() {
    try {
        const categories = await getCategory();
        const categorySelect = document.getElementById('categorySelect')

        if (categories && categories.length > 0) {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category._id;  // Usar ObjectId como valor
                option.textContent = category.nombre
                categorySelect.appendChild(option)
            })

            // Cargar productos para la primera categoría por defecto
            const defaultCategory = categories[0]._id;  // Usar ObjectId
            const productos = await getProductsByCategory(defaultCategory)
            loadProducts(productos)
        } else {
            const option = document.createElement('option')
            option.value = ''
            option.textContent = 'No hay categorías disponibles'
            categorySelect.appendChild(option)
        }
    } catch (error) {
        console.error('Error al obtener las categorías:', error)
    }
}

//Funcion que carga los productos
async function loadProducts(products) {
    try {
        const listProducts = document.getElementById('listProducts');
        listProducts.innerHTML = '' // Limpiar la tabla antes de agregar nuevos productos

        if (products && products.length > 0) {
            products.forEach(prod => {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                    <td class="py-2 px-4 border-b border-gray-200">${prod.nombre}</td>
                    <td class="py-2 px-4 border-b border-gray-200">${prod.desc}</td>
                    <td class="py-2 px-4 border-b border-gray-200">$${prod.precio}</td>
                    <td class="py-2 px-4 border-b border-gray-200">${prod.cantidad}</td>
                `;
                listProducts.appendChild(tr)
            });
        } else {
            const tr = document.createElement('tr')
            tr.innerHTML = '<td colspan="4" class="py-2 px-4 border-b border-gray-200 text-center">No hay productos disponibles</td>'
            listProducts.appendChild(tr)
        }
    } catch (error) {
        console.error('Error al mostrar los productos:', error)
        const tr = document.createElement('tr')
        tr.innerHTML = '<td colspan="4" class="py-2 px-4 border-b border-gray-200 text-center">Error al obtener los datos de productos</td>'
        listProducts.appendChild(tr)
    }
}

//Funcion que selecciona si los productos son todos o seleccionados por cateogira, trabaja con la lista desplegable.
document.getElementById('categorySelect').addEventListener('change', async function () {
    const categoryId = this.value

    if (categoryId === 'all') {
        const productos = await getProducts()
        loadProducts(productos)
    } else {
        const productos = await getProductsByCategory(categoryId) // Usar ObjectId
        loadProducts(productos)
    }
})

window.addEventListener('load', async () => {
    await loadCategories()
    const allProducts = await getProducts()
    loadProducts(allProducts)
})
