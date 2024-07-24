import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Spin, message, FloatButton } from 'antd';
import { HomeOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './HospitalDetail.css'; // Import the CSS file
import NavBar from './Navbar';

function HospitalDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const response = await fetch(`https://summerbackend-ntn7.onrender.com/api/v1/hospitalsbyid/${id}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
        }
        const data = await response.json();
        if (data && data.hospital) {
          setHospital(data.hospital);
        } else {
          throw new Error('Hospital not found');
        }
      } catch (error) {
        console.error('Error fetching hospital details:', error);
        setError(`Failed to fetch hospital details: ${error.message}`);
        message.error(`Failed to fetch hospital details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalDetails();
  }, [id]);

  const handleHomeClick = () => {
    navigate('/main'); // Updated route for home
  };

  const handleAddClick = () => {
    navigate('/addhospital'); // Navigate to add hospital page
  };

  const handleEditClick = () => {
    navigate(`/edithospital`); // Navigate to edit hospital page with ID
  };

  const handleDeleteClick = () => {
    navigate(`/deletehospital`); // Navigate to delete hospital page with ID
  };

  if (loading) {
    return (
      <div className="hospital-details-container">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!hospital) {
    return <p>No hospital details available</p>;
  }

  return (
    <>
      <NavBar />
      <div className="hospital-details-container">
        <div className="hospital-details">
          <img src={hospital.image} alt={hospital.name} className="hospital-image" />
          <div className="hospital-info">
            <h1>{hospital.name}</h1>
            <p><strong>Address:</strong> {hospital.city}</p>
            <p><strong>Description:</strong> {hospital.description}</p>
            <p><strong>Speciality:</strong> {hospital.speciality.join(', ')}</p>
            <p><strong>Rating:</strong> {hospital.rating}</p>
            <p><strong>Number of Doctors:</strong> {hospital.numberOfDoctors}</p>
            <p><strong>Number of Departments:</strong> {hospital.numberOfDepartments}</p>
          </div>
        </div>
      </div>
      <FloatButton.Group
        shape="circle"
        style={{ right: 24, bottom: 24 }}
      >
        <FloatButton icon={<HomeOutlined />} onClick={handleHomeClick} />
        <FloatButton icon={<PlusOutlined />} onClick={handleAddClick} />
        <FloatButton icon={<EditOutlined />} onClick={handleEditClick} />
        <FloatButton
        icon={<DeleteOutlined />} onClick={handleDeleteClick}
      />
      </FloatButton.Group>
     
    </>
  );
}

export default HospitalDetails;
