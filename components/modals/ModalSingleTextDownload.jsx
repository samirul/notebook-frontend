import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { saveAs } from 'file-saver';

const ModalSingleTextDownload = (props) => {
    const [selected, setSelected] = useState("");
    const handleDownload = async () => {
        const data = {
            "name": props.title,
            "html": props.text,
            "selected": selected
        }
        const response = await axios.post("http://localhost:8000/api/notes/note/download/",
            { data },
            { withCredentials: true })
        taskPollStatusHandler(response.data.pdf_download_task_id);

    }

    const taskPollStatusHandler = (id) => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/notes/pdf-status/${id}/`, { withCredentials: true });
                if (response.data.status === 'SUCCESS') {
                    clearInterval(interval);
                    const pdfUrl = response.data.pdf_url;
                    await downloadPdfHandler(pdfUrl);
                } else if (response.data.status === 'FAILURE') {
                    clearInterval(interval);
                }
            } catch (error) {
                clearInterval(interval);
            }
        }, 10000);
    };


    const downloadPdfHandler = async (url) => {
        try {
            const url_name = url.split('/').pop();
            const file_name = url_name.split('/').pop();
            const response = await axios.get(`http://localhost:8000/media/pdf/${file_name}`, { responseType: 'blob' }, { withCredentials: true });
            saveAs(new Blob([response.data]), file_name);
        } catch (error) {
            if (error.status === 404) {
                console.log("Download failed.")
            }
        }
    };

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
                            <Form className='download-method-text' onSubmit={handleDownload}>
                                <div className="d-flex gap-3 mb-3 ms-0">
                                    <Form.Check
                                        type="radio"
                                        id="text-file"
                                        label="Text File"
                                        name="RadioGroup"
                                        className='form-radio'
                                        value="text-file"
                                        checked={selected === "text-file"}
                                        onChange={(e) => setSelected(e.target.value)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="pdf-file"
                                        label="PDF File"
                                        name="RadioGroup"
                                        className='form-radio'
                                        value="pdf-file"
                                        checked={selected === "pdf-file"}
                                        onChange={(e) => setSelected(e.target.value)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="doc-file"
                                        label="DOC File"
                                        name="RadioGroup"
                                        className='form-radio'
                                        value="docx-file"
                                        checked={selected === "docx-file"}
                                        onChange={(e) => setSelected(e.target.value)}
                                    />
                                </div>
                            </Form>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <div className='btn-container'>
                            <button className="button-submit-category" role="button" onClick={() => { handleDownload(), props.onHide() }}>
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
