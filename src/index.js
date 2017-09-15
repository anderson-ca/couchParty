/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */

const addMovies = require("./addMovies");
const addMoviesPatch = require("./addMoviesPatch");
const deleteMovies = require("./deleteMovies");

///////////////////////////////////////////////
///////////////// variables ///////////////////
///////////////////////////////////////////////
const getMovies = require('./getMovies.js');
let tableBody = document.getElementById("movie-table");
let addButton = document.getElementById("add-button");
let titleInput = document.getElementById("title");
let editTitleInput = document.getElementById("edit-title");
let editButton = document.getElementById("edit-button");
let userRating = document.querySelectorAll(".user-rating");
let editUserRating = document.querySelectorAll(".edit-user-rating");
let movieId = 3;

///////////////////////////////////////////////
/////////////// add movie form ////////////////
///////////////////////////////////////////////

addButton.addEventListener("click", (e) => {
    e.preventDefault();
    // This is the object that is used in addMovies

    // loop
    let radioValue;
    userRating.forEach((element) => {
        if (element.checked) {
            radioValue = element.value
        }
        return radioValue;
    });

    let inputMovie = {
        title: titleInput.value,
        rating: radioValue,
        // id:

    };

    addMovies(inputMovie).then((savedMovie) => /* attach the listener here */ console.log(savedMovie));

    console.log(inputMovie);
});


///////////////////////////////////////////////
/////////// movie creation table //////////////
///////////////////////////////////////////////
getMovies().then((movies) => {
    console.log(movies);
    let msg = "";

    movies.forEach((item) => {
            msg =
                "<tr>" +
                "<td>" + item.id +
                "</td><td>" + item.title +
                "</td><td>" + item.rating +
                "</td><td>" + "<input type = 'submit' class = 'delete' id = 'delete' value='Delete'>" +
                "</td><td>" + "<input type = 'submit' class= 'movies' id = 'edit' value='Edit'>" +
                "</tr>"
                + msg
        }
    );
    tableBody.innerHTML = msg;

    ///////////////////////////////////////////////
    /////////// movie EDIT option /////////////////
    ///////////////////////////////////////////////


    let moviesButton = document.getElementsByClassName("movies");
    console.log(moviesButton);
    for (let movie of moviesButton) {

        movie.addEventListener("click", (e) => {
            let movieInfo = e.target.parentElement.parentElement.children;// tds

            let id = movieInfo[0].innerHTML;
            let title = movieInfo[1].innerHTML;
            let rating = movieInfo[2].innerHTML;
            document.getElementById("movie-id").value = id;
            editTitleInput.value = title;

            console.log(typeof rating);

            for (let i = 1; i <= userRating.length; i++) {
                if (rating == i) {
                    editUserRating[i - 1].checked = true;

                }
            }

        });

    }


    editButton.addEventListener("click", (e) => {
        e.preventDefault();

        console.log(movieId);

        let radioValue;
        editUserRating.forEach((element) => {
            if (element.checked) {
                radioValue = element.value
            }
        });

        let editInputMovie = {
            title: editTitleInput.value,
            rating: radioValue,
            id: document.getElementById("movie-id").value
        };


        console.log(movieId);
        addMoviesPatch(editInputMovie).then((movies) => {
            let test = document.getElementById("movie-table").children;

            for (let row of test) {
                if (row.children[0].innerText == movies.id) {
                    row.children[0].innerText = movies.id;
                    row.children[1].innerText = movies.title;
                    row.children[2].innerText = movies.rating;
                }
            }

        })
    });


    ///////////////////////////////////////////////
    /////////// movie DELETE option ///////////////
    ///////////////////////////////////////////////


    let deleteButtons = document.getElementsByClassName("delete");
    console.log(deleteButtons);

    for (let deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (e) => {

            let movieId = e.target.parentElement.parentElement.children[0].innerHTML;

            let deleteMovie = {
                id: movieId
            };

            deleteMovies(deleteMovie).then((movies) => {
                let row = e.target.parentElement.parentElement;
                row.parentElement.removeChild(row);
                    //.innerHTML = "";
                console.log(movies)

            });

        })
    }


}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});





