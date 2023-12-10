function estadoContenido(seccion, estado) {
    if (estado === 'ocultar') {
        seccion.classList.add("ocultar");
    } else if (estado === 'mostrar') {
        seccion.classList.remove("ocultar");
        sessionStorage.setItem('seccionActual', seccion.id);
    } else {
        console.log("Error, la funcion estadoContenido solo recibe estado 'ocultar' o 'mostrar'");
    }
}

function validarEntradas(nombre, categoria, monto) {
    return !nombre || !categoria || isNaN(monto) || monto <= 0;
}



function editarGasto(index) {

    const listaDeGastos = JSON.parse(localStorage.getItem("gastos")) || [];
    const gastoSeleccionado = listaDeGastos[index];
    console.log(gastoSeleccionado)

    const inputNombre = document.getElementById("nombreGastoEditar");
    const inputCategoria = document.getElementById("categoriaGastoEditar");
    const inputMonto = document.getElementById("montoGastoEditar");

    inputNombre.value = gastoSeleccionado.nombre;
    inputCategoria.value = gastoSeleccionado.categoria;
    inputMonto.value = gastoSeleccionado.monto;


    estadoContenido(secciones.seccionModificarGasto, 'ocultar');
    estadoContenido(secciones.seccionEditarGasto, 'mostrar');


    const btnGuardarCambios = document.getElementById("guardarCambios");
    btnGuardarCambios.removeEventListener("click", () => guardarCambios(index));
    btnGuardarCambios.addEventListener("click", () => guardarCambios(index));
}

function guardarCambios(index) {
    const listaDeGastos = JSON.parse(localStorage.getItem("gastos")) || [];
    const gastoActualizado = {
        nombre: document.getElementById("nombreGastoEditar").value,
        categoria: document.getElementById("categoriaGastoEditar").value,
        monto: parseFloat(document.getElementById("montoGastoEditar").value),
    };

    debugger;

    
    listaDeGastos[index] = gastoActualizado;
    debugger;

    localStorage.setItem("gastos", JSON.stringify(listaDeGastos));

    
    estadoContenido(secciones.seccionEditarGasto, 'ocultar');
    estadoContenido(secciones.seccionModificarGasto, 'mostrar');
    iniciar.modificarGasto();
}