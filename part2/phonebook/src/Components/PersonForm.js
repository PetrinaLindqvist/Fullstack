import React from 'react'

const PersonForm =({addPerson, handleNoteChange, handleNumberChange, newName, newNumber}) => {
    return (
        <form onSubmit={addPerson}>      
        <div>name: <input value={newName} onChange={handleNoteChange} /> </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
    )
}

  export default PersonForm