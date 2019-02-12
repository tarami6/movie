
export function editMovie(movie) {
        return {
            type: 'EDIT_MOVIE',
            payload: movie
        }


}
export function initialMovies(movies) {
    return {
        type: 'INITIAL_MOVIES',
        payload: movies
    }
}

export function deleteMovie(index) {
    return {
        type: 'DELETE_MOVIE',
        payload: index
    }
}



