import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import {deleteMovie} from "../../redux/actions/MovieActions";
import {connect} from 'react-redux'

 class CloseModal extends React.Component{
     deleteMovie = () => {
        this.props.deleteMovie(this.props.index)
        this.props.closeModal(false)
    }

    render(){
        console.log("CloSEMOdal", this.props)
        return(
            <Modal show={this.props.show} >
                <Modal.Header closeButton onClick={() => this.props.closeModal(false)}>
                    <Modal.Title>Delete {this.props.movie.movies[this.props.index].show.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="SureQuestion">Are you sure that you want to delete this movie</p>
                    <p className="MovieNameQuestion">{this.props.movie.movies[this.props.index].show.name}</p>
                    <button className="DeleteBtn01"  onClick={()=> this.deleteMovie()}>
                        Delete
                    </button>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={() => this.props.closeModal(false)}>
                        Cancel
                    </Button>

                </Modal.Footer>
            </Modal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        movie: state.movie
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteMovie: (index) => {
            dispatch(deleteMovie(index))
        }
    }
}


export default  connect(mapStateToProps, mapDispatchToProps)(CloseModal)