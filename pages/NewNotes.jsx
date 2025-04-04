import React, { useState } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import 'react-quill-new/dist/quill.bubble.css';
import Form from 'react-bootstrap/Form';

const NewNotes = () => {
    const [formData, setFormData] = useState({ name: '', options: '', description: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleQuillChange = (value) => {
        setFormData({ ...formData, description: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const modules = {
        toolbar: [
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': [] }],
            [{ 'align': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'list': 'ordered' }],
            [{ 'list': 'bullet' }],
            [{ 'list': 'check' }],
            [{ 'indent': '-1' }],
            [{ 'indent': '+1' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['link', 'image', 'video', 'formula'],
            ['blockquote', 'code-block'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{ 'direction': 'rtl' }],
            ['clean']
        ],
    };

    return (
        <>
            <div className='new-notes-container'>
                <div className="grid-note-container">
                    <Form onSubmit={handleSubmit} className="p-4">
                        <Form.Group className="mb-3 from-size-item" controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your title"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 from-size-item" controlId="formOptions">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                name="options"
                                value={formData.options}
                                onChange={handleChange}
                            >
                                <option value="">Select a category</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDescription">
                            <ReactQuill theme="snow"
                                value={formData.description}
                                onChange={handleQuillChange}
                                modules={modules}
                                className='react-quill-class' />
                        </Form.Group>
                        <div className='btn-container'>
                        <button className="button-submit" role="button">
                            Submit
                        </button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default NewNotes
