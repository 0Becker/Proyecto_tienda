//const { use } = require("react");

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.error("Error fetching products:", error));
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
PISTA RENDERIZADO

Ejemplo creando una card:

const card = document.createElement("article");

card.innerHTML = `
  <h2>${product.title}</h2>
`;

productsContainer.appendChild(card);

*/


function renderProducts(productsArray) {
  productsContainer.innerHTML = "";
  // TODO
  productsArray.forEach(product => {
    const card = document.createElement("article");
    card.classList.add("product-card");
    card.innerHTML = `
      <h2 class="product-title">${product.title}</h2>
          <div class="product-image">
      <img src="${product.image}"  alt="${product.title}">
            </div>

      <p class="product-price">Precio: $${product.price}</p>
              <div class="product-info">

      <p>Categoría: ${product.category}</p>
      </div>
      
          <div class="card-actions">

            <button class="add-btn">

              Añadir

            </button>

            <button class="fav-btn">

              🤍

            </button>

          </div>
          `

    productsContainer.appendChild(card);
    // console.log(productsArray);
  });


  // TODO
}

// ========================================
// FASE 2 - CATEGORÍAS
// ========================================

function renderCategories(productsArray){



}
renderCategories();



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



}




// ========================================
// EVENTOS FILTROS
// ========================================



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

function removeFromCart(id) {

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

  localStorage.setItem("cart", JSON.stringify(cart));

}


/*
OBJETIVO:
Recuperar carrito guardado.

PISTA:
JSON.parse()
*/

function loadCart() {

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

function toggleFavorite(id) {

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


function loadFavorites() {

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

loginBtn.addEventListener("click",() => {
  loginModal.classList.toggle("hidden");
  const credentials = { username: 'johnd', password: 'm38rmF$' };
fetch('https://fakestoreapi.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(credentials)
})
  .then(response => response.json())
  .then(data => {
    console.log("¡Esta es la respuesta de la API!");
    console.log(data); // Aquí verás el token en la consola

    // GUARDAR TOKEN: Guardamos el token que nos dio la API
    sessionStorage.setItem('token', data.token);
  });
});

closeLogin.addEventListener("click",() => {
  loginModal.classList.toggle("hidden");
});



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
      loginForm.reset();} 
    })
    .catch(error => {
      console.log("Error en login", error);
    });}
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

function logout() {

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

function init() {

  getProducts();
  loadCart();
  loadFavorites();
  checkSession();

}


// Iniciar aplicación
init();