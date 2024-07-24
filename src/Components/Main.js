import React, { useState, useEffect } from 'react';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are imported
import Navbar from './Navbar';
import CardContainer from './CardContainer';
import './Main.css';
import { Input, Space, Spin } from 'antd'; // Import Input, Space, and Spin from Ant Design
import { SearchOutlined } from '@ant-design/icons'; // Import SearchOutlined icon

const { Search } = Input;

function Main() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Replace this with your actual API call
  }, []);

  // Handle change in the search input field
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}> {/* Add padding for spacing */}
        <Space direction="vertical" style={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: 50 }}>
          <Input
            placeholder="Enter area to search hospitals"
            allowClear
            size="large"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ width: '75vw' }}
            prefix={<SearchOutlined />} // Add search icon
          />
        </Space>
      </div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          <Spin size="large" />
        </div>
      ) : (
        <CardContainer searchQuery={searchQuery} />
      )}
    </div>
  );
}

export default Main;
