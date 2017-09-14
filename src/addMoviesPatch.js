const addMoviesPatch = (movieObject) => {
    console.log(movieObject.id);
    return fetch(`/api/movies/${movieObject.id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieObject)ec
    }).then(response => response.json());
};

module.exports = addMoviesPatch;

