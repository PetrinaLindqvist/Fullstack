import React from 'react'

const Filter = ({NewFilter, handleFilterChange}) => {
    return (
        <div>
            filter shown with <input value={NewFilter} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter