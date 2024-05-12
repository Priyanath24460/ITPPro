import React from 'react';
import { Link } from 'react-router-dom';

const Homeevent = () => {
  return (
    <div>
      <h1>Welcome to Event Management System</h1>
      <p>Manage your events efficiently with our platform.</p>
      <div>
        <h2>Quick Links:</h2>
        <ul>
          <li><Link to="/events">View All Events</Link></li>
          <li><Link to="/create-event">Create New Event</Link></li>
          <li><Link to="/manage-items">Manage Event Items</Link></li>
          <li><Link to="/reports">View Reports</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Homeevent;
