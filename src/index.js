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
let addMovieForm = document.getElementById("add-movie");
let pullUpAddForm = document.getElementById("pull-up-add-form");
let pullUpEditForm = document.getElementById("pull-up-edit-form");
let editMovieForm = document.getElementById("edit-form");
let mainTable = document.getElementsByTagName("table")[0];
let loader = document.getElementById("loader");
let tableHead = document.getElementById("table-head");


let userRating = document.querySelectorAll(".user-rating");
let editUserRating = document.querySelectorAll(".edit-user-rating");

let movieId = 3;

///////////////////////////////////////////////
/////////////// add movie form ////////////////
///////////////////////////////////////////////

pullUpAddForm.addEventListener("click", (e) => {
    addMovieForm.style.display = "block";

});

// pullUpEditForm.addEventListener("click", (e) => {
//     editMovieForm.style.display = "block";
//
// });



addButton.addEventListener("click", (e) => {
    e.preventDefault();


    // Fade in the add form
    addMovieForm.style.display = "none";

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
        rating: radioValue
    };

    addMovies(inputMovie).then((savedMovie) => {

        console.log(savedMovie);

        let newRow = "<tr>" +
            "<td>" + savedMovie.id +
            "</td><td>" + savedMovie.title +
            "</td><td>" + savedMovie.rating +
            "</td><td>" + "<input type = 'submit' class = 'delete' id = 'delete' value='Delete'>" +
            "</td><td>" + "<input type = 'submit' class= 'movies' id = 'edit' value='Edit'>" +
            "</tr>";

        tableBody.innerHTML = newRow + tableBody.innerHTML;
    });


});


///////////////////////////////////////////////
/////////// movie creation table //////////////
///////////////////////////////////////////////

// HERE IS THE MASTER THEN
getMovies().then((movies) => {


    loader.style.display = "none";
    pullUpAddForm.style.display = "inline";
    mainTable.style.display = "block";

    console.log(movies);
    let msg = "";
    let heading = "<tr><th>ID</th><th>TITLE</th><th>RATING</th></tr>" + "<hr>";
    tableHead.innerHTML = heading;
    console.log(tableHead);


    movies.forEach((item) => {
            msg =
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

        editMovieForm.style.display = "block";

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

        editMovieForm.style.display = "none";

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
                if (row.children[0].innerText === movies.id) {
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
                console.log(movies)

            });

        })
    }


}).catch((error) => {
    console.log(error);
});





