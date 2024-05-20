import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Update = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publisher: "",
    publication_year: "",
    cover_image: null,
  });
  const [originalBook, setOriginalBook] = useState({});
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/books/${bookId}`);
        setBook(res.data);
        setOriginalBook(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cover_image') {
      setBook(prev => ({ ...prev, cover_image: files[0] }));
    } else {
      setBook(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(book).forEach(key => {
      if (book[key] !== originalBook[key] || key === 'cover_image') {
        formData.append(key, book[key]);
      }
    });

    // Debugging the FormData content
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.put(`http://localhost:5000/books/${bookId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Server response:', response.data);
      navigate("/");
    } catch (err) {
      setError(true);
      console.error('Axios error:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Update the Book</h1>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            onChange={handleChange}
            name="title"
            value={book.title}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            placeholder="Author"
            onChange={handleChange}
            name="author"
            value={book.author}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="publisher" className="form-label">Publisher</label>
          <input
            type="text"
            className="form-control"
            id="publisher"
            placeholder="Publisher"
            onChange={handleChange}
            name="publisher"
            value={book.publisher}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="publication_year" className="form-label">Publication Year</label>
          <select
            className="form-select"
            id="publication_year"
            aria-label="Publication Year"
            name="publication_year"
            value={book.publication_year}
            onChange={handleChange}
          >
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="cover_image" className="form-label">Cover Image</label>
          <input
            type="file"
            className="form-control"
            id="cover_image"
            onChange={handleChange}
            name="cover_image"
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Update</button>
          {error && <div className="alert alert-danger mt-3">Something went wrong</div>}
        </div>
      </form>
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-secondary">See all books</Link>
      </div>
    </div>
  );
};

export default Update;
