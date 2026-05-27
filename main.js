/*
========================================
MINI ECOMMERCE - BOILERPLATE
========================================

TECNOLOGÍAS:
- JavaScript
- Fetch API
- LocalStorage
- SessionStorage

FASES:
1. Productos
2. Filtros
3. Carrito
4. EXTRA Persistencia
5. EXTRA Login
6. EXTRA Sesión
7. EXTRA Favoritos

========================================
*/


// ========================================
// SELECTORES DEL DOM
// ========================================

// Contenedor productos
const productsContainer =
  document.getElementById("productsContainer");
// Contenedor carrito
const cartContainer =
  document.getElementById("cartContainer");
// Total carrito
const cartTotal =
  document.getElementById("cartTotal");
// Buscador
const searchInput =
  document.getElementById("searchInput");
// Filtro categorías
const categoryFilter =
  document.getElementById("categoryFilter");
// Ordenación
const sortSelect =
  document.getElementById("sortSelect");
// Modal login
const loginModal =
  document.getElementById("loginModal");
// Botón abrir login
const accountBtn =
  document.querySelector(".account-btn");
// Botón cerrar login
const closeLogin =
  document.getElementById("closeLogin");
// Formulario login
const loginForm =
  document.getElementById("loginForm");

// ========================================
// VARIABLES GLOBALES
// ========================================

// Productos API
let products = [];
// Productos filtrados
let filteredProducts = [];
// Carrito
let cart = [];
// Favoritos
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];;

// ========================================
// FASE 1 - FETCH PRODUCTOS
// ========================================

/*
OBJETIVO:
Obtener productos desde la API.

ENDPOINT:
https://fakestoreapi.com/products

CONCEPTOS:
- fetch()
- promesas
- .then()
- .catch()

TAREAS:
- Hacer petición fetch
- Convertir respuesta a JSON
- Guardar productos
- Pintar productos
- Pintar categorías
*/


/*
========================================
¿QUÉ DEVUELVE LA API?
========================================

La API devuelve un ARRAY de productos.

Ejemplo:

[
  {
    id: 1,
    title: "Fjallraven Backpack",
    price: 109.95,
    description: "Your perfect pack...",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/..."
  }
]

========================================
¿CÓMO ACCEDER A LOS DATOS?
========================================

product.title
product.price
product.category
product.image

========================================
EJEMPLO RECORRIENDO PRODUCTOS
========================================

products.forEach(product => {

  console.log(product.title);

});

*/


//-*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*-
fetch('https://fakestoreapi.com/products')
  .then(response => {
    if (!response.ok) throw new Error('Error en la petición');
    return response.json();
  })
  .then(data => {
    products = data;
    const container = document.querySelector('#productsContainer');
    if (container) container.innerHTML = '';
    data.forEach(product => {
      renderProducts(product);
    });
  })
  .catch(error => {
    console.error(error);
  });
//-*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*-




//-*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*-
//funcion pintarTarjeta
//funcion pintarTarjeta
function renderProducts(product) {

  //Crear los elementos
  const tarjeta = document.createElement("article");
  const contenedorImagen = document.createElement("div");
  const imageProduct = document.createElement("img");
  const info = document.createElement("div");
  const categoryProduct = document.createElement("p");
  const titleProduct = document.createElement("h3");
  const priceProduct = document.createElement("p");
  const buttons = document.createElement("div");
  const addBtn = document.createElement("button");
  const favBtn = document.createElement("button");

  //asignar clases a los elementos 
  tarjeta.classList.add("product-card");
  contenedorImagen.classList.add("product-image");
  imageProduct.setAttribute("src", product.image);
  imageProduct.setAttribute("alt", product.description);
  info.classList.add("product-info");
  categoryProduct.classList.add("product-category");
  titleProduct.classList.add("product-title");
  priceProduct.classList.add("product-price");
  buttons.classList.add("card-actions");
  addBtn.classList.add("add-btn");
  favBtn.classList.add("fav-btn");

  // Rellenar el contenido con los datos de la API
  categoryProduct.textContent = product.category;
  titleProduct.textContent = product.title;
  priceProduct.textContent = `${product.price} €`;
  addBtn.textContent = "Añadir";

  // Comprobar si este producto ya es un favorito guardado para poner el emoji correcto
  const esFavorito = favorites.some(fav => fav.id === product.id);
  favBtn.textContent = esFavorito ? "❤️" : "🤍";

  // --- EVENTO DE FAVORITOS ---
  favBtn.addEventListener('click', () => {
    // Revisar si el producto ya está en la lista de favoritos
    const index = favorites.findIndex(fav => fav.id === product.id);

    if (index === -1) {
      // Si no está, lo agregamos al array
      favorites.push(product);
      favBtn.textContent = "❤️";
      console.log('Agregado a favoritos:', product.title);
    } else {
      // Si ya está, lo eliminamos del array
      favorites.splice(index, 1);
      favBtn.textContent = "🤍";
      console.log('Eliminado de favoritos:', product.title);
    }

    // Guardar la lista actualizada en LocalStorage convirtiéndola en texto
    localStorage.setItem('favorites', JSON.stringify(favorites));
  });

  //Insertar los elementos en la card
  tarjeta.prepend(contenedorImagen);
  tarjeta.append(info);
  contenedorImagen.append(imageProduct);
  info.append(categoryProduct, titleProduct, priceProduct, buttons);
  buttons.prepend(addBtn);
  buttons.append(favBtn);

  //seleccionamos contenedor donde insertar todo
  const container = document.querySelector('#productsContainer');

  //añadimos la tarjeta en el contenedor final ya con su botón listo
  if (container) {
    container.prepend(tarjeta);
  }
}
console.log(favorites);

//-*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*-



// ========================================
// FASE 1 - RENDER PRODUCTOS
// ========================================

/*
OBJETIVO:
Pintar productos dinámicamente.

MOSTRAR:
- Imagen
- Título
- Precio
- Categoría
- Botón carrito
- Botón favorito

PISTA:
Usar:
- innerHTML
- createElement
- appendChild
*/


/*
========================================
PISTA RENDERIZADO
========================================

Ejemplo creando una card:

const card = document.createElement("article");

card.innerHTML = `
  <h2>${product.title}</h2>
`;

productsContainer.appendChild(card);

========================================
*/




// ========================================
// FASE 2 - CATEGORÍAS
// ========================================

/*
OBJETIVO:
Generar categorías dinámicamente.

TAREAS:
- Obtener categorías únicas
- Crear options
- Añadir al select

PISTA:
new Set()
*/

function renderCategories(productsArray) {

  // TODO

}


// ========================================
// FASE 2 - FILTROS
// ========================================

/*
OBJETIVO:
Filtrar productos dinámicamente.

REQUISITOS:
- Buscar por nombre
- Filtrar por categoría
- Ordenar:
  - precio ascendente
  - precio descendente
  - A-Z
  - Z-A

PISTA:
- filter()
- sort()
- localeCompare()
*/

function filterProducts() {

  // TODO

}


// ========================================
// EVENTOS FILTROS
// ========================================

searchInput.addEventListener(
  "input",
  filterProducts
);

categoryFilter.addEventListener(
  "change",
  filterProducts
);

sortSelect.addEventListener(
  "change",
  filterProducts
);


// ========================================
// FASE 3 - CARRITO
// ========================================

/*
OBJETIVO:
Añadir productos al carrito.
 
TAREAS:
- Buscar producto por ID
- Añadir al array carrito
- Incrementar cantidad si ya existe
- Guardar carrito
- Renderizar carrito
*/

function addToCart(id) {

  // TODO

}


/*
OBJETIVO:
Eliminar producto del carrito.
*/

function removeFromCart(id) {

  // TODO

}


/*
OBJETIVO:
Pintar carrito dinámicamente.
 
MOSTRAR:
- Nombre
- Cantidad
- Precio
- Total carrito
*/

function renderCart() {

  // TODO

}


// ========================================
// FASE 4 - LOCAL STORAGE
// ========================================

/*
========================================
EXTRA
========================================
*/


/*
OBJETIVO:
Guardar carrito en localStorage.
 
PISTA:
JSON.stringify()
*/

function saveCart() {

  // TODO

}


/*
OBJETIVO:
Recuperar carrito guardado.
 
PISTA:
JSON.parse()
*/

function loadCart() {

  // TODO

}


// ========================================
// FASE 7 - FAVORITOS
// ========================================

/*
========================================
EXTRA
========================================
*/


/*
OBJETIVO:
Guardar productos favoritos.
 
TAREAS:
- Añadir favoritos
- Eliminar favoritos
- Guardar en localStorage
- Recuperar favoritos
*/

function toggleFavorite(id) {

  // TODO

}


function loadFavorites() {

  // TODO

}


// ========================================
// FASE 5 - LOGIN
// ========================================

/*
========================================
EXTRA
========================================
*/


/*
OBJETIVO:
Simular login con FakeStoreAPI.
 
ENDPOINT:
https://fakestoreapi.com/auth/login
 
USUARIO TEST:
mor_2314
83r5^_
 
CONCEPTOS:
- fetch POST
- JSON.stringify()
- sessionStorage
 
TAREAS:
- Capturar formulario
- Enviar datos
- Guardar token
- Cerrar modal
*/

loginForm.addEventListener(
  "submit",
  (e) => {

    e.preventDefault();

    // TODO

  }
);


// ========================================
// FASE 6 - SESIÓN
// ========================================

/*
========================================
EXTRA
========================================
*/


/*
OBJETIVO:
Mantener sesión iniciada.
 
TAREAS:
- Detectar token
- Mostrar login si no existe
*/

function checkSession() {

  // TODO

}


/*
OBJETIVO:
Cerrar sesión.
 
TAREAS:
- Eliminar token
- Cerrar modal
*/

function logout() {

  // TODO

}


// ========================================
// MODAL LOGIN
// ========================================

/*
========================================
EXTRA
========================================
*/


/*
OBJETIVO:
Abrir modal login.
*/

accountBtn.addEventListener(
  "click",
  () => {

    // TODO

  }
);


/*
OBJETIVO:
Cerrar modal login.
*/

closeLogin.addEventListener(
  "click",
  () => {

    // TODO

  }
);


/*
OBJETIVO:
Cerrar modal clicando fuera.
*/

loginModal.addEventListener(
  "click",
  (e) => {

    // TODO

  }
);


// ========================================
// INIT APP
// ========================================

/*
OBJETIVO:
Inicializar la aplicación.
 
TAREAS:
- Obtener productos
- Cargar carrito
- Cargar favoritos
- Comprobar sesión
*/

function init() {

  // TODO

}


// Iniciar aplicación
init();