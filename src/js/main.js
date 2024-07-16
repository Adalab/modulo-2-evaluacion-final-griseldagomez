'use strict';

//Pasos en humano

// Primera parte (Buscar)

// - Crear la estructura donde la usuaria buscara la serie.
// - Saber cuando la usuaria hace click en Buscar la Serie. Pedir la lista de series.
// - Recoger los datos de la elección de la usuaria.
// - Mostrar en el DOM la elección de la usuaria.

// Segunda parte (Favoritos)

// - La persona podrá elegir como favoritas cualquiera de las opciones de series.
// - Se cambiaran el color de fondo  y de fuente de la serie seleccionada.
// - Mostrar la elección favorita de la usuaria en la parte izquierda de la pantalla debajo del formulario de búsqueda.
// - La serie favorita seguirá mostrándose en el DOM aunque la usuaria realice otra búsqueda.

// Tercera parte (Almacenamiento local)

// -Guardar las selecciones favoritas de la usuaria en el navegador local.
// -Al recargar la pagina se mostrará el listado de favoritos.


const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');
const container = document.querySelector('.js-container');

//Creo una variable global para el arry de las series
let seriesList = [];
//defino la funsion para renderizar las series
function renderSeries(series, container) {

    //Pintar la tarjeta en la pagina con DOM //serie contine los datos del arry.
    for (const serie of series) {
        const cardSeries = document.createElement('div');
        const cardTitle = document.createElement('h2');
        const textitle =document.createTextNode(serie.title);
        cardTitle.appendChild(textitle);
        const cardImg = document.createElement('img');
        cardImg.setAttribute('src', serie.images.jpg.image_url);
        container.appendChild(cardSeries);
        cardSeries.appendChild(cardTitle);
        cardSeries.appendChild(cardImg);
        console.log(serie);
    }
}

//Creo una funsion para el fetch
const getDataApiAndRenderSeries = (value) => {
    fetch(`https://api.jikan.moe/v4/anime?q=${value}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            seriesList = data.data;
            renderSeries(seriesList, container);
        });
}

// cuando la usuaria hace click en botton buscar hay que llmar a getDataApiAndRenderSeries.

//funcion manejadora// se recogen los datos

function handleClick(event) {
    event.preventDefault();
    //si la usuaria hace click ....
    if (input.value) {
        getDataApiAndRenderSeries(input.value);
    }
}
button.addEventListener('click', handleClick);
