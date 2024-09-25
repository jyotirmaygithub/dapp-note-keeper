import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Note from './components/note';
import {notes_keeper_backend} from "../../declarations/notes-keeper-backend"


function App() {
  const [note, setNote] = useState("");
  const [allNotes , setAllNotes] = useState([]);

  function handleChange(event){
    setNote(event.target.value);
  }

  async function handleSubmit(){
    if(note.trim()){
      await notes_keeper_backend.create_note(note)
      setAllNotes(await notes_keeper_backend.get_notes(3))
      setNote("");
    }
    else{
      console.log("note is empty");
    }
  }

  useEffect(()=>{
    async function toGetNotes() {
    setAllNotes(await notes_keeper_backend.get_notes(3))
    }
    toGetNotes()
  },[])

  return (
    <div>
      <Header />
      <div className='flex justify-center my-4 items-center space-x-2'>
        <textarea
          name="content"
          onChange={handleChange}
          value={note}
          placeholder="Take a note..."
          rows={1}
          className="w-1/2 p-2 rounded-md border-2 border-gray-300 text-lg"
        />
        <svg
          className='cursor-pointer'
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 -960 960 960"
          width="40px"
          fill="#f4d03f"
          onClick={handleSubmit}
        >
          <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
      </div>
      <div className='flex items-center mx-8 my-10 space-x-4'>
        {allNotes.length === 0 ? <div className='w-full flex justify-center items-center text-2xl font-bold '><p > Notes are empty</p></div> : allNotes.map((note,index)=>{
          return <Note key={index} index={index} note={note} setAllNotes={setAllNotes}/>
        })}
      </div>
    </div>
  );
}

export default App;
