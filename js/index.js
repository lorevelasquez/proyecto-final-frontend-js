import { productos } from "./productos.js";
import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";
import { renderCarrito } from "./carrito.js"; 

document.addEventListener("DOMContentLoaded", () => {

  
  actualizarContador(obtenerCarrito());

  
  const botones = document.querySelectorAll(".btn-info a");

  botones.forEach((btn, index) => {
    btn.textContent = "Agregar al carrito";

    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const producto = productos[index];

      if (producto) {
        agregarAlCarrito(producto);
        actualizarContador(obtenerCarrito());
      } else {
        console.error("Producto no encontrado en productos.js", index);
      }
    });
  });


  document.getElementById("btn-carrito").addEventListener("click", () => {
    document.getElementById("carrito-panel").classList.toggle("visible");
    renderCarrito(); 
  });

});
