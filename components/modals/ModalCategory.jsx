import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const ModalCategory = (props) => {
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/notes/category/delete/${id}/`, { withCredentials: true })
            props.onDeleteSuccess(props.id);
        } catch (error) { }
    }

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
                            Deleting
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Delete Confirmation</h4>
                        <p className='modal-body-body'>
                            Are you sure you want to delete saved category?
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className='btn-container'>
                            <button className="button-submit-category" role="button" onClick={() => { handleDelete(props.id), props.onHide() }}>
                                Delete
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

export default ModalCategory
