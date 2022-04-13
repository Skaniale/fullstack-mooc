import { useState, useEffect } from "react"
import axios from 'axios'

const Filter = (props) => {
  return (
    <form>
        <div>
          find countries
          <input
            value={props.filter}
            onChange={props.handleFilter}
          />
        </div>
    </form>
  )
}



const Country = ({country}) => {
  const languages = Object.values(country.languages)
  console.log("lang", languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h2>languages:</h2>
      <div>
        {languages.map(language =>
          <div key={language}>
            <li>
              {language}
              {console.log("lang map: ", language)}
            </li>
          </div>
          )}
      </div>
      <img src={country.flags.png} alt={country.name.common + ' flag'}/>
    </div>
  )
}

const Countries = (props) => {
  if (props.countries.length === 1)
    return (
      <Country country={props.countries[0]}/>
    )
  if (props.countries.length <= 10) 
    return(
      <div>
        {props.countries.map(country =>
          <div key={country.name.official}>
              {country.name.common}
              <button onClick={() => props.handleClick(country.name.common)}>
                show
              </button>
         </div>
        )}
      </div>
    )
  return <div>Too many matches, specify another filter</div>
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const countriesToShow = countries.filter(countries => countries.name.common.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleClick = (props) => {
    console.log(props)
    setFilter(props)
  }

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <Countries countries={countriesToShow} handleClick={handleClick}/>
    </div>
  )
}

export default App;
