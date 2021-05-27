import React, { useState, useEffect } from 'react'
import axios from 'axios'

const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY

const Weather = ( {capital} ) => {
  const [ weather, setWeather ] = useState([])

  const weatherHook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${capital}`)
      .then(response => {
        setWeather(response.data.current)
      })
  }

  useEffect(weatherHook, [])

  if (weather.length !== 0) {
    return (
      <>
        <h3>Weather in {capital}</h3>
        <div><strong>temperature:</strong> {weather.temperature} Celcius</div>
        <img src={weather.weather_icons[0]} alt={`Weather of ${capital}`} height="100"></img>
        <div><strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</div>
      </>
    )
  }
  return (
    ''
  )
}

export default Weather