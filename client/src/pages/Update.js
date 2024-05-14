import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const Update = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publisher: "",
    publication_year: "",
    isbn: "",
    cover_image: "",
  })

  const [error, setError] = useState(false)

  const Navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2]

  

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      console.log('Sending update request for book:', book);
      await axios.put(`http://localhost:3001/books/${bookId}` , book)
      Navigate("/")
    } catch (err) {
      console.error('Error during update request:', err);
      setError(true)
    }
  }

  return (
    <div className='form'>
      <h1>Update The Book</h1>
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
        type="text"
        placeholder='cover_image'
        onChange={handleChange}
        name='cover_image'
      />

      <button className='formButton' onClick={handleClick}>Update</button>
      {error && "something went wrong"}
      <Link to="/">See all books</Link>

    </div>
  )
}

export default Update;