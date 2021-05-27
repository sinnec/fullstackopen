import React, { useState } from 'react'
import CountryDetails from './CountryDetails'

const Countries = ( { country }) => {
  const [ buttonClicked, setButtonStatus] = useState(false)

  return (
    <div>{country.name}
      <span>
        <button onClick={() => setButtonStatus(!buttonClicked)}>{buttonClicked ? 'hide' : 'show'}
        </button>
      </span>
      {buttonClicked ? <CountryDetails country={country}/> : ""}
    </div>
  )
}

export default Countries