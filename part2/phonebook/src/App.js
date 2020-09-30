import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'
import Persons from './Components/Persons'


const App = () => {
  const [ persons, setPersons ] = useState([])

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      id: persons.length + 1,
  
 
}
  if (persons.some(person =>
    person.name === newName)) {
  window.alert(`${newName} is already added to phonebook`)
  }
  else {
  setPersons(persons.concat(noteObject))
  setNewName('')
  setNewNumber('')
}
 
}
 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')

 
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
    

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handleFilterChange={handleFilterChange} />       
      <h2>Add a new</h2>
      <PersonForm name={newName} handleNoteChange={handleNoteChange} number={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson}/> 
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />
    </div>  
    
  )
}

export default App