/*
========================================
MINI ECOMMERCE
========================================
*/


// ========================================
// SELECTORES DEL DOM
// ========================================

const productsContainer = document.getElementById("productsContainer");
const cartContainer = document.getElementById("cartContainer");
const cartTotal = document.getElementById("cartTotal");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const loginModal = document.getElementById("loginModal");
const accountBtn = document.querySelector(".account-btn");
const closeLogin = document.getElementById("closeLogin");
const loginForm = document.getElementById("loginForm");


// ========================================
// VARIABLES GLOBALES
// ========================================

let products = [];
let filteredProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// ========================================
// FASE 1 - OBTENER PRODUCTOS
// ========================================

async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    products = data;
    filteredProducts = data;

    renderProducts(products);
    renderCategories(products);
  } catch (error) {
    console.log("Error obteniendo productos", error);
  }
}

// ========================================
// PINTAR PRODUCTOS
// ========================================

function renderProducts(productsList) {
  productsContainer.innerHTML = "";

  for (let i = 0; i < productsList.length; i++) {
    let product = productsList[i];

    let card = document.createElement("article");
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
  }
}

// ========================================
// FASE 2 - CATEGORÍAS
// ========================================

function renderCategories(productsArray){

  let categoriasUnicas = [];

  for (let i = 0; i < productsArray.length; i++) {
    let categoria = productsArray[i].category;
    if (!categoriasUnicas.includes(categoria)) {
      categoriasUnicas.push(categoria);
    }
  }

  for (let i = 0; i < categoriasUnicas.length; i++) {
    let opcion = document.createElement("option");
    opcion.value = categoriasUnicas[i];
    opcion.textContent = categoriasUnicas[i];
    categoryFilter.appendChild(opcion);
  }

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

  let textoBusqueda = searchInput.value.toLowerCase();
  let categoriaSeleccionada = categoryFilter.value;
  let ordenamiento = sortSelect.value;

  filteredProducts = products;

  // Filtrar por búsqueda
  let productosFiltrados = [];
  for (let i = 0; i < filteredProducts.length; i++) {
    let titulo = filteredProducts[i].title.toLowerCase();
    if (titulo.includes(textoBusqueda)) {
      productosFiltrados.push(filteredProducts[i]);
    }
  }

  filteredProducts = productosFiltrados;

  // Filtrar por categoría
  if (categoriaSeleccionada !== "" && categoriaSeleccionada !== "all") {
    let productosPorCategoria = [];
    for (let i = 0; i < filteredProducts.length; i++) {
      if (filteredProducts[i].category === categoriaSeleccionada) {
        productosPorCategoria.push(filteredProducts[i]);
      }
    }
    filteredProducts = productosPorCategoria;
  }

  // Ordenar
  if (ordenamiento === "priceAsc") {
    for (let i = 0; i < filteredProducts.length; i++) {
      for (let j = i + 1; j < filteredProducts.length; j++) {
        if (filteredProducts[i].price > filteredProducts[j].price) {
          let temporal = filteredProducts[i];
          filteredProducts[i] = filteredProducts[j];
          filteredProducts[j] = temporal;
        }
      }
    }
  } else if (ordenamiento === "priceDesc") {
    for (let i = 0; i < filteredProducts.length; i++) {
      for (let j = i + 1; j < filteredProducts.length; j++) {
        if (filteredProducts[i].price < filteredProducts[j].price) {
          let temporal = filteredProducts[i];
          filteredProducts[i] = filteredProducts[j];
          filteredProducts[j] = temporal;
        }
      }
    }
  } else if (ordenamiento === "az") {
    for (let i = 0; i < filteredProducts.length; i++) {
      for (let j = i + 1; j < filteredProducts.length; j++) {
        if (filteredProducts[i].title > filteredProducts[j].title) {
          let temporal = filteredProducts[i];
          filteredProducts[i] = filteredProducts[j];
          filteredProducts[j] = temporal;
        }
      }
    }
  } else if (ordenamiento === "za") {
    for (let i = 0; i < filteredProducts.length; i++) {
      for (let j = i + 1; j < filteredProducts.length; j++) {
        if (filteredProducts[i].title < filteredProducts[j].title) {
          let temporal = filteredProducts[i];
          filteredProducts[i] = filteredProducts[j];
          filteredProducts[j] = temporal;
        }
      }
    }
  }

  renderProducts(filteredProducts);

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

  let carritoNuevo = [];
  
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id !== id) {
      carritoNuevo.push(cart[i]);
    }
  }

  cart = carritoNuevo;
  
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();

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

  localStorage.setItem("cart", JSON.stringify(cart));

}


/*
OBJETIVO:
Recuperar carrito guardado.

PISTA:
JSON.parse()
*/

function loadCart(){

  let carritoGuardado = localStorage.getItem("cart");
  
  if (carritoGuardado) {
    cart = JSON.parse(carritoGuardado);
  }

  renderCart();

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

  let estaEnFavoritos = false;

  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i] === id) {
      estaEnFavoritos = true;
    }
  }

  if (estaEnFavoritos) {
    let favoritosNuevos = [];
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i] !== id) {
        favoritosNuevos.push(favorites[i]);
      }
    }
    favorites = favoritosNuevos;
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));

}


function loadFavorites(){

  let favoritosGuardados = localStorage.getItem("favorites");
  
  if (favoritosGuardados) {
    favorites = JSON.parse(favoritosGuardados);
  }

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

    let usuario = loginForm.username.value;
    let contrasena = loginForm.password.value;

    let datosLogin = {
      username: usuario,
      password: contrasena
    };

    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosLogin)
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
      if (datos.token) {
        sessionStorage.setItem("token", datos.token);
        loginModal.classList.add("hidden");
        loginForm.reset();
      }
    })
    .catch(error => {
      console.log("Error en login", error);
    });

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
    loginForm.reset();
  }
);


/*
OBJETIVO:
Cerrar modal clicando fuera.
*/

loginModal.addEventListener(
  "click",
  (e) => {

    if (e.target === loginModal) {
      loginModal.classList.add("hidden");
    }

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

  getProducts();
  loadCart();
  loadFavorites();
  checkSession();

}


// Iniciar aplicación
init();