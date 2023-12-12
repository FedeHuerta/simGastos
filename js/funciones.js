function estadoContenido(seccion, estado) {
    estado === 'ocultar' ? seccion.classList.add("ocultar") :
    estado === 'mostrar' ? (seccion.classList.remove("ocultar"), sessionStorage.setItem('seccionActual', seccion.id)) :
    console.log("Error, la funcion estadoContenido solo recibe estado 'ocultar' o 'mostrar'");
}

function validarEntradas(nombre, categoria, monto) {
    return !nombre || !categoria || isNaN(monto) || monto <= 0;
}

function mostrarValidacion(motivo, estado) {
    const mensajesValidacion = document.querySelectorAll(".mensaje-validacion");

    mensajesValidacion.forEach((mensajeValidacion) => {
        if (motivo === "agregar" && estado === "bien") {
            mensajeValidacion.textContent = "¡Gasto Agregado Correctamente!";
            mensajeValidacion.classList.remove("ocultar", "rojo");
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
            mensajeValidacion.classList.remove("ocultar", "rojo");
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
            mensajeValidacion.classList.remove("ocultar", "rojo");
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
            mensajeValidacion.classList.remove("ocultar", "verde");
            mensajeValidacion.classList.add("animate__animated", "animate__fadeInDown", "rojo");
            setTimeout(() => {
                mensajeValidacion.classList.add("ocultar");
            }, 4000)
        }
    });
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
    const categorias = new Set();
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