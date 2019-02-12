import React from 'react'
import {Modal, Button} from 'react-bootstrap'



export  const AddMovie = (props)=>{
        return(
            <Modal show={props.show} >
                <Modal.Header closeButton onClick={() => props.closeModal(false)}>
                    <Modal.Title>Add Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="SureQuestion">We are sorry this Add movie fitcher will be available soon</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.closeModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
}


