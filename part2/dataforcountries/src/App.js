import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import CountryDetails from './components/CountryDetails'
import Countries from './components/Countries'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ countryFilter, setCountryFilter ] = useState('')

  const countriesHook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(countriesHook, [])

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const countriesToShow = !countryFilter
    ? []
    : countries.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))

  return (
    <>
      <Search text="find countries" value={countryFilter} onChange={handleFilterChange} />
      {countriesToShow.length > 10
      ? "Too many matches, specify another filter"
      : countriesToShow.length === 1
      ? <CountryDetails country={countriesToShow[0]}/>
      : countriesToShow.map(country => <Countries key={country.name} country={country}/>)}
    </>
  )
}

export default App;