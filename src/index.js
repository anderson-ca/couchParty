/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */

const addMovies = require("./addMovies");

///////////////////////////////////////////////
///////////////// variables ///////////////////
///////////////////////////////////////////////
const getMovies = require('./getMovies.js');
let tableBody = document.getElementById("movie-table");
let addButton = document.getElementById("add-button");
let titleInput = document.getElementById("title");
let userRating = document.querySelectorAll(".user-rating");

console.log(userRating);

///////////////////////////////////////////////
/////////////// add movie form ////////////////
///////////////////////////////////////////////

addButton.addEventListener("click", (e) => {
    e.preventDefault();
      // This is the object that is used in addMovies

    // loop
    let radioValue;
    userRating.forEach( (element) => {
        if (element.checked) {
            radioValue = element.value
        }
      return radioValue;
    });

      let inputMovie = {
        title: titleInput.value,
        rating: radioValue


      };

      addMovies(inputMovie).then((savedMovie) => console.log(savedMovie));

      console.log(inputMovie);
});



///////////////////////////////////////////////
/////////// movie creation table //////////////
///////////////////////////////////////////////
getMovies().then((movies) => {
  console.log('Here are all the movies:');

  let msg = "";
  movies.forEach((item) => {
        msg =
            "<tr>" +
            "<td>" + "id: " + item.id +
            "</td><td>" + "title: " + item.title +
            "</td><td>" + "rating: " + item.rating +
            "</td>" + "<button>Delete</button>" +
            "<td>" + "<button>Edit</button>" +
            "</tr>"
    + msg}
  );
    tableBody.innerHTML = msg;
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
