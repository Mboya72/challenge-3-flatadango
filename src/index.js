// Your code here


const filmTime = document.getElementById('film-item')
//declare the json url as an API for easy access.
const API = "http://localhost:3000/films";

fetch(API)
    .then((res) => res.json())
    .then(renderFilm)
//const allMovies = renderFilm;


//rendering only the one poster and its details.
function renderFilm(film) {
    const filmMenuDiv = document.getElementById("poster");
    const titleDiv = document.getElementById("film-info");
    const runDiv = document.getElementById("runtime")
    const showDiv = document.getElementById("showtime")
    const availableDiv = document.getElementById("ticket-num")

    filmMenuDiv.src = film.poster;

    titleDiv.textContent = film.title;

    runDiv.textContent = film.runtime;

    showDiv.textContent = film.showtime;

    const filmCap = film.capacity
    const filmTick = film.tickets_sold

    availableDiv.textContent = (filmCap - filmTick);

    console.log(availableDiv.textContent)
    //Buy tickets button
    const button = document.getElementById("buy-ticket");
    const btn = parseInt(availableDiv.innerText);
    console.log(btn);
    button.addEventListener('click', () => {
        if (btn >= 1) {
            availableDiv.innerText = (availableDiv.innerText - 1)

        }

        if (availableDiv.innerText < 0) {
            availableDiv.innerText = '0';
            alert('Sorry, we are currently sold out of tickets for this film.')
        }

        if (availableDiv.innerHTML <= 0) {
            button.innerHTML = 'SOLD OUT'
        }


    })

}
//Get the movie list.
function getFilms() {
    fetch(API)
        .then((response) => response.json())
        .then(renderFilms);
}
getFilms();

function renderFilms(films) {
    films.forEach(filmDetails); console.log(films)
}

function filmDetails(details) {
    const titlesElement = document.getElementById("films");

    let listElement = document.createElement("li");
    listElement.innerText = details.title;
    listElement.className = 'film-item'

    let imgElement = document.createElement("film-details");
    imgElement.src = details.poster;
    console.log(imgElement)
    const moviePoster = document.getElementById('poster')

    titlesElement.append(listElement);
    listElement.addEventListener('click', () => {
        console.log(details.title)
        document.getElementById('title').innerText = details.title
        document.getElementById('runtime').innerText = details.runtime
        document.getElementById('film-info').innerText = details.description
        document.getElementById('showtime').innerText = details.showtime
        document.getElementById('ticket-num').innerText = details.capacity - details.tickets_sold
        moviePoster.src = details.poster
    })
}

