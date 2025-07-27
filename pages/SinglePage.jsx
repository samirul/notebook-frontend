import React, {useEffect, useState}  from 'react'
import { useParams } from 'react-router-dom'
import { Trash3Fill, PencilSquare, CloudDownload } from 'react-bootstrap-icons';
import ModalSingleTextDelete from '../components/modals/ModalSingleTextDelete';
import { generatePath, useNavigate } from "react-router-dom";
import ModalSingleTextDownload from '../components/modals/ModalSingleTextDownload';
import axios from 'axios';

const SinglePage = ({value}) => {
    const { note_id } = useParams();
    const [modalShowDelete, setModalShowDelete] = useState(false);
    const [modalShowDownload, setModalShowDownload] = useState(false);
    const [noteData, setNoteData] = useState([])


    const fetchData = async () =>{
        try{
            const response = await axios.get(`http://localhost:8000/api/notes/notes/${note_id}`, {withCredentials: true})
            setNoteData(response?.data?.note)
        }catch(error){}
    }

    useEffect(()=>{
        fetchData();
    },[])

    const navigate = useNavigate()

    const handleProceed = (note_id) => {
        note_id && navigate(generatePath("/note/update/:note_id/", { note_id }));
    };
    return (
        <>
            <main className='container'>
                <div className='grid-note-containers'>
                    <div className='note-title'>
                        <p className='note-title-1'>{noteData?.title}</p>
                        <p className='note-category'>Category: {noteData?.category?.title}</p>
                        <p className='note-created-time'>Created at: {noteData?.created_at}</p>
                        <p className='note-updated-time'>Updated at: {noteData?.updated_at}</p>
                    </div>
                    <ModalSingleTextDelete
                        show={modalShowDelete}
                        onHide={() => setModalShowDelete(false)}
                        value={value}
                    />
                    <ModalSingleTextDownload
                        show={modalShowDownload}
                        onHide={() => setModalShowDownload(false)}
                        value={value}
                    />
                    <div className="note-menu">
                        <CloudDownload className='download-text' onClick={() => setModalShowDownload(true)}/>
                        <PencilSquare className='edit-text' onClick={() => handleProceed(note_id)} />
                        <Trash3Fill className='delete-text' onClick={() => setModalShowDelete(true)}/>
                    </div>
                    <div className='note-body'>
                        <article className='note-article'>
                            <span className='note-text'>
                                {noteData.note_text}
                            </span>
                        </article>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SinglePage
