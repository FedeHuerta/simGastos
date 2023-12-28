function estadoContenido(seccion, estado) {
    estado === 'ocultar' ? seccion.classList.add("ocultar") :
        estado === 'mostrar' ? (seccion.classList.remove("ocultar"), sessionStorage.setItem('seccionActual', seccion.id)) : // Guardo en SessionStorage la seccion abierta para identificarla al hacer click en volver al menu principal
            console.log("Error, la función estadoContenido solo recibe estado 'ocultar' o 'mostrar'");
}

function validarEntradas(nombre, categoria, monto) {
    return !nombre || !categoria || isNaN(monto) || monto <= 0;
}

function mostrarValidacion(motivo, estado) {
    const mensajesValidacion = document.querySelectorAll(".mensaje-validacion");

    mensajesValidacion.forEach((mensajeValidacion) => {
        if (motivo === "agregar" && estado === "bien") {
            mensajeValidacion.textContent = "¡Gasto Agregado Correctamente!";
            mensajeValidacion.classList.remove("ocultar", "rojo"); // Remuevo clases antes para prevenir superposición
            mensajeValidacion.classList.add("animate__animated", "animate__fadeInDown", "verde");
            setTimeout(() => {
                mensajeValidacion.classList.remove("animate__fadeInDown");
                mensajeValidacion.classList.add("animate__backOutUp");
                setTimeout(() => {
                    mensajeValidacion.classList.add("ocultar");
                }, 2000)
            }, 2000);
        } else if (motivo === "editar" && estado === "bien") {
            mensajeValidacion.textContent = "¡Gasto Editado Correctamente!";
            mensajeValidacion.classList.remove("ocultar", "rojo"); // Remuevo clases antes para prevenir superposición
            mensajeValidacion.classList.add("animate__animated", "animate__fadeInDown", "verde");
            setTimeout(() => {
                mensajeValidacion.classList.remove("animate__fadeInDown");
                mensajeValidacion.classList.add("animate__backOutUp");
                setTimeout(() => {
                    mensajeValidacion.classList.add("ocultar");
                }, 2000)
            }, 2000);
        } else if (motivo === "eliminar" && estado === "bien") {
            mensajeValidacion.textContent = "¡Gasto Eliminado Correctamente!";
            mensajeValidacion.classList.remove("ocultar", "rojo"); // Remuevo clases antes para prevenir superposición
            mensajeValidacion.classList.add("animate__animated", "animate__fadeInDown", "verde");
            setTimeout(() => {
                mensajeValidacion.classList.remove("animate__fadeInDown");
                mensajeValidacion.classList.add("animate__backOutUp");
                setTimeout(() => {
                    mensajeValidacion.classList.add("ocultar");
                }, 2000)
            }, 2000);
        } else if (estado === "mal") {
            mensajeValidacion.textContent = "Por favor, complete todos los campos correctamente.";
            mensajeValidacion.classList.remove("ocultar", "verde"); // Remuevo clases antes para prevenir superposición
            mensajeValidacion.classList.add("animate__animated", "animate__fadeInDown", "rojo");
            setTimeout(() => {
                mensajeValidacion.classList.add("ocultar");
            }, 4000)
        }
    });
}

async function obtenerTasasDeCambio() {
    const divisas = document.getElementById('divisas');
    try {
        // Obtengo tasas de cambio para el dólar blue
        const blueUrl = 'https://dolarapi.com/v1/dolares/blue';
        const blueResponse = await fetch(blueUrl);
        const blueData = await blueResponse.json();
        const blueRate = blueData.venta;

        // Obtengo tasas de cambio para el real brasileño
        const brlUrl = 'https://dolarapi.com/v1/cotizaciones/brl';
        const brlResponse = await fetch(brlUrl);
        const brlData = await brlResponse.json();
        const brlRate = brlData.venta;

        // Obtengo tasas de cambio para el euro
        const eurUrl = 'https://dolarapi.com/v1/cotizaciones/eur';
        const eurResponse = await fetch(eurUrl);
        const eurData = await eurResponse.json();
        const eurRate = eurData.venta;

        // Aprovecho los datos de la api para mostrar cuando fue la ultima actualización de la cotización
        const fechaActualizacion = new Date(blueData.fechaActualizacion);
        document.getElementById('fecha').innerText = `Cotización actualizada al: ${fechaActualizacion.toLocaleDateString()} ${fechaActualizacion.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

        divisas.innerHTML = `<div>Blue: ${blueRate.toFixed(2)}</div>
                            <div>R$: ${brlRate.toFixed(2)}</div>
                            <div>EUR: ${eurRate.toFixed(2)}</div>`;

    } catch (error) {
        Toastify({
            text: `Error al obtener tasas de cambio: ${error.message}`,
            duration: 5000,
            gravity: "top",
            position: 'center',
            close: true,
            backgroundColor: "red",
        }).showToast();
    }
}

function editarGasto(event) {
    const index = event.target.dataset.index;
    const gastos = JSON.parse(localStorage.getItem("gastos")) || [];

    const gasto = gastos[index];

    document.getElementById("nombreGastoEditar").value = gasto.nombre;
    document.getElementById("categoriaGastoEditar").value = gasto.categoria;
    document.getElementById("montoGastoEditar").value = gasto.monto;
    document.getElementById("guardarCambios").setAttribute("data-index", index);

    estadoContenido(secciones.seccionModificarGasto, "ocultar");
    estadoContenido(secciones.seccionEditarGasto, "mostrar");
}

document.getElementById("guardarCambios").addEventListener("click", guardarCambios);

function guardarCambios() {
    const nombreEditado = document.getElementById("nombreGastoEditar").value;
    const categoriaEditada = document.getElementById("categoriaGastoEditar").value;
    const montoEditado = parseFloat(document.getElementById("montoGastoEditar").value);

    const gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    const index = parseInt(document.getElementById("guardarCambios").getAttribute("data-index"), 10);

    if (validarEntradas(nombreEditado, categoriaEditada, montoEditado)) {
        mostrarValidacion("", "mal");
    } else {
        gastos[index].nombre = nombreEditado;
        gastos[index].categoria = categoriaEditada;
        gastos[index].monto = montoEditado;
        localStorage.setItem("gastos", JSON.stringify(gastos));
        mostrarValidacion("editar", "bien");
        iniciar.modificarGasto();
        estadoContenido(secciones.seccionModificarGasto, "mostrar");
        estadoContenido(secciones.seccionEditarGasto, "ocultar");
    }
}

function eliminarGasto(event) {
    const index = event.target.dataset.index;
    let gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    gastos.splice(index, 1);
    mostrarValidacion("eliminar", "bien");
    localStorage.setItem("gastos", JSON.stringify(gastos));
    iniciar.eliminarGasto();
}

function obtenerCategorias() {
    const gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    const categorias = new Set(); // Uso un conjunto set para almacenar las categorias
    gastos.forEach((gasto) => {
        categorias.add(gasto.categoria);
    });
    return Array.from(categorias);
}

function calcularTotalGasto(gastos) {
    return gastos.reduce((total, gasto) => total + gasto.monto, 0);
}

function calcularPorcentajeCategoria(gastos, categoria, totalGasto) {
    const gastosCategoria = gastos.filter((gasto) => gasto.categoria === categoria);
    const totalCategoria = calcularTotalGasto(gastosCategoria);
    return Math.round((totalCategoria / totalGasto) * 100);
}
