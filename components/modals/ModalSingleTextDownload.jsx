import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const ModalSingleTextDownload = (props) => {
    return (
        <>
            <div>
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className='modal-all-notes'
                    data-bs-theme={props.value ? "dark" : "light"}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Downloading
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text file format</h4>
                        <div className='modal-body-body'>
                            <Form className='download-method-text'>
                                <div className="d-flex gap-3 mb-3 ms-0">
                                    <Form.Check
                                        type="radio"
                                        id="text-file"
                                        label="Text File"
                                        name="group1"
                                        className='form-radio'
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="pdf-file"
                                        label="PDF File"
                                        name="group1"
                                        className='form-radio'
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="doc-file"
                                        label="DOC File"
                                        name="group1"
                                        className='form-radio'
                                    />
                                </div>
                            </Form>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <div className='btn-container'>
                            <button className="button-submit-category" role="button">
                                Download
                            </button>
                        </div>
                        <div className='btn-container'>
                            <button onClick={props.onHide} className="button-submit-category" role="button">
                                Cancel
                            </button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ModalSingleTextDownload
