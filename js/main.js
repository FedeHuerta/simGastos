const iniciar = new ListaGastos();

let encendido = true;

while (encendido) {
    let opcion = prompt(`Elija una opción: \n` + `1: Agregar un gasto. \n` + `2: Modificar un gasto. \n` + `3: Eliminar un gasto. \n` + `4: Mostrar lista de gastos. \n` + `5: Análisis de gastos. \n` + `6: Salir.`)

    switch (opcion) {
        case "1":
            iniciar.agregarGasto();
            break;
        case "2":
            iniciar.modificarGasto();
            break;
        case "3":
            iniciar.eliminarGasto();
            break;
        case "4":
            iniciar.mostrarGastos();
            break;
        case "5":
            iniciar.analisisGastos();
            break;
        case "6":
            alert("Saliendo... ¡Hasta luego!");
            encendido = false;
            break;
        default:
            alert("Opción no válida. Por favor, seleccione una opción válida.");
            break;
    }
}
