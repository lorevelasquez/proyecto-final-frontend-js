import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const panel = document.getElementById("carrito-panel");
const lista = document.getElementById("carrito-lista");
const totalTxt = document.getElementById("carrito-total");
const btnVaciar = document.getElementById("vaciar-carrito");

export function renderCarrito() { 
    const carrito = obtenerCarrito();
    lista.innerHTML = "";
    let total = 0;

    carrito.forEach((p, i) => {
        total += p.precio;

        const item = document.createElement("div");
        item.classList.add("carrito-item");

        item.innerHTML = `
            <img src="${p.img}">
            <div>
                <h4>${p.nombre}</h4>
                <p>$${p.precio}</p>
            </div>
            <button class="eliminar">✖</button>
        `;

        item.querySelector(".eliminar").addEventListener("click", () => {
            eliminarProducto(i);
            renderCarrito();
        });

        lista.appendChild(item);
    });

    totalTxt.textContent = "$" + total;
    actualizarContador(carrito);
}

btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderCarrito();
});
