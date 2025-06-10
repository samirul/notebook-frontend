import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Trash3Fill } from 'react-bootstrap-icons';
import ModalCategory from '../components/modals/ModalCategory';
import PaginationCategory from '../components/PaginationCategory';
import axios from 'axios'
import Cookies from 'js-cookie';

const NewCategory = ({value}) => {
  const [formData, setFormData] = useState({ title: '' });
  const [formSearch, setFormSearch] = useState({ title: '' });
  const [modalShow, setModalShow] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangeSearch = (e) => {
    setFormSearch({ ...formSearch, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/notes/new-category/",
        formData,
        { withCredentials: true }, {
        headers:
        {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },

      })
    } catch (error) {}
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formSearch);
  };
  return (
    <div>
      <div className='new-category-container'>
        <div className="grid-category-container">
          <Form onSubmit={handleSubmit} className="p-4">
            <Form.Group className="mb-3 from-size-item" controlId="formTitle">
              <Form.Label className='category-name'>Create New Category</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your category name"
                className='category-input'
              />
            </Form.Group>
            <div className='btn-container'>
              <button className="button-submit-category" role="button">
                Create
              </button>
            </div>
          </Form>
        </div>
        <div className='grid-category-views'>
          <Form onSubmit={handleSubmitSearch} className="p-4">
            <Form.Group className="mb-3 from-size-item" controlId="formTitle">
              <Form.Label className='category-name'>Search Categories</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formSearch.title}
                onChange={handleChangeSearch}
                placeholder="Enter your category name"
                className='category-input'
              />
            </Form.Group>
            <div className='btn-container'>
              <button className="button-submit-category" role="button">
                Search
              </button>
            </div>
          </Form>
          <ModalCategory
          show={modalShow}
          onHide={() => setModalShow(false)}
          value = {value}
          />
          <h2>List of categories is created</h2>
          <div className='category-items'>
            <div className='category-item'>
              <p>Category12 sssssssss</p>
              <Trash3Fill className='trash-fill-category' onClick={() => setModalShow(true)}/>
            </div>
            <div className='category-item'>
              <p>Category12</p>
               <Trash3Fill className='trash-fill-category' onClick={() => setModalShow(true)}/>
            </div>
            <div className='category-item'>
              <p>Category12</p>
               <Trash3Fill className='trash-fill-category' onClick={() => setModalShow(true)}/>
            </div>
            <div className='category-item'>
              <p>Category12</p>
               <Trash3Fill className='trash-fill-category' onClick={() => setModalShow(true)}/>
            </div>
            <div className='category-item'>
              <p>Category</p>
               <Trash3Fill className='trash-fill-category' onClick={() => setModalShow(true)}/>
            </div>
            <div className='category-item'>
              <p>Category</p>
               <Trash3Fill className='trash-fill-category' onClick={() => setModalShow(true)}/>
            </div>
            <div className='category-item'>
              <p>Category</p>
               <Trash3Fill className='trash-fill-category' onClick={() => setModalShow(true)}/>
            </div>
          </div>
          <div className='paginator-notes'>
            <PaginationCategory/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default NewCategory
