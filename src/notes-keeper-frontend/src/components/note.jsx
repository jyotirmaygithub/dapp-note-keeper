import React from 'react';
import {notes_keeper_backend} from "../../../declarations/notes-keeper-backend"

export default function Note({ index, note , setAllNotes}) {
    async function handleDelte() {
       setAllNotes(await notes_keeper_backend.delete_note(index))
    }
    return (
        <div key={index} className='bg-white w-80 p-4 mb-4 rounded-md shadow-lg border border-gray-200'>
            <p className='text-gray-700'>{note}</p>
            <div className='flex justify-end'>
                <svg className='cursor-pointer' onClick={handleDelte} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e74c3c"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
            </div>
        </div>
    );
}
