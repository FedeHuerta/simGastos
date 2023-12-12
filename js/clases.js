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

    analizarGastos() {
        const tablaListaGastos = document.getElementById("tablaListaGastos");
        tablaListaGastos.innerHTML = "";
        const gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    
        gastos.forEach((gasto) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${gasto.nombre}</td>
                <td>${gasto.categoria}</td>
                <td>$${gasto.monto.toFixed(2)}</td>
            `;
            tablaListaGastos.appendChild(fila);
        });
    
        const analisisCategorias = document.getElementById("analisisCategorias");
        analisisCategorias.innerHTML = "";
        const categorias = obtenerCategorias();
        const totalGasto = calcularTotalGasto(gastos);
        
        categorias.forEach((categoria) => {
            const porcentaje = calcularPorcentajeCategoria(gastos, categoria, totalGasto);
            const divCategoria = document.createElement("div");
            divCategoria.classList.add("mb-2", "p-2", "rounded", "categoria");
            divCategoria.innerHTML = `
                <p class="mb-0">${categoria}: ${porcentaje.toFixed(2)}%</p>
            `;
            analisisCategorias.appendChild(divCategoria);
        });
        
        const divTotal = document.createElement("div");
        divTotal.classList.add("mt-4", "p-2", "text-light", "rounded", "total");
        divTotal.innerHTML = `
            <p class="mb-0">Total de gastos: $${totalGasto.toFixed(2)}</p>
        `;
        analisisCategorias.appendChild(divTotal);
    }

}
