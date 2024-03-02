$(document).ready(function () {
    // Restricciones de fechas al cargar la página
    let fechaActual = obtenerFechaActual();
    $('#fechaEntrada').attr('min', fechaActual);
    $('#fechaSalida').attr('min', fechaActual);

    // Restricciones de fechas al cambiar la fecha de entrada
    $('#fechaEntrada').change(function () {
        let fechaEntrada = $(this).val();
        $('#fechaSalida').attr('min', fechaEntrada);
    });
});

function obtenerFechaActual() {
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let ano = fecha.getFullYear();

    if (dia < 10) {
        dia = "0" + dia;
    }

    if (mes < 10) {
        mes = "0" + mes;
    }

    return ano + "-" + mes + "-" + dia;
}

let formularioBusqueda = document.getElementById('buscarForm');
formularioBusqueda.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores de búsqueda del formulario
    let tipoSeleccionado = document.getElementById('tipoHabitacion').value;
    let fechaEntrada = document.getElementById('fechaEntrada').value;
    let fechaSalida = document.getElementById('fechaSalida').value;
    let numPersonas = document.getElementById('numPersonas').value;

    fetch('http://localhost:3000/habitaciones?tipoHabitacion=' + tipoSeleccionado + '&fechaEntrada=' + fechaEntrada + '&fechaSalida=' + fechaSalida + '&numPersonas=' + numPersonas)
        .then(response => response.json())
        .then(data => {
            // Almacena los datos en el localStorage
            localStorage.setItem('habitaciones', JSON.stringify(data));

            console.log(data);

            // Redirige a la otra página
            window.location.href = 'habitaciones.html';
        })
        .catch(error => console.error('Error:', error));
});




// fetch('http://localhost:3000/habitaciones?tipoHabitacion=' + tipoSeleccionado + '&fechaEntrada=' + fechaEntrada + '&fechaSalida=' + fechaSalida + '&numPersonas=' + numPersonas)
//         .then(response => response.json())
//         .then(data => {
//             // Aquí puedes procesar el array de habitaciones y actualizar tu página
//             // Obtén el contenedor de las tarjetas
//             var contenedor = document.getElementById('contenedor-de-tarjetas');

//             // Elimina las tarjetas preexistentes
//             contenedor.innerHTML = '';

//             // data es un array con los datos de las habitaciones
//             data.forEach(habitacion => {
//                 // Crea un nuevo elemento div para la habitación
//                 var div = document.createElement('div');
//                 div.className = 'col-md-4';
//                 div.dataset.tipo = habitacion.tipo;
//                 div.dataset.fechaEntrada = habitacion.fechaEntrada;
//                 div.dataset.fechaSalida = habitacion.fechaSalida;
//                 div.dataset.numPersonas = habitacion.numPersonas;

//                 // Mapea los números a los nombres de las habitaciones
//                 var tiposHabitacion = {
//                     1: 'Habitación Simple',
//                     2: 'Habitación Doble',
//                     3: 'Habitación Superior'
//                 };

//                 // Llena el div con el HTML de la tarjeta
//                 div.innerHTML = `
//                 <div class="card text-dark text-center bg-light p-2">
//                     <img src="img/home-2.jpg" alt="" class="card-img-top">
//                     <div class="card-body">
//                         <h5 class="card-title">${tiposHabitacion[habitacion.tipo_habitacion]}</h5>
//                         <p class="card-text">${habitacion.descripcion}</p>
//                         <hr>
//                         <p class="card-text">Desde $${habitacion.precio} por noche</p>
//                         <a href="#" class="btn btn-reservar mt-auto">Reservar</a>
//                     </div>
//                 </div>
//             `;

//                 // Añade el div al contenedor
//                 contenedor.appendChild(div);
//             });
//         })
//         .catch(error => console.error('Error:', error));