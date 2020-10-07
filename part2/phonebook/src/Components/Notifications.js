import React from 'react'

const Notifications = ({message, error}) => {
     if (message && error === null) {
     return null
     }
     else if (message !== null) {
         return(
        <div
            input = "message">{message}
        </div>
    )
} 
    else if (error !== null) {
        return (
        <div
            input = "error">{error}
        </div>

        )
    }
    
}
export default Notifications