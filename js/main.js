const iniciar = new ListaGastos();

let botones = {
    agregarGasto: document.getElementById("agrGasto"),
    enviarGasto: document.getElementById("enviarGasto"),
    modificarGasto: document.getElementById("modGasto"),
    eliminarGasto: document.getElementById("eliGasto"),
    mostrarGasto: document.getElementById("mosGasto"),
    analisisGasto: document.getElementById("anaGasto"),
    volverAlMenu: document.querySelectorAll(".volver-menu")
}

let secciones = {
    menuPrincipal: document.getElementById("menuPrincipal"),
    seccionAgregarGasto: document.getElementById("seccionAgregarGasto"),
    seccionModificarGasto: document.getElementById("seccionModificarGasto"),
    seccionEditarGasto: document.getElementById("seccionEditarGasto")
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
    estadoContenido(botones.menuPrincipal, 'ocultar');
    estadoContenido(botones.eliminarGasto, 'mostrar');
})

botones.mostrarGasto.addEventListener("click", function () {
    estadoContenido(botones.menuPrincipal, 'ocultar');
    estadoContenido(botones.mostrarGasto, 'mostrar');
})

botones.analisisGasto.addEventListener("click", function () {
    estadoContenido(botones.menuPrincipal, 'ocultar');
    estadoContenido(botones.analisisGasto, 'mostrar');
})


botones.volverAlMenu.forEach(boton => {
    boton.addEventListener("click", function() {
        let seccionActual = sessionStorage.getItem('seccionActual');
        if (seccionActual) {
            let elementoSeccionActual = document.getElementById(seccionActual);
            if(elementoSeccionActual) {
                estadoContenido(elementoSeccionActual, 'ocultar');
            }
        }
        estadoContenido(secciones.menuPrincipal, 'mostrar');
    });
});
