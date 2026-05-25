fetch('https://fakestoreapi.com/products')
    .then(response => {
        if (!response.ok) throw new Error('Error en la petición');
        return response.json();
    })
    .then(data => {
        const container = document.querySelector('#productsContainer');
        if (container) container.innerHTML = '';

        data.forEach(products => {
            renderProducts(products);
        });
    })
    .catch(error => {
        console.error(error);
    });

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
    imageProduct.setAttribute("src", product.image)
    imageProduct.setAttribute("alt", product.description)
    info.classList.add("product-info");
    categoryProduct.classList.add("product-category");
    titleProduct.classList.add("product-title");
    priceProduct.classList.add("product-price");
    buttons.classList.add("card-actions");
    addBtn.classList.add("add-btn");
    favBtn.classList.add("fav-btn");

    //Insertar los elementos en la card
    tarjeta.prepend(contenedorImagen);
    tarjeta.append(info);
    contenedorImagen.append(imageProduct);
    info.append(categoryProduct, titleProduct, priceProduct, buttons);
    buttons.prepend(addBtn);
    buttons.append(favBtn);

    // Rellenar el contenido con los datos de la API
    categoryProduct.textContent = product.category;
    titleProduct.textContent = product.title;
    priceProduct.textContent = `${product.price} €`;
    addBtn.textContent = "Añadir";
    favBtn.textContent = "🤍";

    //seleccionarmos contenedor donde insertar todo y limpiamos
    const container = document.querySelector('#productsContainer');

    //añadimos la tarjeta en el contenedor final
    container.prepend(tarjeta);
}
