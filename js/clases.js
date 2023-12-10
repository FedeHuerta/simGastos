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
        this.nuevoGasto = null;
    }

    //Metodos
    agregarGasto() {
        let nombreGasto = document.getElementById("nombreGasto");
        let categoriaGasto = document.getElementById("categoriaGasto");
        let montoGasto = document.getElementById("montoGasto");
        let mensajeValidacion = document.getElementById("mensajeValidacion");

        let nombre = nombreGasto.value;
        let categoria = categoriaGasto.value;
        let monto = parseFloat(montoGasto.value);
        mensajeValidacion.textContent = "";

        // VALIDACION PARA NOMBRE
        if (validarEntradas(nombre, categoria, monto)) {
            mensajeValidacion.classList.remove("ocultar", "verde");
            mensajeValidacion.classList.add("animate__animated", "animate__fadeInDown", "rojo");
            mensajeValidacion.textContent = "Por favor, complete todos los campos correctamente.";
        } else {
            this.nuevoGasto = new Gasto(nombre, categoria, monto);
            this.listaDeGastos.push(this.nuevoGasto);
            this.guardarEnLocalStorage();
            nombreGasto.value = "";
            categoriaGasto.value = "";
            montoGasto.value = "";
            mensajeValidacion.classList.remove("ocultar", "rojo");
            mensajeValidacion.classList.add("animate__animated", "animate__fadeInDown", "verde");
            mensajeValidacion.textContent = "¡Gasto Agregado Correctamente!";
            setTimeout(function () {
                mensajeValidacion.classList.add("ocultar");
            }, 3000);
        }
    }

    guardarEnLocalStorage() {
        let gastosGuardados = JSON.parse(localStorage.getItem('gastos')) || [];
        gastosGuardados.push({
            nombre: this.nuevoGasto.nombre,
            categoria: this.nuevoGasto.categoria,
            monto: this.nuevoGasto.monto
        });
        localStorage.setItem('gastos', JSON.stringify(gastosGuardados));
    }

    modificarGasto() {
        const listaDeGastos = JSON.parse(localStorage.getItem("gastos")) || [];
        const tablaGastos = document.getElementById("tablaGastos");

        tablaGastos.innerHTML = "";
        listaDeGastos.forEach((gasto, index) => {
            const fila = document.createElement("tr");

            const columnas = [
                document.createElement("td"),
                document.createElement("td"),
                document.createElement("td"),
                document.createElement("td")
            ];

            columnas[0].textContent = gasto.nombre;
            columnas[1].textContent = gasto.categoria;
            columnas[2].textContent = `$${gasto.monto.toFixed(2)}`;

            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.classList.add("btn", "btn-sm", "btn-warning");
            btnEditar.addEventListener("click", () => editarGasto(index));
            columnas[3].appendChild(btnEditar);
            columnas.forEach(col => fila.appendChild(col));

            tablaGastos.appendChild(fila);
        });

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
