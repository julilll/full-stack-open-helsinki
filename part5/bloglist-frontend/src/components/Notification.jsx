import React from 'react'
import './notification.css'

const Notification = ({ message, status }) => {
  if (!message) {
    return null
  }

  return <div className={status} id="notification">{message}</div>
}

export default Notification
