const iniciar = new ListaGastos();

obtenerTasasDeCambio();
setInterval(obtenerTasasDeCambio, 100000);

let botones = {
    agregarGasto: document.getElementById("agrGasto"),
    enviarGasto: document.getElementById("enviarGasto"),
    modificarGasto: document.getElementById("modGasto"),
    eliminarGasto: document.getElementById("eliGasto"),
    analisisGasto: document.getElementById("anaGasto"),
    volverAlMenu: document.querySelectorAll(".volver-menu")
}

let secciones = {
    menuPrincipal: document.getElementById("menuPrincipal"),
    seccionAgregarGasto: document.getElementById("seccionAgregarGasto"),
    seccionModificarGasto: document.getElementById("seccionModificarGasto"),
    seccionEditarGasto: document.getElementById("seccionEditarGasto"),
    seccionEliminarGasto: document.getElementById("seccionEliminarGasto"),
    seccionAnalisisGastos: document.getElementById("seccionAnalisisGastos")
}

botones.agregarGasto.addEventListener("click", function () {
    estadoContenido(secciones.menuPrincipal, 'ocultar');
    estadoContenido(secciones.seccionAgregarGasto, 'mostrar');
})

botones.enviarGasto.addEventListener('click', function (event) {
    event.preventDefault();
    iniciar.agregarGasto();
});

botones.modificarGasto.addEventListener("click", function () {
    estadoContenido(secciones.menuPrincipal, 'ocultar');
    estadoContenido(secciones.seccionModificarGasto, 'mostrar');
    iniciar.modificarGasto();
})

botones.eliminarGasto.addEventListener("click", function () {
    estadoContenido(secciones.menuPrincipal, 'ocultar');
    estadoContenido(secciones.seccionEliminarGasto, 'mostrar');
    iniciar.eliminarGasto();
})

botones.analisisGasto.addEventListener("click", function () {
    estadoContenido(secciones.menuPrincipal, 'ocultar');
    estadoContenido(secciones.seccionAnalisisGastos, 'mostrar');
    iniciar.analizarGastos();
})

// Busco de SessionStorage la sección en la que se encuentra el usuario y la oculto
botones.volverAlMenu.forEach(boton => {
    boton.addEventListener("click", function () {
        let seccionActual = sessionStorage.getItem('seccionActual');
        if (seccionActual) {
            let elementoSeccionActual = document.getElementById(seccionActual);
            if (elementoSeccionActual) {
                estadoContenido(elementoSeccionActual, 'ocultar');
            }
        }
        estadoContenido(secciones.menuPrincipal, 'mostrar');
    });
});