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

        let nombre = nombreGasto.value;
        let categoria = categoriaGasto.value;
        let monto = parseFloat(montoGasto.value);

        
        if (validarEntradas(nombre, categoria, monto)) {
            mostrarValidacion("", "mal");
        } else {
            this.nuevoGasto = new Gasto(nombre, categoria, monto);
            this.listaDeGastos.push(this.nuevoGasto);
            this.guardarEnLocalStorage();
            nombreGasto.value = "";
            categoriaGasto.value = "";
            montoGasto.value = "";
            mostrarValidacion("agregar", "bien");
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
        const tablaGastos = document.getElementById("tablaGastos");
        tablaGastos.innerHTML = "";
    
        const gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    
        gastos.forEach((gasto, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${gasto.nombre}</td>
                <td>${gasto.categoria}</td>
                <td>$${gasto.monto.toFixed(2)}</td>
                <td>
                    <button type="button" class="btn btn-info btn-editar" data-index="${index}">Editar</button>
                </td>
            `;
            tablaGastos.appendChild(fila);
        });
    
        const botonesEditar = document.querySelectorAll(".btn-editar");
        botonesEditar.forEach((boton) => {
            boton.addEventListener("click", editarGasto);
        });

    }


    eliminarGasto() {
        const tablaEliminarGastos = document.getElementById("tablaEliminarGastos");
        tablaEliminarGastos.innerHTML = "";

        const gastos = JSON.parse(localStorage.getItem("gastos")) || [];

        gastos.forEach((gasto, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${gasto.nombre}</td>
                <td>${gasto.categoria}</td>
                <td>$${gasto.monto.toFixed(2)}</td>
                <td>
                    <button type="button" class="btn btn-danger btn-eliminar" data-index="${index}">Eliminar</button>
                </td>
            `;
            tablaEliminarGastos.appendChild(fila);
        });

        const botonesEliminar = document.querySelectorAll(".btn-eliminar");
        botonesEliminar.forEach((boton) => {
            boton.addEventListener("click", eliminarGasto);
        });
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
