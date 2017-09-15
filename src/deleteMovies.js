const deleteMovies = (movieObject) => {
    return fetch(`/api/movies/${movieObject.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieObject)
    }).then(response => response.json());
};

module.exports = deleteMovies;
