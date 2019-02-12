import React, {Component} from 'react';
import './App.css';
// Bootsratp
import {Container, Row} from 'react-bootstrap';
// Redux
import {connect} from 'react-redux'
import {deleteMovie, editMovie, initialMovies} from "./redux/actions/MovieActions";
// Components
import Slider from './components/Slider'
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

    movieSet(index) {
        console.log("index", index)
        this.setState({
            movieIndex: index
        })
    }

    toggleFormModal(bool) {
        if (bool) {
            console.log("bool");
            this.setState({
                modalForm: true
            })
        } else {
            this.setState({
                modalForm: false
            })
        }
    }

    toggleCloseModal(bool) {
        if (bool) {
            console.log("bool");
            this.setState({
                modalFormClose: true
            })
        } else {
            if (this.state.movieIndex != 0) {
                this.setState({
                    modalFormClose: false,
                    movieIndex: this.state.movieIndex - 1
                })
            } else {
                this.setState({
                    modalFormClose: false,
                })
            }

        }
    }


    render() {
        if (this.state.loading) {
            return (
                <div>Loading</div>
            )
        }

        return (
            <div className="MyClass">
                <Container fluid={true} className="MainContainer">


                    <Row className="AddMovieBtnHolder justify-content-around align-items-center">

                    </Row>
                    <Row className="SliderBackGorund">
                        <Slider/>

                    </Row>

                </Container>
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
