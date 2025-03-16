import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { MdClose } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { BsPlusLg } from 'react-icons/bs'
import NoteItem from '../components/NoteItem'

const Notes = ({notes}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const handleSearch = () => {
    setFilteredNotes(notes.filter(note =>
      note.title.toLowerCase().includes(text.toLowerCase()) 
    ));
}

  useEffect( handleSearch, [text, notes]); 

  return (
    <section>
      <header className='notes__header'>
        {!showSearch && <h2>My Notes</h2>}
        {showSearch && <input type='text' value={text} onChange={(e)=> {setText(e.target.value); handleSearch();}} autoFocus placeholder='keyword...'/>}
        <button className='btn' onClick={() => setShowSearch(prevState => !prevState)}>{ showSearch? <MdClose/>:<CiSearch/>}</button>
      </header>
      <div className="notes__container">
        {
          filteredNotes.map(note => <NoteItem key={note.id} note={note}/>)
        }
      </div>
      <Link to="/create-note" className='btn add__btn'><BsPlusLg/></Link>
    </section>
  )
}

export default Notes
