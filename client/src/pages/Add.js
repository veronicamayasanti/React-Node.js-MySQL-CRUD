import React from 'react'

const Add = () => {
  return (
    <div className='form'>
      <h1>Add New Book</h1>
      <input type="text" placeholder='title' />
      <input type="text" placeholder='author' />
      <input type="text" placeholder='publisher' />
      <input type="number" placeholder='publication_year' />
      <input type="number" placeholder='isbn' />
      <input type="image" placeholder='cover_image' />

    </div>
  )
}

export default Add