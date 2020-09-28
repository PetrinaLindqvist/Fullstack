import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1827883' }
  ]) 
 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
    

    const handleNumberChange = (event) => {
      console.log(event.target.value)
      setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} > 
        <div>name: <input value={newName} onChange={handleNoteChange} /> </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
        {persons.map(note => 
          <div key={note.name}> {note.name} {note.number}
          </div>
        )}
      
    </div>
  )
}

export default App