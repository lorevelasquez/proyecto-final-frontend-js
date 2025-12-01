import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("cards-container");
  let carrito = obtenerCarrito() || [];
  actualizarContador(carrito);

  fetch("./data/productos.json")
    .then((res) => {
      if (!res.ok) throw new Error(`Status HTTP: ${res.status}`);
      return res.json();
    })
    .then((productos) => {
      productos.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");

        const img = document.createElement("img");
        img.classList.add("product-img");
        img.src = `./${producto.img}`;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = `Precio: $${producto.precio}`;

        const boton = document.createElement("button");
        boton.classList.add("btn-carrito");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
          carrito = obtenerCarrito() || [];
          actualizarContador(carrito);
          mostrarMensaje("Producto agregado");
        });

        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(boton);

        contenedor.appendChild(tarjeta);
      });
    })
    .catch((err) => {
      console.error("Error al cargar productos:", err);
      mostrarMensaje("No se pudieron cargar los productos, intenta más tarde.");
    });

});
