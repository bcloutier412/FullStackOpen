import Weather from './Weather'

const Country = ({ country }) => {
    return (
        <div>
            <h2>{country.name.common}</h2>

            <div>Capital: {country.capital}</div>

            <div>Area: {country.area}</div>

            <h3>Languages</h3>

            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>

            <img src={country.flags.png} height='200px' alt={`${country.name.common} flag`}/>

            <h3>Weather in {country.capital[0]}</h3>

            <Weather country={country}/>
        </div>
    )
}

export default Country