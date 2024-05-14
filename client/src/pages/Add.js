import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


const Add = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publisher: "",
    publication_year: "",
    isbn: "",
    cover_image: "",
  })

  const Navigate = useNavigate();

  const handleChange = (e) => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3001/books", book)
      Navigate("/")
    } catch (err) {

    }
  }

  return (
    <div className='form'>
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder='title'
        onChange={handleChange}
        name='title'

      />

      <input
        type="text"
        placeholder='author'
        onChange={handleChange}
        name='author'
      />

      <input
        type="text"
        placeholder='publisher'
        onChange={handleChange}
        name='publisher'
      />

      <input
        type="number"
        placeholder='publication_year'
        onChange={handleChange}
        name='publication_year'
      />

      <input
        type="number"
        placeholder='isbn'
        onChange={handleChange}
        name='isbn'
      />

      <input
        type="file"
        placeholder='cover_image'
        onChange={handleChange}
        name='cover_image'
      />

      <button className='formButton' onClick={handleClick}>Add</button>

    </div>
  )
}

export default Add