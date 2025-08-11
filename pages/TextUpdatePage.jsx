import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import 'react-quill-new/dist/quill.bubble.css';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
import Select from 'react-select'
import { Spinner } from 'react-bootstrap';


const TextUpdatePage = () => {
    const { note_id } = useParams();
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({ name: '', options: '', description: '' });
    const [formCategoryTitle, setFormCategoryTitle] = useState('')
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/notes/notes/${note_id}`, { withCredentials: true })
            setFormData(
                {
                    name: response?.data?.note?.title || '',
                    options: response?.data?.note?.category?.id || '',
                    description: response?.data?.note?.note_text || '',
                }
            )
            setFormCategoryTitle(response?.data?.note?.category?.title || '')
        } catch (error) { }
    }

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleQuillChange = (value) => {
        setFormData({ ...formData, description: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:8000/api/notes/note/${note_id}/update/`,
                {
                    "title":formData["name"],
                    "category": formData["options"],
                    "note_text": formData["description"]
                },
                { withCredentials: true }, {
                headers:
                {
                    'X-CSRFToken': Cookies.get('csrftoken'),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },

            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        console.log('Form submitted:', formData);
    };


    const handleSelectChange = (selectedOption) => {
        setFormData(prev => ({
            ...prev,
            options: selectedOption?.value
        }));
    };

    const fetchCategories = async () => {
        const response = await axios.get("http://localhost:8000/api/notes/categories/", { withCredentials: true }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        setCategories(response.data);
    }

    const options = categories.map(item => ({
        value: item.id,
        label: item.title
    }));


    useEffect(() => {
        fetchData();
        fetchCategories();
        setTimeout(() => {
            setLoading(false);
        }, 2500)
    }, [])


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
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{ 'direction': 'rtl' }],
            ['clean']
        ],
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '800px' }}>
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

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
                                value={formData?.name}
                                onChange={handleChange}
                                placeholder="Enter your title"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 from-size-item" controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Select
                                name="category"
                                value={options.find(opt => opt.value === formData.category)}
                                onChange={handleSelectChange}
                                options={options}
                                placeholder={formCategoryTitle}
                            >
                            </Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <ReactQuill theme="snow"
                                value={formData?.description}
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

export default TextUpdatePage
