export const actualizarContador = (carrito) => {
    const span = document.getElementById("contador-carrito");
    if (span) span.textContent = carrito.length;
};

export const mostrarMensaje = (msg) => alert(msg);
