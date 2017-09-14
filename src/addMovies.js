const addMovies = (movieObject) => {
    return fetch('/api/movies', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieObject)
    }).then(response => response.json());
};

module.exports = addMovies;
