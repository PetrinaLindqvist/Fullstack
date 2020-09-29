import React from 'react'

const Persons =({persons, newFilter}) => {
    return (
        <div>{persons.filter(note => 
            note.name.toLowerCase().includes(newFilter.toLowerCase())).map(note => <li key={note.name}>{note.name} {note.number}</li>)} </div>    
    )
}
export default Persons