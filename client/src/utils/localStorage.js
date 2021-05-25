export const SavedMovieIds = () => {
    const savedMovieIds = localStorage.getItem('saved_movies')
    ? JSON.parse(localStorage.getItem('saved_movies'))
    : [];

    return savedMovieIds;
};

export const saveMovieIds = (movieIdArr) => {
    if (movieIdArr.lenght) {
        localStorage.setItem('saved_movies', JSON.stringify(movieIdArr));
    } else {
        localStorage.removeItem('saved_movies');
    }  
};

export const removeMovieId = (movieId) => {
    const savedMovieIds = localStorage.getItem('saved_movies')
    ? JSON.parse(localStorage.getItem('saved_movies'))
    : null;

    if (!savedMovieIds) {
        return false;
    }

    const updatedSavedMovieIds = savedMovieIds?.filter((savedMovieIds) => savedMovieIds !== movieId);
    localStorage.setItem('saved_movies', JSON.stringify(updatedSavedMovieIds));

    return true;
};