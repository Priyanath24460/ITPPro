import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventDetails.css';

const validateInput = (value, type) => {
  if (type === 'event_name' || type === 'location') {
    return /^[a-zA-Z\s]+$/.test(value);
  }
  return true;
};

function EventDetails() {
  const [events, setEvents] = useState([]);
  const [editableEventId, setEditableEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get("http://localhost:8070/event")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  const handleUpdate = (event_id) => {
    setEditableEventId(event_id);
  };

  const handleSave = (event_id) => {
    const eventToUpdate = events.find(event => event.event_id === event_id);
    const isValid = validateInput(eventToUpdate.event_name, 'name') && validateInput(eventToUpdate.location, 'location');

    if (isValid) {
      axios.put(`http://localhost:8070/event/update/${event_id}`, eventToUpdate)
        .then((response) => {
          console.log("Event updated successfully:", response.data);
          setEditableEventId(null);
          fetchEvents();
        })
        .catch((error) => {
          console.error("Error updating event:", error);
        });
    } else {
      alert("Event name and location must contain only characters.");
    }
  };

  const handleDelete = (event_id) => {
    axios.delete(`http://localhost:8070/event/delete/${event_id}`)
      .then((response) => {
        console.log("Event deleted successfully:", response.data);
        setEvents(events.filter(event => event.event_id !== event_id));
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  const handleChange = (e, event_id) => {
    const { name, value } = e.target;
    const isValid = validateInput(value, name);
    if (isValid || value === '') { // Allow empty values for now

    setEvents(events.map(event => event.event_id === event_id ? { ...event, [name]: isValid ? value : event[name] } : event));
    }
  };

  return (
    <div className="event-details-container">
      <h1>Event Details</h1>
      <table>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Actions</th>
         </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.event_id}>
              <td>{event.event_id}</td>
              <td>
                {editableEventId === event.event_id ? (
                  <input
                    type="text"
                    name="event_name"
                    value={event.event_name}
                    onChange={(e) => handleChange(e, event.event_id)}
                  />
                ) : (
                  event.event_name
                )}
              </td>
              <td>
                {editableEventId === event.event_id ? (
                  <input
                    type="date"
                    name="date"
                    value={event.date}
                    onChange={(e) => handleChange(e, event.event_id)}
                  />
                ) : (
                  event.date
                )}
              </td>
              <td>
                {editableEventId === event.event_id ? (
                  <input
                    type="time"
                    name="time"
                    value={event.time}
                    onChange={(e) => handleChange(e, event.event_id)}
                  />
                ) : (
                  event.time
                )}
              </td>
              <td>
                {editableEventId === event.event_id ? (
                  <input
                    type="text"
                    name="location"
                    value={event.location}
                    onChange={(e) => handleChange(e, event.event_id)}
                  />
                ) : (
                  event.location
                )}
              </td>
              <td>
                {editableEventId === event.event_id ? (
                  <button onClick={() => handleSave(event.event_id)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleUpdate(event.event_id)}>Update</button>
                    <button onClick={() => handleDelete(event.event_id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventDetails;