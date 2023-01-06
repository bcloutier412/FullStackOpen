import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState('')
    const [temperature, setTemperature] = useState('')
    const [wind, setWind] = useState('')
    const [img, setImg] = useState('')

    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]}&limit=5&appid=e6cdb4b225ca621b48c2686f4b98a9c5`)
            .then((response) => {
                return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=e6cdb4b225ca621b48c2686f4b98a9c5&units=imperial`)
            })
            .then((response) => {
                setTemperature(response.data.main.temp)
                setWind(response.data.wind.speed)
                return axios.get(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
            }).then((response) => {
                
            }).finally(() => {
                setWeather({temperature: temperature, wind: wind, img: 'data:image/png;base64,'+img})
            })
    }, [country, temperature, wind, img])
    return (
        <div>
            {weather
            ? <div>
                <p>temperature: {weather.temperature}</p>
                <img src={weather.img}/>
                <p>wind: {weather.wind}</p>
              </div>
            : <div>Loading...</div>} 
        </div>
    )
}

export default Weather