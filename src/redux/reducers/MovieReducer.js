const defaultState = {
    movies: []
}

const movieReducer = (state = {defaultState}, action) => {
    let newMovies;
    switch (action.type) {
        case "INITIAL_MOVIES":
            return {
                ...state,
                movies: action.payload
            };
        case 'EDIT_MOVIE':
            newMovies = state.movies.map((movie) => {
                if(movie.show.id === action.payload.show.id) return action.payload;
                return movie;
            });
            return {...state, movies: newMovies };
        case "DELETE_MOVIE":
            newMovies = [...state.movies];
            newMovies.splice(action.payload, 1);

            return {
                ...state,
                movies: newMovies
            }
        default:
            return state;
    }
};
export default movieReducer;