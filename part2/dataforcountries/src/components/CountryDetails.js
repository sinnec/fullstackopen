import React from 'react'
import Language from './Language'
import Weather from './Weather'

const CountryDetails = ( { country }) => {
    return (
      <>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map(language => <Language key={language.name} language={language.name} />)}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} height="100"></img>
      <Weather capital={country.capital}/>
      </>
    )
}

export default CountryDetails