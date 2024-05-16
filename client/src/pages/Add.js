import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Add = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publisher: "",
    publication_year: "",
    isbn: "",
    cover_image: null,
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cover_image') {
      setBook(prev => ({ ...prev, cover_image: files[0] }));
    } else {
      setBook(prev => ({ ...prev, [name]: value }));
    }
  }


  const handleClick = async e => {
    e.preventDefault()
    const formData = new FormData();
    Object.keys(book).forEach(key => {
      formData.append(key, book[key]);
    });

    // Debugging the FormData content
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post("http://localhost:5000/books", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Server response:', response.data);
      navigate("/");
    } catch (err) {
      console.error('axiox error:', err);
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
        onChange={handleChange}
        name='cover_image'
      />

      <button className='formButton' onClick={handleClick}>Add</button>

    </div>
  )
}

export default Add;