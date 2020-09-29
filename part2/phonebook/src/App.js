import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')

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

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} > 
        <div>filter shown with<input value={newFilter} onChange={handleFilterChange} /> </div>        
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson} > 
        <div>name: <input value={newName} onChange={handleNoteChange} /> </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(note => 
          note.name.toLowerCase().includes(newFilter.toLowerCase())).map(note => <li key={note.name}>{note.name} {note.number}</li>)}
      </ul> 
    </div>  
    
  )
}

export default App