import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { RiDeleteBin6Line } from 'react-icons/ri'
import useCreateDate from '../components/useCreateDate'

const EditNote = ({notes, setNotes}) => {
  const {id} = useParams();
  
  const note = notes.find((item) => item.id === id);

  const [title, setTitle] = useState(note?.title || '');
  const [details, setDetails] = useState(note?.details || '');
  const date = useCreateDate();
  const navigate = useNavigate();

  const handleForm = (e) =>{
      e.preventDefault();

      if(title && details){
        const newNote ={...note, title, details, date}

        const newNotes = notes.map((item) =>{
          if(item.id === id){
            item = newNote
          }
          return item;
      })
      setNotes(newNotes);
      }
      // redirect to home page
      navigate('/')
  }
  
  const handleDelete = () =>{
    if(window.confirm('Are you sure you want to delete?')){
      const newNotes = notes.filter(item => item.id !== id);
      setNotes(newNotes);
      navigate('/')
    }
  }


  return (
    <div>
      <section>
        <header className='create-note__header'>
          <Link to='/' className='btn'><IoIosArrowBack/></Link>
          <button className="btn lg primary" onClick={handleForm}>Save</button>
          <button className="btn danger" onClick={handleDelete}><RiDeleteBin6Line/></button>
        </header>
        <form className='create-note__form' onSubmit={handleForm}>
            <input type="text" autoFocus placeholder='Title...' value={title} onChange={(e)=> setTitle(e.target.value)}/>
            <textarea rows={28} placeholder='Note details' value={details} onChange={(e)=> setDetails(e.target.value)}></textarea>
        </form>
    </section>
    </div>
  )
}

export default EditNote
