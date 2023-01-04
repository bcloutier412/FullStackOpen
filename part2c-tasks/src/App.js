import { useState, useEffect } from 'react'
import axios from 'axios'

import Content from "./components/Content"

const App = (props) => {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState('');

    const handleFilter = event => setFilter(event.target.value);
    const handleClick = country => setFilter(country)
    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data);
            })
    }, [])

    return (
        <div>
            <label>find countries
                <input id="text-input" value={filter} onChange={handleFilter}/>
            </label>

            <h1>Countries</h1>

            <Content countries={countries} handleClick={handleClick} filter={filter}/>
        </div>
    )
}

export default App 