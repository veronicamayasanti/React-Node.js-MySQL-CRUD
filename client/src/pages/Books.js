import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/books")
        setBooks(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    fetchAllBooks()
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/books/" + id)
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1 className="text-center">Rak Buku Maya</h1>
      <button className='addNewButton'>
        <Link to="/add" style={{ color: 'inherit', textDecoration: 'none' }}>Add new book</Link>
      </button>
      <div className='books bg-info text-dark'>

        {
          books.map(book =>

          (
            < div className='book' key={book.id}>
              <img src={`http://localhost:5000/uploads/${book.cover_image}`} alt={book.title} />
              

              <div className="card-body">
                <h5 className="card-title text-center">{book.title}</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>Author:</strong> {book.author}</li>
                  <li className="list-group-item"><strong>Publisher:</strong> {book.publisher}</li>
                  <li className="list-group-item"><strong>Year:</strong> {book.publication_year}</li>
                </ul>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button className="btn btn-danger" onClick={() => handleDelete(book.id)}>Delete</button>
                  <Link to={`/update/${book.id}`} className="btn btn-primary">Update</Link>
                </div>
              </div>

            </div>
          )


          )}
      </div>

    </div>
  )
}

export default Books