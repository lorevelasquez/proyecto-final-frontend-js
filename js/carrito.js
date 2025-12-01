import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  let carrito = obtenerCarrito() || [];
  actualizarContador(carrito);

  const layout = document.querySelector(".carrito-layout");
  const contenedor = document.getElementById("contenedor-carrito");
  const resumenDiv = document.getElementById("resumen-carrito");

  if (!layout || !contenedor || !resumenDiv) {
    return;
  }

  contenedor.innerHTML = "";
  resumenDiv.innerHTML = "";

  // carrito vacio
  if (carrito.length === 0) {
    layout.style.display = "block";
    layout.innerHTML = `
      <p class="mensaje-carrito-vacio">Tu carrito está vacío (╥﹏╥)</p>
    `;
    return;
  }

  // carrito + productos
  layout.style.display = "grid";

  let totalCompra = 0;
  const listaResumen = document.createElement("ul");
  listaResumen.classList.add("lista-resumen-carrito");

  carrito.forEach((producto, indice) => {
    
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta-producto");

    const img = document.createElement("img");
    img.src = `../${producto.img}`;
    img.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = `$ ${Number(producto.precio).toLocaleString("es-AR")}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn-carrito", "btn-eliminar-carrito");
    btnEliminar.textContent = "Eliminar 🗑️";

    btnEliminar.addEventListener("click", () => {
      eliminarProducto(indice);
      renderizarCarrito();
    });

    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta);

    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - $ ${Number(producto.precio).toLocaleString("es-AR")}`;
    listaResumen.appendChild(li);

    totalCompra += Number(producto.precio);
  });

  resumenDiv.appendChild(listaResumen);

  const totalHTML = document.createElement("p");
  totalHTML.classList.add("total-carrito");
  totalHTML.textContent = `Total: $ ${totalCompra.toLocaleString("es-AR")}`;
  resumenDiv.appendChild(totalHTML);

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn-carrito", "btn-vaciar-carrito");
  btnVaciar.textContent = "Vaciar carrito 🗑️";

  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  resumenDiv.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});
