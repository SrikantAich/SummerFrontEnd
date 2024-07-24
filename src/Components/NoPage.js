import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const NoPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBackHome = () => {
    navigate('/main'); // Navigate to the home page
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="AAYEIN BAIGAN 🍆"
      extra={<Button type="primary" onClick={handleBackHome}>Back Home</Button>}
    />
  );
};

export default NoPage;
