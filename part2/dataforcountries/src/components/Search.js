import React from 'react'

const Search = ( {text, value, onChange} ) => {
    return (
      <div>
        {text} <input 
        value={value}
        onChange={onChange}
        />
      </div>
    )
}

export default Search