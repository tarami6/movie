import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import {deleteMovie} from "../../redux/actions/MovieActions";
import {connect} from 'react-redux'


export default class AddMovie extends React.Component{





    render(){
        console.log("CloSEMOdal", this.props)
        return(
            <Modal show={this.props.show} >
                <Modal.Header closeButton onClick={() => this.props.closeModal(false)}>
                    <Modal.Title>Add Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="SureQuestion">We are sorry this Add movie fitcher will be available soon</p>
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


