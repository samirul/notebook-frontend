import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { Trash3Fill } from 'react-bootstrap-icons';
import ModalAllText from '../components/modals/ModalAllText';
import PaginationButton from '../components/PaginationButton';
import { generatePath, useNavigate } from "react-router-dom";
import axios from 'axios';


const Notes = ({ value }) => {
  const [formSearch, setFormSearch] = useState({ title: '' });
  const [modalShow, setModalShow] = useState(false);
  const [fetch, setFetch] = useState(false)
  const [page, setPage] = useState(1);
  const [formSearchResult, setFormSearchResult] = useState([]);
  const [totalCounts, setTotalCounts] = useState();
  const [idNote, setIdNote] = useState([]);
  const pageSize = 6;

  const navigate = useNavigate()

  const handleChangeSearch = (e) => {
    setFormSearch({ ...formSearch, [e.target.name]: e.target.value });
  };

  const dataSearch = async () => {
    try {
      setFetch(true);
      const response = await axios.get("http://localhost:8000/api/notes/note/search/", {
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

  const handleModal = (item) =>{
    setIdNote(item.id)
  }

  const handleDeleteLocal = (id) => {
    setFormSearchResult((prev) => prev.filter((cat) => cat.id !== id)); // immediate UI update
  };

  const handleForwardToPage = (item) => {
    const note_id = item.id
    note_id && navigate(generatePath("/note/:note_id", {note_id}));
  }


  return (
    <>
      <main className='topic-grid'>
        <div className='topic-container-search'>
          <Form onSubmit={handleSubmitSearch} className="p-4">
            <Form.Group className="mb-3 from-size-item" controlId="formTitle">
              <Form.Label className='category-name'>Search Notes</Form.Label>
              <Form.Control
                type="text"
                name="title"
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
          value={value}
          id = {idNote}
            onDeleteSuccess={(id) => {
            handleDeleteLocal(id); 
            setModalShow(false);
          }}
        />
        <div className='note-container'>
          {formSearchResult.map((item) => (
            <div className='all-notes' key={item.id} onClick={()=> handleForwardToPage(item)}>
              <p>{item.title}</p>
              <Trash3Fill className='trash-fill' onClick={(e) => {e.stopPropagation(); setModalShow(true), handleModal(item)}} />
            </div>
          ))}
        </div >
        <div className='paginator-notes'>
          {totalPages > 1 && (
              <PaginationButton
                totalPages={totalPages}
                currentPage={page}
                onPageChange={(newPage) => setPage(newPage)}
              />
            )}
        </div>
      </main>

    </>
  )
}

export default Notes