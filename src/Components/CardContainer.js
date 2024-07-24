import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import './CardContainer.css';
import { Spin } from 'antd';

function CardContainer({ searchQuery }) {
  const [hospitals, setHospitals] = useState([]);
  const [allHospitals, setAllHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('https://summerbackend-ntn7.onrender.com/api/v1/getallhospitals');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && Array.isArray(data.hospitals)) {
          setAllHospitals(data.hospitals); // Set all hospitals initially
          setHospitals(data.hospitals); // Set hospitals to display initially
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        setError('Failed to fetch hospitals.');
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const filteredHospitals = allHospitals.filter(hospital =>
        hospital.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setHospitals(filteredHospitals);
    } else {
      setHospitals(allHospitals);
    }
  }, [searchQuery, allHospitals]);

  if (loading) {
    return (
      <div className='CardContainer'>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <p className='CardContainer'>{error}</p>;
  }

  return (
    <div className='CardContainer'>
      {hospitals.length > 0 ? (
        hospitals.map(hospital => (
          <Cards
            key={hospital._id}
            id={hospital._id}
            name={hospital.name}
            city={hospital.city}
            image={hospital.image}
            speciality={hospital.speciality}
          />
        ))
      ) : (
        <p>No hospitals found</p>
      )}
    </div>
  );
}

export default CardContainer;
