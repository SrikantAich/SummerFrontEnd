import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { PlusOutlined, DeleteOutlined, EditOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './Navbar.css';
import Hospital from '../assets/hospital.png'; // Import the hospital image

const items = [
  {
    label: 'Home',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: 'Add Hospital',
    key: 'add',
    icon: <PlusOutlined />,
  },
  {
    label: 'Delete Hospital',
    key: 'delete',
    icon: <DeleteOutlined />,
  },
  {
    label: 'Edit Hospital',
    key: 'edit',
    icon: <EditOutlined />,
  },
];

const Navbar = () => {
  const [current, setCurrent] = useState('home');
  const navigate = useNavigate(); // Use the navigate hook

  const onClick = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case 'home':
        navigate('/main');
        break;
      case 'add':
        navigate('/addhospital');
        break;
      case 'delete':
        navigate('/deletehospital');
        break;
      case 'edit':
        navigate('/edithospital');
        break;
      default:
        break;
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-heading">
        <img src={Hospital} alt="Hospital Icon" className="hospital-icon" />
      </div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="navbar-menu"
      />
    </div>
  );
};

export default Navbar;
