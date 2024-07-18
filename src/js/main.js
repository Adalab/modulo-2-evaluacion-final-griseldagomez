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
const reset = document.querySelector('.js-button2');
const container = document.querySelector('.js-container');
const favorite = document.querySelector('.js-container-favorites');

//INICIALIZACION DE MODELO

//Creo una variable global para el arry de las series
let seriesList = [];
let favoriteSeries = [];

const getfavorite = localStorage.getItem("favoritos");//es lo ultimo que se guardo y lo primero que tengo que mostrar

if (getfavorite !== null) {
    favoriteSeries = JSON.parse(getfavorite);
    renderSeries(favoriteSeries, favorite);
}

//RENDER//VISTA SE DEFINE COMO DE DEBEN MOSTRAR LOS DATOS
//toma datos, genera una vista(pinta el html)
function renderSeries(series, container, removable) {
    container.innerHTML = "";//se lo agrego para que vacie el container

    //Pintar la tarjeta en la pagina con DOM //serie contiene los datos del arry.
    for (const serie of series) {
        const cardSeries = document.createElement('div');
        cardSeries.dataset.id = serie.mal_id; //con los id identifico el click
        

        const cardTitle = document.createElement('h2');
        const textitle = document.createTextNode(serie.title);
        cardTitle.appendChild(textitle);
        const cardImg = document.createElement('img');
        cardImg.setAttribute('src', serie.images.jpg.image_url);
        const icono = document.createElement('i');
        const text = document.createTextNode('x');
        icono.appendChild(text);

        cardSeries.appendChild(icono);
        cardSeries.appendChild(cardTitle);
        cardSeries.appendChild(cardImg);
        container.appendChild(cardSeries);

        cardSeries.addEventListener('click', handleFavorites); //se escucha el click en la tarjeta y se añade a favoritos
        console.log(serie);
    }
}

//Escucho el click de la usuario en la serie con id.
function handleFavorites(event) {
    const idClickSerie = (event.currentTarget.dataset.id);//se busca el objeto dentro del array principal
    const serieSelected = seriesList.find((serie) => {
        return idClickSerie == serie.mal_id;
    });

    const indexSeriefavorite = favoriteSeries.findIndex((favoriteSerie) => { //se busca el indice del favorito
        return idClickSerie == favoriteSerie.mal_id;
        console.log(indexSeriefavorite);
    });
    if (indexSeriefavorite === -1) {
        favoriteSeries.push(serieSelected);//añado la serie
        localStorage.setItem("favoritos", JSON.stringify(favoriteSeries));//si index no esta en favoritos lo agrego
        renderSeries(favoriteSeries, favorite);// renderizo.
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


//BOTON RESET
//cree un boton en html reset / cree un funsion manejadora /vacie los arry/las redner para que las identifique/ypor ultimo las quito de local.Store
const handleReset = (event) => {
    seriesList = [];
    favoriteSeries = [];
    renderSeries(seriesList, container);
    renderSeries(favoriteSeries, favorite);
    localStorage.removeItem("favoritos");
}
//cree el evento.
reset.addEventListener('click', handleReset);

//CADA VEZ QEU ACTUALIZO EL MODELO(LOS DATOS QUE DEBE TENER LA APLICACION)TENGO QUE VOLVER A RENDERIZAR.