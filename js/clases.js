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
        tablaGastos.innerHTML = ""; // Limpio los elementos para evitar duplicados al volver a llamar el método

        const gastos = JSON.parse(localStorage.getItem("gastos")) || [];

        // Acá imprimo los gastos en la lista
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

        // A cada boton de editar le agrego un evento para detectar el click
        const botonesEditar = document.querySelectorAll(".btn-editar");
        botonesEditar.forEach((boton) => {
            boton.addEventListener("click", editarGasto);
        });

    }


    eliminarGasto() {
        const tablaEliminarGastos = document.getElementById("tablaEliminarGastos");
        tablaEliminarGastos.innerHTML = ""; // Limpio los elementos para evitar duplicados al volver a llamar el método

        const gastos = JSON.parse(localStorage.getItem("gastos")) || [];

        // Acá imprimo los gastos en la lista
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

        // A cada boton de eliminar le agrego un evento para detectar el click
        const botonesEliminar = document.querySelectorAll(".btn-eliminar");
        botonesEliminar.forEach((boton) => {
            boton.addEventListener("click", eliminarGasto);
        });
    }

    analizarGastos() {
        const tablaListaGastos = document.getElementById("tablaListaGastos");
        tablaListaGastos.innerHTML = ""; // Limpio los elementos para evitar duplicados al volver a llamar el método
        const gastos = JSON.parse(localStorage.getItem("gastos")) || [];

        // Acá imprimo los gastos en la lista
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
        analisisCategorias.innerHTML = ""; // Limpio los elementos para evitar duplicados al volver a llamar el método
        const categorias = obtenerCategorias();
        const totalGasto = calcularTotalGasto(gastos);

        // Creación del chart pie
        const datosPie = categorias.map(categoria => ({
            name: categoria,
            y: calcularPorcentajeCategoria(gastos, categoria, totalGasto)
        }));

        const chartContainer = document.getElementById("analisisCategorias");
        const width = chartContainer.offsetWidth;
        const height = 300;

        Highcharts.chart('analisisCategorias', {
            chart: {
                type: 'pie',
                height: height,
                backgroundColor: 'rgba(0, 0, 0, 0)'
            },
            title: {
                text: `Total de gastos: $${totalGasto}`
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.2f}%',
                    }
                }
            },
            series: [{
                name: '%',
                colorByPoint: true,
                data: datosPie
            }]
        });
    }

}
