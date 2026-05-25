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
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Favoritos
let favorites = [];

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



async function getProducts() {

  try {

    const response =
      await fetch("https://fakestoreapi.com/products");

    const data = await response.json();

    products = data;

    filteredProducts = data;

    renderProducts(products);

    renderCategories(products);

  } catch (error) {

    console.log("Error obteniendo productos", error);

  }

}

function renderProducts(productsList) {

  productsContainer.innerHTML = "";

  productsList.forEach(product => {

    const card = document.createElement("article");

    card.classList.add("product-card");

    card.innerHTML = `

      <div class="product-image">

        <img src="${product.image}" alt="${product.title}">

      </div>

      <div class="product-info">

        <p class="product-category">

          ${product.category}

        </p>

        <h3 class="product-title">

          ${product.title}

        </h3>

        <p class="product-price">

          ${product.price}€

        </p>

        <div class="card-actions">

          <button
            class="add-btn"
            onclick="addToCart(${product.id})"
          >
            Añadir
          </button>

          <button
            class="fav-btn"
            onclick="toggleFavorite(${product.id})"
          >
            🤍
          </button>

        </div>

      </div>

    `;

    productsContainer.appendChild(card);

  });

}

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

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productsContainer = document.getElementById("productsContainer");

const cartContainer = document.getElementById("cartContainer");

const cartTotal = document.getElementById("cartTotal");


function obtenerProductosDelHTML() {

  const cards = document.querySelectorAll(".product-card");

  return [...cards].map((card, index) => {

    return {
      id: index + 1,
      nombre: card.querySelector(".product-title").textContent,
      precio: parseFloat(
        card.querySelector(".product-price")
          .textContent.replace("€", "")
      ),
      categoria: card.querySelector(".product-category").textContent,
      imagen: card.querySelector("img").src
    };

  });

}
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

/*
const card = document.createElement("article");

card.innerHTML = `
  <h2>${product.title}</h2>
`;productsContainer.appendChild(card);
function renderProducts(productsArray){ 

  productsArray.forEach(product => {

    const card = document.createElement("article");

    card.innerHTML = `
      <h2>${product.title}</h2>
    `;

    productsContainer.appendChild(card);
  });

} */


/* ========================================
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

function renderCategories(productsArray){

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

function filterProducts(){

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


function buscarProducto(id) {
  return products.find(product => product.id === id);
}

function addToCart(id){
  const product = buscarProducto(id);
  if (product) {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;  
}




/*
OBJETIVO:
Eliminar producto del carrito.
*/

function removeFromCart(id){

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

  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach(item => {

    total += item.price * item.quantity;

    cartContainer.innerHTML += `

      <div class="cart-item">

        <div class="cart-item-info">

          <p class="cart-item-title">

            ${item.title}

          </p>

          <p class="cart-item-price">

            ${item.quantity} x ${item.price}€

          </p>

        </div>

        <button
          class="remove-btn"
          onclick="removeFromCart(${item.id})"
        >
          X
        </button>

      </div>

    `;

  });

  cartTotal.textContent =
    total.toFixed(2) + "€";

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

function saveCart(){

º

  localStorage.setItem("cart", JSON.stringify(cart));

  let cartString = localStorage.getItem("cart");
  console.log(JSON.parse(cartString));

  // TODO

}


/*
OBJETIVO:
Recuperar carrito guardado.

PISTA:
JSON.parse()
*/

function loadCart(){

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

function toggleFavorite(id){

  // TODO

}


function loadFavorites(){

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

function checkSession(){

  const token = sessionStorage.getItem("token");
  if (!token) {
    loginModal.classList.remove("hidden");
  } else {
    loginModal.classList.add("hidden");
  }

}


/*
OBJETIVO:
Cerrar sesión.

TAREAS:
- Eliminar token
- Cerrar modal
*/

function logout(){

  sessionStorage.removeItem("token");
  loginModal.classList.add("hidden");

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
    loginModal.classList.remove("hidden");
  }
);


/*
OBJETIVO:
Cerrar modal login.
*/

closeLogin.addEventListener(
  "click",
  () => {
    loginModal.classList.add("hidden");

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

function init(){

  // TODO

}


// Iniciar aplicación
init();