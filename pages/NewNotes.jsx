import React, { useState } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import 'react-quill-new/dist/quill.bubble.css';

const NewNotes = () => {
    const [value, setValue] = useState('');

    const modules = {
        toolbar: [
            [{ 'header': 1 }, { 'header': 2 }], 
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{'font': []}],
            [{'size': []}],
            [{'align': []}],
            ['bold', 'italic', 'underline', 'strike'],
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            [{'list': 'ordered'}],
            [{'list': 'bullet'}],
            [{'list': 'check'}],
            [{'indent': '-1'}],
            [{'indent': '+1'}],
            [{'script': 'sub'},{'script': 'super'}],
            ['link', 'image', 'video', 'formula'],
            ['blockquote', 'code-block'],
            [{'color': []}, {'background':[]}], 
            [{'align': []}],
            [{ 'direction': 'rtl' }],
            ['clean']
        ],
    };

    return (
        <>
            <div className='new-notes-container'>
                <ReactQuill theme="snow"
                 value={value}
                 onChange={setValue}
                 modules={modules}
                 className='react-quill-class' />
            </div>
        </>
    )
}

export default NewNotes
