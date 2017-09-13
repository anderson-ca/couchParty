/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */

///////////////////////////////////////////////
///////////////// variables ///////////////////
///////////////////////////////////////////////
const getMovies = require('./getMovies.js');

let tableBody = document.getElementById("movie-table");
let addButton = document.getElementById("add-button");

///////////////////////////////////////////////
/////////////// add movie form ////////////////
///////////////////////////////////////////////

addButton.addEventListener("click", () => {
    fetch("/api/movies").then()
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
            "</tr>"
    + msg}
  );
    tableBody.innerHTML = msg;
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
