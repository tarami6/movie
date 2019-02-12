import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import connect from "react-redux/es/connect/connect";
import { editMovie } from "../../redux/actions/MovieActions";
import './Modals.css'

class FormModal extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.movieStore.movies[this.props.movieIndex].show.id,
            name: this.props.movieStore.movies[this.props.movieIndex].show.name,
            premiered: this.props.movieStore.movies[this.props.movieIndex].show.premiered,
            runtime: this.props.movieStore.movies[this.props.movieIndex].show.runtime,
            genres: this.props.movieStore.movies[this.props.movieIndex].show.genres.join(' '),
            err: false,
            errors: {
                name: '',
                premiered: '',
                runtime: '',
                genres: '',

            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const movie = this.props.movieStore.movies[this.props.movieIndex].show
        this.setState({
            id: movie.id,
            name: movie.name,
            premiered:movie.premiered.length > 4? parseInt(movie.premiered.substring(0, 4)) :movie.premiered,
            runtime: parseInt(movie.runtime),
            genres: Array.isArray(movie.genres)? movie.genres.join(' '):movie.genres
        })
    }




    validateString = (errName, value) => {
        let err = errName
        let validStr = value.replace(/[^A-Za-z ]/g, "");
        let validUpCase = validStr.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(" ")
        if (value.length < 1) {
            this.setState({errors: {...this.state.errors,[err]: 'Can\'t be empty'}})
            this.setState({err: true})
            return ""
        }
        if(err === 'name') {
            if(
                this.props.movieStore.movies.find(x => x.show.name === value && x.show.id !== this.state.id)){
                this.setState({errors: {...this.state.errors,[err]: 'This name already exists'}})
                this.setState({err: true})
                return value
            }
        }
        this.setState({errors: {...this.state.errors,[err]: ''}})
        this.setState({err: false})
        return validUpCase;

    }

    validateDate = (date) => {
        let reg = /^\d+\s*$/;
        let newDate = parseInt(date)
        if (typeof newDate == 'number') {
            if (newDate >= 1900 && newDate <= 2020 && (newDate + "").length === 4 && reg.test(date)) {
                this.setState({errors: {...this.state.errors,premiered: ''}})
                this.setState({err: false})
                return newDate
            } else if (isNaN(newDate)) {
                this.setState({errors: {...this.state.errors,premiered: 'Year must be between 1900 - 2020 '}})
                this.setState({err: true})
                return "Need a Number"
            } else {
                this.setState({errors: {...this.state.errors,premiered: 'Year must be between 1900 - 2020 '}})
                this.setState({err: true})
                return newDate
            }
        }
    }

    validateRunTime = (time) => {
        let newTime = parseInt(time);
        let reg = /^\d+\s*$/;
        if (newTime > 0 && newTime < 300 && (newTime + "").length < 4 && reg.test(time)) {
            this.setState({errors: {...this.state.errors,runtime: ''}})
            this.setState({err: false})
            return newTime
        } else if (isNaN(newTime)) {
            this.setState({errors: {...this.state.errors,runtime: 'Its must be a NUMBER a greater then 0 smaller 300'}})
            this.setState({err: true})
            return "Need a Number"
        }
        else {
            this.setState({errors: {...this.state.errors,runtime: 'Its must be a NUMBER a greater then 0 smaller 300'}})
            this.setState({err: true})
            return newTime
        }
    }

    onChange = (event) => {
        switch (event.target.name) {
            case 'name':
                if (event.target.value.length >= 0) {
                    let value = this.validateString(event.target.name, event.target.value)
                    this.setState({
                        [event.target.name]: value
                    })
                }
                return
            case 'premiered':
                let year = this.validateDate(event.target.value)
                this.setState({
                    [event.target.name]: year
                })
                return
            case 'runtime':
                let time = this.validateRunTime(event.target.value)
                this.setState({
                    [event.target.name]: time
                })
                return
            case 'genres':
                let value = this.validateString(event.target.name, event.target.value)
                if (!this.state.errors.genres) {
                    this.setState({
                        [event.target.name]: value
                    })
                }
                return
            default:
                break;
        }

    }
    onSubmit = (movie) => event => {
        event.preventDefault();
        if (!this.state.err) {
            const newMovie = {
                ...movie, show: {
                    ...movie.show,
                    name: this.state.name,
                    premiered: this.state.premiered,
                    runtime: this.state.runtime,
                    genres: this.state.genres

                }
            };
            this.props.editMovie(newMovie);
            this.props.closeModal(false)
        }
    }

    closeModal(){
        this.props.closeModal(false)
        this.setState({
            errors: {
                name: '',
                premiered: '',
                runtime: '',
                genres: '',
            }
        })
    }

    render(){

        return(
            <Modal show={this.props.show} >
                <Modal.Header closeButton onClick={() => this.closeModal()}>
                    <Modal.Title>Edit Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <form onSubmit={this.onSubmit(this.props.movie)}>
                            <div>
                                <input type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                                {this.state.errors.name ?
                                    <div className="ErrorText">
                                        {this.state.errors.name}
                                    </div>
                                    : null}
                            </div>
                            <div>
                                <input type="number" name="premiered" value={this.state.premiered}
                                       onChange={this.onChange}/>
                                {this.state.errors.premiered ?
                                    <div className="ErrorText">
                                        {this.state.errors.premiered}
                                    </div>
                                    : null}
                            </div>
                            <div>
                                <input type="number" name="runtime" value={this.state.runtime} onChange={this.onChange}/>
                                {this.state.errors.runtime ?
                                    <div className="ErrorText">
                                        {this.state.errors.runtime}
                                    </div>
                                    : null}
                            </div>
                            <div>
                                <input type="text" name="genres" value={this.state.genres} onChange={this.onChange}/>
                                {this.state.errors.genres ?
                                    <div className="ErrorText">
                                        {this.state.errors.genres}
                                    </div>
                                    : null}
                            </div>
                            <div className="SaveDiv">
                                <input disabled={this.state.err} type="submit" value="Submit"/>
                            </div>


                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.closeModal()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        movieStore: state.movie
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editMovie: (movie) => {
            dispatch(editMovie(movie))
        },
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(FormModal)
