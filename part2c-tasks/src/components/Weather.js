import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({ country }) => {
    const [weather, setWeather] = useState('')

    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]}&limit=5&appid=${api_key}`)
            .then((response) => {
                return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${api_key}&units=imperial`)
            })
            .then((response) => {
                const temperature = response.data.main.temp
                const wind = response.data.wind.speed
                const img = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
                setWeather({temperature: temperature, wind: wind, img: img})
            })
    }, [country])
    return (
        <div>
            {weather
            ? <div>
                <p>temperature: {weather.temperature}</p>
                <img src={weather.img} alt={`Weather in ${country.capital[0]}`}/>
                <p>wind: {weather.wind}</p>
              </div>
            : <div>Loading...</div>} 
        </div>
    )
}

export default Weather