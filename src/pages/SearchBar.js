import React from 'react'
import { useState } from 'react';

const SearchBar = ({setKeyWord}) => {
  
  
  const onFormSubmit = (e) =>{

  }
  
  const onInputChange = (e) =>{
    setKeyWord(e.target.value);
  }

  return (

    <div className='d-flex justify-content-center'>
      <form onSubmit={onFormSubmit} className='w-50'>
        <div className='d-flex'>
            <input
                className='w-100 form-control'
                //className={`form-control ${user.error_list.first_name ? 'is-invalid': ""}`}
                name='keyWord'
                id='keyWord'
                type='text'
                placeholder="Enter Keyword"
                onChange={onInputChange}
            />
          </div>
      </form>
    </div>
  )
}

export default SearchBar