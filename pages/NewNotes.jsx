import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import 'react-quill-new/dist/quill.bubble.css';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Cookies from 'js-cookie';
import Select from 'react-select'

const NewNotes = () => {
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({ title: '', category: '', note_text: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleQuillChange = (value) => {
        setFormData({ ...formData, note_text: value });
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/notes/categories/", { withCredentials: true }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            setCategories(response.data);
        } catch (error) {
            if (error.status === 401) {
                window.location.replace("/login");
            }
        }
    }

    const options = categories.map(item => ({
        value: item.id,
        label: item.title
    }));

    useEffect(() => {
        fetchCategories();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/api/notes/new-note/",
                formData,
                { withCredentials: true }, {
                headers:
                {
                    'X-CSRFToken': Cookies.get('csrftoken'),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },

            })
        } catch (error) {
            if (error.status === 401) {
                window.location.replace("/login");
            }
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': [] }],
            [{ 'align': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }],
            [{ 'list': 'bullet' }],
            [{ 'list': 'check' }],
            [{ 'indent': '-1' }],
            [{ 'indent': '+1' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['link', 'image', 'video', 'formula'],
            ['blockquote', 'code-block'],
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
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter your title"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 from-size-item" controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Select
                                name="category"
                                value={options.find(opt => opt.value === formData.category)}
                                onChange={(selectedOption) => handleChange({
                                    target: { name: 'category', value: selectedOption.value }
                                })}
                                options={options}
                                placeholder="Select a category"
                            >
                            </Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formNoteText">
                            <ReactQuill theme="snow"
                                value={formData.note_text}
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
