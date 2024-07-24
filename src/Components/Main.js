import React from 'react';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import 'antd/dist/reset.css'; // Ensure Ant Design styles are imported
import Navbar from './Navbar';

function Main() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle Plus button click
  const handlePlusClick = () => {
    navigate('/addhospital');
  };

  // Function to handle Delete button click
  const handleDeleteClick = () => {
    navigate('/deletehospital');
  };

  // Function to handle Edit button click
  const handleEditClick = () => {
    navigate('/edithospital');
  };

  return (
    <div>
    <Navbar/>
      <div>Main</div>
      <FloatButton.Group
        shape="circle"
        style={{
          right: 24,
        }}
      >
        <FloatButton icon={<PlusOutlined />} onClick={handlePlusClick} />
        <FloatButton icon={<DeleteOutlined />} onClick={handleDeleteClick} />
        <FloatButton icon={<EditOutlined />} onClick={handleEditClick} />
      </FloatButton.Group>
    </div>
  );
}

export default Main;
