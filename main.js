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
¿QUÉ DEVUELVE LA API?

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

¿CÓMO ACCEDER A LOS DATOS?

product.title
product.price
product.category
product.image

EJEMPLO RECORRIENDO PRODUCTOS

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
PISTA RENDERIZADO

Ejemplo creando una card:

const card = document.createElement("article");

card.innerHTML = `
  <h2>${product.title}</h2>
`;

productsContainer.appendChild(card);

*/



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
// No aceptar en la PULL REQUES ESTA FASE 
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
// FASE 5 - LOGIN MGUTIERRES 2
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
}) .then(response => response.json())
  .then(data => {
    console.log("¡Esta es la respuesta de la API!");
    console.log(data); //el token en la consola
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
// FASE 6 - SESIÓN MGUTIERRES
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
// MODAL LOGIN MGUTIERRES
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