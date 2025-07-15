import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Trash3Fill } from 'react-bootstrap-icons';
import ModalCategory from '../components/modals/ModalCategory';
import PaginationButton from '../components/PaginationButton';
import axios from 'axios'
import Cookies from 'js-cookie';

const NewCategory = ({ value }) => {
  const [formData, setFormData] = useState({ title: '' });
  const [formSearch, setFormSearch] = useState({ title: '' });
  const [formSearchResult, setFormSearchResult] = useState([]);
  const [fetch, setFetch] = useState(false)
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [totalCounts, setTotalCounts] = useState();
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
    } catch (error) { }
  };

  const dataSearch = async () => {
    try {
      setFetch(true);
      const response = await axios.get("http://localhost:8000/api/notes/category/search/", {
        params: {
          q: formSearch['title'],
          page: page,
          page_size: pageSize,
        },
        withCredentials: true
      });
      setFormSearchResult(response.data.search_result)
      setTotalCounts(response.data.count)
    } catch (error) {

    }
    console.log('Form submitted:', formSearch);
  }
  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    dataSearch();
  };

  useEffect(() => {
    if (fetch) {
      dataSearch();
    }
  }, [page, fetch])

  const totalPages = Math.ceil(totalCounts / pageSize);

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
            value={value}
          />
          <h2>List of categories is created</h2>
          <div className='category-items'>
            {formSearchResult.map((item) => (
              <div className='category-item' key={item.id}>
                <p>{item.title}</p>
                <Trash3Fill className='trash-fill-category' onClick={() => setModalShow(true)} />
              </div>
            ))}
          </div>
          <div className='paginator-notes'>
            {totalPages > 1 && (
              <PaginationButton
                totalPages={totalPages}
                currentPage={page}
                onPageChange={(newPage) => setPage(newPage)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewCategory
