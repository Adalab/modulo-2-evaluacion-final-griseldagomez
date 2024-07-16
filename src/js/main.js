'use strict';

//Pasos en humano

// Primera parte (Buscar)

// - Crear la estructura donde la usuaria buscara la serie.
// - Saber cuales y cuantas seran las series que la usuaria podra elegir.
// - Saber cuando la usuaria hace click en Buscar la Serie.
// - Recoger los datos de la elección de la usuaria.
// - Mostrar en el DOM la elección de la usuaria.

// Segunda parte (Favoritos)

// - La persona podrá elegir como favoritas cualquiera de las opciones de series.
// -Se cambiaran el color de fondo  y de fuente de la serie seleccionada.
// - Mostrar la elección favorita de la usuaria en la parte izquierda de la pantalla debajo del formulario de búsqueda.
// - La serie favorita seguirá mostrándose en el DOM aunque la usuaria realice otra búsqueda.

// Tercera parte (Almacenamiento local)

// -Guardar las selecciones favoritas de la usuaria en el navegador local.
// -Al recargar la pagina se mostrará el listado de favoritos.


const input = document.querySelector('.js-input');
const button1 = document.querySelector('.js-button');


fetch







//Escuchando el evento(probando que funcione)
const handlebutton1 = function() {
event.preventDefault()
    console.log('click');
}
button1.addEventListener('click',handlebutton1);
