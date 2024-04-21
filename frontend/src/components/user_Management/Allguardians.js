import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Allguardians = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guardians, setGuardians] = useState([]);

  useEffect(() => {
    const fetchGuardians = async () => {
      try {
        const response = await axios.get('http://localhost:8070/guardian/allguardians');
        setGuardians(response.data);
      } catch (error) {
        setError('Error fetching guardians');
        console.error('Error fetching guardians:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGuardians();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Guardians List</h1>
      <ul>
        {guardians.map(guardian => (
          <li key={guardian.nic}>
            <Link to={`/guardianprofile/${guardian.nic}`}>
              {guardian.name} - {guardian.nic}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Allguardians;
