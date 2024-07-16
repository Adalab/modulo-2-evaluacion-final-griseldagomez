'use strict';

//Pasos en humano

// Primera parte (Buscar)

// - Crear la estructura donde la usuaria buscara la serie.
// - Saber cuando la usuaria hace click en Buscar la Serie. Pedir la lista de series.
// - Recoger los datos de la elección de la usuaria.
// - Mostrar en el DOM la elección de la usuaria.

// Segunda parte (Favoritos)

// - La persona podrá elegir como favoritas cualquiera de las opciones de series.(tengo que escuchar el click y buscar la propiedad de la tarjeta)
// - Se cambiaran el color de fondo  y de fuente de la serie seleccionada. se añadirá a favoritos
// - Mostrar la elección favorita de la usuaria en la parte izquierda de la pantalla debajo del formulario de búsqueda.
// - La serie favorita seguirá mostrándose en el DOM aunque la usuaria realice otra búsqueda.

// Tercera parte (Almacenamiento local)

// -Guardar las selecciones favoritas de la usuaria en el navegador local.
// -Al recargar la pagina se mostrará el listado de favoritos.


const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');
const container = document.querySelector('.js-container');
const favorite = document.querySelector('.js-container-favorites');


//Creo una variable global para el arry de las series
let seriesList = [];
//variable fuera para favoritos
let favoriteSeries = [];

//defino la funsion para renderizar las series
function renderSeries(series, container) {
    container.innerHTML = "";//se lo agrego para que vacie el container

    //Pintar la tarjeta en la pagina con DOM //serie contine los datos del arry.
    for (const serie of series) {
        const cardSeries = document.createElement('div');
        cardSeries.dataset.id = serie.mal_id; //con los id identifico el click
        cardSeries.className = 'js-style'; //me sirve para escuchar el evento

        const cardTitle = document.createElement('h2');
        const textitle = document.createTextNode(serie.title);
        cardTitle.appendChild(textitle);
        const cardImg = document.createElement('img');
        cardImg.setAttribute('src', serie.images.jpg.image_url);

        cardSeries.appendChild(cardTitle);
        cardSeries.appendChild(cardImg);
        container.appendChild(cardSeries);

        cardSeries.addEventListener('click', handleFavorites);
        console.log(serie);
    }
}


//Escucho el click de la usuario en la serie con id.
function handleFavorites(event) {
    const idClickSerie = (event.currentTarget.dataset.id);
    const serieSelected = seriesList.find((serie) => {
        return idClickSerie == serie.mal_id;
    });

    const indexSeriefavorite = favoriteSeries.findIndex((favoriteSerie) => {
        return idClickSerie == favoriteSerie.mal_id;
        console.log(indexSeriefavorite);
    });
    if (indexSeriefavorite === -1) {
        favoriteSeries.push(serieSelected);//añado la serie
        renderSeries(favoriteSeries, favorite);
    }
};

//Creo una funsion para el fetch
const getDataApiAndRenderSeries = (value) => {
    fetch(`https://api.jikan.moe/v4/anime?q=${value}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            seriesList = data.data;
            
            localStorage.setItem("data", JSON.stringify (seriesList) );
            renderSeries(seriesList, container); 
        });
}

//funcion manejadora// se recogen los datos del input

function handleClick(event) {
    event.preventDefault();
    //si la usuaria hace click ....
    if (input.value) {
        getDataApiAndRenderSeries(input.value);
    }
}
button.addEventListener('click', handleClick);
