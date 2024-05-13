import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
const [books, setBooks] = useState([])

useEffect(() => {
  const fetchAllBooks = async () => {
    try{
      const res = await axios.get("http://localhost:3001/books")
      setBooks(res.data)
    }catch(err){
      console.log(err);
    }
  }
  fetchAllBooks()
}, [])

  return (
    <div>
      <h1>Rak Buku Maya</h1>
      <div className='books'>
        {books.map(book => (
          < div className='book' key = {book.id}>
          {book.cover_image && <img src={book.cover_image} alt="" />}
          <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.publisher}</p>
            <p>{book.publication_year}</p>
            <p>{book.isbn}</p>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  )
}

export default Books