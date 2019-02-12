import React, {Component} from 'react';
import './App.css';
// Bootsratp
import {Container, Row, Col} from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";
// Redux
import {connect} from 'react-redux'
import {deleteMovie, editMovie, initialMovies} from "./redux/actions/MovieActions";
// Components
import Slider from './components/Slider/Slider'
import MainTopMovieHolder from './components/movieHolder/MainTopMovieHolder'
import MobileMainTopMovieHolder from './components/movieHolder/MobileMainTopMovieHolder'
import FormModal from './components/modals/FormModal'
import DeleteModal from './components/modals/DeleteModal'
import {AddMovie} from "./components/modals/AddMovie";
import {Loader} from "./components/Loader/Loader";
// Functions

//Screen width Mobile || desktop
let screen = window.innerWidth

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            movieIndex: 0,
            modalForm: false,
            modalDelete: false,
            addMovieModal: false
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
            this.setState({
                modalDelete: true
            })
        } else {
            if (this.state.movieIndex !== 0) {
                this.setState({
                    modalDelete: false,
                    movieIndex: this.state.movieIndex - 1
                })
            } else {
                this.setState({
                    modalDelete: false,
                })
            }

        }
    }
    toggleAddMovieModal(bool) {
        if (bool) {
            this.setState({
                addMovieModal: true
            })
            setTimeout(() =>{
                this.setState({
                addMovieModal: false
            }) }, 5000);
        } else {
            this.setState({
                addMovieModal: false
            })
        }
    }


    render() {
        if (this.state.loading) {
            return (
              <Loader/>
            )
        }

        return (
            <div className="MyClass">
                <Container fluid={true} className="MainContainer">
                    {screen > 576 ?
                        <MainTopMovieHolder
                            movie={this.props.movie.movies? this.props.movie.movies[this.state.movieIndex].show : ''}
                            modalForm={this.toggleFormModal.bind(this)}
                            deleteModal={this.toggleCloseModal.bind(this)}/>:
                        <MobileMainTopMovieHolder
                            movie={this.props.movie.movies[this.state.movieIndex].show}
                            modalForm={this.toggleFormModal.bind(this)}
                            deleteModal={this.toggleCloseModal.bind(this)}
                        />
                    }

                    <Row className="AddMovieBtnHolder justify-content-around align-items-center">
                        <Col className="ColPlusBtn" xl={12}>
                            <button onClick={()=> this.toggleAddMovieModal(true)} className="PlusBtn"><FaPlus color={'#fff'} size={25}/></button>
                        </Col>
                    </Row>
                    <Row className="SliderBackGorund">
                        <div className="SliderHolder justify-content-around align-items-center">
                            <Slider movieList={this.props.movie.movies} setMovie={this.movieSet.bind(this)}/>
                        </div>
                    </Row>
                    <FormModal show={this.state.modalForm} movie={this.props.movie.movies[this.state.movieIndex]}
                               movieIndex={this.state.movieIndex} closeModal={() => this.toggleFormModal()}/>
                    <DeleteModal show={this.state.modalDelete} index={this.state.movieIndex}
                                closeModal={() => this.toggleCloseModal()}/>
                    <AddMovie show={this.state.addMovieModal}
                                 closeModal={() => this.toggleAddMovieModal()}/>
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
