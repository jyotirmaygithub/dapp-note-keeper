import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { notes_keeper_backend } from "../../../declarations/notes-keeper-backend"

// Initialize modal
Modal.setAppElement('#root');

export default function Note({ index, note, setAllNotes }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // const [text, setText] = useState("");
    const [editText, setEditText] = useState("");

    useEffect(() => {
        setEditText(note);
        // setText(note);
    }, {})

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleTextChange = (e) => {
        setEditText(e.target.value);
    };

    const saveChanges = async () => {
        try {
            closeModal();
            const updatedNotes = await notes_keeper_backend.update_note(index, editText);
            setAllNotes(updatedNotes);
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    async function handleDelte() {
        setAllNotes(await notes_keeper_backend.delete_note(index))
    }

    return (
        <div key={index} className='bg-white w-80 p-4 mb-4 rounded-md shadow-lg border border-gray-200'>
            <p className='text-gray-700'>{editText}</p>
            <div className='flex justify-end space-x-2'>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={openModal} className='cursor-pointer' height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFF00"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                <svg className='cursor-pointer' onClick={handleDelte} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e74c3c"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>

            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Edit your note here"
            >
                <h2 className='mt-6'>Edit your note here</h2>
                <textarea
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    value={editText}
                    onChange={handleTextChange}
                    rows="5"
                    cols="100"
                />
                <br />
                <button className='font-bold text-black' onClick={saveChanges}>Save</button>
                <button className='absolute top-4 right-4' onClick={closeModal}><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></button>
            </Modal>
        </div>
    );
}
