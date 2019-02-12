import React, {Component} from 'react';
import './App.css';
// Bootsratp
import {Button} from 'react-bootstrap';
import axios from 'axios';
// Redux
import {connect} from 'react-redux'
import {deleteMovie, editMovie, initialMovies} from "./redux/actions/MovieActions";
//Screen width Mobile || desktop
let screen = window.innerWidth

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            movieIndex: 0,
            modalForm: false,
            modalFormClose: false
        }
    }

    componentWillMount() {
        this.fetchMovies();
    }

    // Movie Api
    fetchMovies = async () => {
        try {
            const response = await fetch(`https://api.tvmaze.com/search/shows?q=game`);
            const responseJson = await response.json();
            await this.props.initialMovies(responseJson)
            await this.setState({loading: false})

        } catch (e) {
            console.log('erroe', e);

        }
    }

        // axios.get(`https://api.tvmaze.com/search/shows?q=game`)
        //     .then(res => {
        //         const movies = res.data;
        //         console.log("m", movies)
        //         this.props.initialMovies(movies)
        //         this.setState({loading: false})
        //     })

    render() {
        if(!this.state.loading){
            console.log("test", this.props.movie.movies[0].show.name)
        } else {
            console.log("test load failed")
        }

        return (
            <div>
                {!this.state.loading ? <p>{this.props.movie.movies[0].show.name}</p> :
                    <p>No fetch</p>
                }


                <Button variant="primary">Primary</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movie: state.movie

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editMovie: (movie) => {
            dispatch(editMovie(movie))
        },
        initialMovies: (movies) => {
            dispatch(initialMovies(movies))
        },
        deleteMovie: (index) => {
            dispatch(deleteMovie(index))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
