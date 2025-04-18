import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalAllText = (props) => {
    return (
        <>
            <div>
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Deleting
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Delete Confirmation</h4>
                        <p>
                            Are you sure you want to delete saved note?
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button>Yes</Button>
                        <Button onClick={props.onHide}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ModalAllText
