import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Trash3Fill } from 'react-bootstrap-icons';

const NewCategory = () => {
  const [formData, setFormData] = useState({ name: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  return (
    <div>
      <div className='new-category-container'>
        <div className="grid-category-container">
          <Form onSubmit={handleSubmit} className="p-4">
            <Form.Group className="mb-3 from-size-item" controlId="formTitle">
              <Form.Label className='category-name'>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your category name"
                className='category-input'
              />
            </Form.Group>
            <div className='btn-container'>
              <button className="button-submit-category" role="button">
                Submit
              </button>
            </div>
          </Form>
        </div>
        <div className='grid-category-views'>
          <h2>List of categories is created</h2>
          <div className='category-items'>
            <div className='category-item'>
              <p>Category12 sssssssss</p>
              <Trash3Fill/>
            </div>
            <div className='category-item'>
              <p>Category12</p>
              <Trash3Fill/>
            </div>
            <div className='category-item'>
              <p>Category12</p>
              <Trash3Fill/>
            </div>
            <div className='category-item'>
              <p>Category12</p>
              <Trash3Fill/>
            </div>
            <div className='category-item'>
              <p>Category</p>
              <Trash3Fill/>
            </div>
            <div className='category-item'>
              <p>Category</p>
              <Trash3Fill/>
            </div>
            <div className='category-item'>
              <p>Category</p>
              <Trash3Fill/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewCategory
