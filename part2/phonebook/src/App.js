import React, { useState, useEffect } from 'react'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'
import Persons from './Components/Persons'
import personsTwo from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  

  useEffect(() => {
    personsTwo
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      id: persons.length + 1,
      
    }
  

  if (persons.every((note) => note.name.toLowerCase() !== newName.toLowerCase()))
  {
    personsTwo
      .create(noteObject)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNewName('')
        setNewNumber('')    
})
}

  else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
    personUpdated(noteObject)
  }  
 
}

const personUpdated = (person) => {
  const identity = persons.find(n => n.name.toLowerCase() === person.name.toLowerCase()).id
  person = {...person, id: identity}
  personsTwo
  .update(identity, person)
  .then(returnedNote => {
    setPersons(persons.map(n => n.id !== identity ? n : returnedNote))
    setNewName('')
    setNewNumber('')
  })

}
const deletePerson = (id) => {
  const person = persons.find((persons) => persons.id === id)
  if (window.confirm(`Delete ${person.name}?`)) {
  console.log('delete')
  personsTwo
  .takeAway(id)
  .then()
  setPersons(persons.filter(persons => id !== persons.id))
  }
}


 
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
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson} />
    </div>  
    
  )
}

export default App