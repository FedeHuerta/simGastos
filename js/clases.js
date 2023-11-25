class Gasto {
    constructor(nombre, categoria, monto) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.monto = monto;
    }
}

class ListaGastos {
    constructor() {
        this.listaDeGastos = [];
    }

    //Metodos
    agregarGasto() {
        let nombre;
        let categoria;
        let monto;

        // VALIDACION PARA NOMBRE
        do {
            nombre = prompt(`Introduce el nombre del gasto o introduce "Q" para regresar:`);
            if (nombre.toUpperCase() === "Q") {
                return;
            } else if (nombre.length < 2) {
                alert("El nombre del gasto debe contener al menos 2 caracteres!");
            }
        } while (nombre.length < 2);

        //VALIDACION PARA CATEGORIA
        while (true) {
            categoria = prompt(
                `Selecciona la categoría de su gasto: \n` +
                `1: Compras \n` +
                `2: Entretenimiento \n` +
                `3: Restaurantes y Bares \n` +
                `4: Salud y Deporte \n` +
                `5: Servicios \n` +
                `6: Sin Categoría \n` +
                `7: Supermercados \n` +
                `8: Transporte \n` +
                `9: Vacaciones`
            );

            switch (categoria) {
                case "1":
                    categoria = "Compras";
                    break;
                case "2":
                    categoria = "Entretenimiento";
                    break;
                case "3":
                    categoria = "Restaurantes y Bares";
                    break;
                case "4":
                    categoria = "Salud y Deporte";
                    break;
                case "5":
                    categoria = "Servicios";
                    break;
                case "6":
                    categoria = "Sin Categoría";
                    break;
                case "7":
                    categoria = "Supermercados";
                    break;
                case "8":
                    categoria = "Transporte";
                    break;
                case "9":
                    categoria = "Vacaciones";
                    break;
                default:
                    alert("Categoría no válida. Introduce una opción válida.");
                    continue;
            }
            break;
        }

        //VALIDACION PARA MONTO
        do {
            monto = parseFloat(prompt("Ingrese el monto del gasto"));
            if (isNaN(monto) || monto <= 0) {
                alert("Por favor, ingrese un monto válido.");
            }
        } while (isNaN(monto) || monto <= 0);

        let nuevoGasto = new Gasto(nombre, categoria, monto);
        this.listaDeGastos.push(nuevoGasto);
        alert("Gasto Agregado.");
    }


    modificarGasto() {
        if (this.listaDeGastos.length === 0) {
            alert("No hay gastos registrados.");
            return;
        }
        let listaTexto = `Lista de gastos: \n`;

        // Le muestro lista de gastos al usuario para tener los nombres a la vista
        this.listaDeGastos.forEach(gasto => {
            listaTexto += `Nombre: ${gasto.nombre}, Categoria: ${gasto.categoria}, Monto: ${gasto.monto} \n`;
        });

        let gastoAModificar;
        let nombreGasto;

        do {
            nombreGasto = prompt(`${listaTexto} \n \n` +
                `Ingrese el nombre del gasto a modificar o ingrese "Q" para regresar:`);

            if (nombreGasto.toUpperCase() === "Q") {
                return;
            }

            gastoAModificar = this.listaDeGastos.find(gasto => gasto.nombre.toLowerCase() === nombreGasto.toLowerCase());

            if (!gastoAModificar) {
                alert("Gasto no encontrado. Intente de nuevo.");
            }
        } while (!gastoAModificar);

        let opcion;

        do {
            opcion = prompt(`¿Qué desea modificar?\n1: Nombre\n2: Categoría\n3: Monto`);

            switch (opcion) {
                case "1":
                    do {
                        gastoAModificar.nombre = prompt("Introduce el nuevo nombre del gasto:");
                        if (gastoAModificar.nombre.length < 2) {
                            alert("El nombre del gasto debe contener al menos 2 caracteres!");
                        }
                    } while (gastoAModificar.nombre.length < 2);
                    alert("Nombre modificado con éxito.");
                    break;
                case "2":
                    while (true) {
                        gastoAModificar.categoria = prompt(
                            `Selecciona la categoría de su gasto: \n` +
                            `1: Compras \n` +
                            `2: Entretenimiento \n` +
                            `3: Restaurantes y Bares \n` +
                            `4: Salud y Deporte \n` +
                            `5: Servicios \n` +
                            `6: Sin Categoría \n` +
                            `7: Supermercados \n` +
                            `8: Transporte \n` +
                            `9: Vacaciones`
                        );

                        switch (gastoAModificar.categoria) {
                            case "1":
                                gastoAModificar.categoria = "Compras";
                                break;
                            case "2":
                                gastoAModificar.categoria = "Entretenimiento";
                                break;
                            case "3":
                                gastoAModificar.categoria = "Restaurantes y Bares";
                                break;
                            case "4":
                                gastoAModificar.categoria = "Salud y Deporte";
                                break;
                            case "5":
                                gastoAModificar.categoria = "Servicios";
                                break;
                            case "6":
                                gastoAModificar.categoria = "Sin Categoría";
                                break;
                            case "7":
                                gastoAModificar.categoria = "Supermercados";
                                break;
                            case "8":
                                gastoAModificar.categoria = "Transporte";
                                break;
                            case "9":
                                gastoAModificar.categoria = "Vacaciones";
                                break;
                            default:
                                alert("Categoría no válida. Introduce una opción válida.");
                                continue;
                        }
                        break;
                    }
                    alert("Categoría modificada con éxito.");
                    break;
                case "3":
                    do {
                        gastoAModificar.monto = parseFloat(prompt("Ingrese el monto del gasto"));
                        if (isNaN(gastoAModificar.monto) || gastoAModificar.monto <= 0) {
                            alert("Por favor, ingrese un monto válido.");
                        }
                    } while (isNaN(gastoAModificar.monto) || gastoAModificar.monto <= 0);
                    alert("Monto modificado con éxito.");
                    break;
                default:
                    alert("Opción no válida. Intente de nuevo.");
            }
        } while (opcion !== "1" && opcion !== "2" && opcion !== "3");
    }


    eliminarGasto() {
        if (this.listaDeGastos.length === 0) {
            alert("No hay gastos registrados.");
            return;
        }
        let listaTexto = `Lista de gastos: \n`;
        // Le muestro lista de gastos al usuario para tener los nombres a la vista
        this.listaDeGastos.forEach(gasto => {
            listaTexto += `Nombre: ${gasto.nombre}, Categoria: ${gasto.categoria}, Monto: ${gasto.monto} \n`;
        });

        let gastoAEliminar;
        let nombreGasto;
        do {
            nombreGasto = prompt(`${listaTexto} \n \n` +
                `Ingrese el nombre del gasto a eliminar o ingrese "Q" para regresar:`);

            if (nombreGasto.toUpperCase() === "Q") {
                return;
            }

            gastoAEliminar = this.listaDeGastos.find(gasto => gasto.nombre.toLowerCase() === nombreGasto.toLowerCase());
            if (!gastoAEliminar) {
                alert("Gasto no encontrado. Intente de nuevo.");
            }
        } while (!gastoAEliminar);

        // Ahora que tengo el gasto a eliminar, lo saco de la lista
        let indiceGasto = this.listaDeGastos.indexOf(gastoAEliminar);
        this.listaDeGastos.splice(indiceGasto, 1);

        alert(`Gasto "${gastoAEliminar.nombre}" eliminado con éxito.`);
    }


    mostrarGastos() {
        if (this.listaDeGastos.length === 0) {
            alert("No hay gastos registrados.");
            return;
        }
        let lista = `Lista de gastos: \n`;
        this.listaDeGastos.forEach(gasto => {
            lista += `Nombre: ${gasto.nombre}, Categoria: ${gasto.categoria}, Monto: ${gasto.monto} \n`;
        });
        alert(`${lista}`);
    }


    analisisGastos() {
        if (this.listaDeGastos.length === 0) {
            alert("No hay gastos registrados.");
            return;
        }
        let contadorCategorias = {};
        let totalMonto = 0; // Variable para almacenar el monto total gastado
        // Cuento la cantidad total de gastos y sumo los montos
        this.listaDeGastos.forEach(gasto => {
            totalMonto += gasto.monto;

            if (contadorCategorias[gasto.categoria]) {
                contadorCategorias[gasto.categoria]++;
            } else {
                contadorCategorias[gasto.categoria] = 1;
            }
        });
    
        let listaTexto = `Lista de gastos: \n`;
        // Le muestro lista de gastos al usuario para tener los nombres a la vista
        this.listaDeGastos.forEach(gasto => {
            listaTexto += `Nombre: ${gasto.nombre}, Categoria: ${gasto.categoria}, Monto: ${gasto.monto} \n`;
        });
    
        let mensaje = "\nAnálisis de Gastos por Categoría:\n";
        for (let categoria in contadorCategorias) {
            let porcentaje = (contadorCategorias[categoria] / this.listaDeGastos.length) * 100;
            mensaje += `${categoria}: ${porcentaje.toFixed(2)}%\n`;
        }
    
        let totalGastosTexto = `\nTotal de Gastos: ${this.listaDeGastos.length}\n`; // Número total de gastos
        let totalMontoTexto = `Total Gastado: $${totalMonto.toFixed(2)}\n`; // Monto total gastado
    
        let listaFinal = listaTexto + mensaje + totalGastosTexto + totalMontoTexto;
        alert(listaFinal);
    }
}
