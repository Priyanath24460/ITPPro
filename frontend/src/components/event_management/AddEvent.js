import React, { useState } from 'react';
import './AddEvent.css'; // Import the CSS file
import axios from 'axios';

function AddEvent({ onEventAdded }) {
  const [eventId, setEventId] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const handleAddEvent = (e) => {
    e.preventDefault();

    const eventData = {
      event_id: eventId,
      event_name: eventName,
      date: eventDate,
      time: eventTime,
      location: eventLocation
    };

    axios.post("http://localhost:8070/event/add", eventData)
      .then((response) => {
        alert(response.data); // Display the success message from the server
        // Pass the event details back to the parent component
        onEventAdded(eventData);
        // Reset form fields after adding event
        setEventId('');
        setEventName('');
        setEventDate('');
        setEventTime('');
        setEventLocation('');
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          console.error(err);
          alert("Error adding event: " + err.response.data.error); // Display the error message from the server
         } 

        //can handle clearing the form fields here too
        setEventId('');
        setEventName('');
        setEventDate('');
        setEventTime('');
        setEventLocation('');
      });
  };

 // Function to validate event name and location input
const validateInput = (value, type) => {
  if (value === '') {
    return true; // Allow empty strings
  }
  if (type === 'name' || type === 'location') {
    return /^[a-zA-Z\s]+$/.test(value);
  } else if (type === 'id') {
    return /^\d+$/.test(value);
  }
};


  return (
    <div className="add-event-container">
      <h1>Add Event</h1>
      <form className="add-event-form" onSubmit={handleAddEvent}>
        <div>
          <label htmlFor="eventId">Event ID:</label>
          <input
            type="text"
            id="eventId"
            value={eventId}
            onChange={(e) => {
              const value = e.target.value;
              if (validateInput(value, 'id')) {
                setEventId(value);
              }
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => {
              const value = e.target.value;
              if (validateInput(value, 'name')) {
                setEventName(value);
              }
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="eventDate">Date:</label>
          <input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="eventTime">Time:</label>
          <input
            type="time"
            id="eventTime"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="eventLocation">Location:</label>
          <input
            type="text"
            id="eventLocation"
            value={eventLocation}
            onChange={(e) => {
              const value = e.target.value;
              if (validateInput(value, 'location')) {
               setEventLocation(value);
              }
            }}
            required
          />
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default AddEvent;