import { productos } from "./productos.js";
import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {


  actualizarContador(obtenerCarrito());

  const botones = document.querySelectorAll(".btn-info a");

  botones.forEach((btn, index) => {
    btn.textContent = "Agregar al carrito";

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      agregarAlCarrito(productos[index]); 
      actualizarContador(obtenerCarrito());
    });
  });

  document.getElementById("btn-carrito").addEventListener("click", () => {
    document.getElementById("carrito-panel").classList.toggle("visible");
  });

});
