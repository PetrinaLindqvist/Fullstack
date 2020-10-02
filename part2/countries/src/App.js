import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/filter'



const App = () => {
  const [countries, setCountries] = useState([])
  const [ newFilter, setNewFilter] = useState('')

useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  
const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  
  }

const handleOnClick = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
}  

return (
  <div>
    <Filter value={newFilter} handleFilterChange={handleFilterChange} />  
    <br />
    <Countries countries={countries} filter={newFilter} handleOnClick={handleOnClick} />
    
  </div>  
  
)
}
export default App
