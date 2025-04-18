import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Trash3Fill } from 'react-bootstrap-icons';
import ModalAllText from '../components/ModalAllText';
import PaginationAllText from '../components/PaginationAllText';

const Notes = ({value}) => {
  const [formSearch, setFormSearch] = useState({ name: '' });
  const [modalShow, setModalShow] = useState(false);

  const handleChangeSearch = (e) => {
    setFormSearch({ ...formSearch, [e.target.name]: e.target.value });
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formSearch);
  };
  return (
    <>
      <main className='topic-grid'>
        <div className='topic-container-search'>
          <Form onSubmit={handleSubmitSearch} className="p-4">
            <Form.Group className="mb-3 from-size-item" controlId="formTitle">
              <Form.Label className='category-name'>Search Notes</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formSearch.name}
                onChange={handleChangeSearch}
                placeholder="Enter your notes name"
                className='category-input'
              />
            </Form.Group>
            <div className='btn-container'>
              <button className="button-submit-category" role="button">
                Search
              </button>
            </div>
          </Form>
        </div>
        <h2 className='notes-title-front'>All Notes</h2>
        <ModalAllText
        show={modalShow}
        onHide={() => setModalShow(false)}
        value = {value}
      />
        <div className='note-container'>
          <div className='all-notes'>
            <p>Lorem ipsumccccxxxxx</p>
              <Trash3Fill className='trash-fill' onClick={() => setModalShow(true)}/>
          </div>
          <div className='all-notes'>
            <p>Lorem ipsum</p>
            <Trash3Fill className='trash-fill' onClick={() => setModalShow(true)}/>
          </div>
          <div className='all-notes'>
            <p>Lorem ipsum</p>
            <Trash3Fill className='trash-fill' onClick={() => setModalShow(true)}/>
          </div>
          <div className='all-notes'>
            <p>Lorem ipsum</p>
            <Trash3Fill className='trash-fill' onClick={() => setModalShow(true)}/>
          </div>
          <div className='all-notes'>
            <p>Lorem ipsum</p>
            <Trash3Fill className='trash-fill' onClick={() => setModalShow(true)}/>
          </div>
          <div className='all-notes'>
            <p>Lorem ipsum</p>
            <Trash3Fill className='trash-fill' onClick={() => setModalShow(true)}/>
          </div>
          <div className='all-notes'>
            <p>Lorem ipsum</p>
            <Trash3Fill className='trash-fill' onClick={() => setModalShow(true)}/>
          </div>
          <div className='all-notes'>
            <p>Lorem ipsum</p>
            <Trash3Fill className='trash-fill' onClick={() => setModalShow(true)}/>
          </div>
          
        </div >
        <div className='paginator-notes'>
          <PaginationAllText/>
        </div>
      </main>

    </>
  )
}

export default Notes