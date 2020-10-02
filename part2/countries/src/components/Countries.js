import React from 'react'
import OneCountry from './OneCountry'

const Countries = ({countries, filter, handleOnClick}) => {
    const filterCountries = countries
    .filter(countries =>
    countries.name.toLowerCase().includes(filter.toLowerCase()))
        
    if (filterCountries.length > 10)  {  
     return 'Too many matches, specify anoter filter'

    } 
    else if (filterCountries.length === 1) {
         return <OneCountry country= {filterCountries[0]} />
    }
    else 
    {
    return (
        <div>
        {filterCountries.map(countries => <li Key= {countries.alpha2Code}>{countries.name}</li> )}
        </div> 
    )
  }
}
export default Countries