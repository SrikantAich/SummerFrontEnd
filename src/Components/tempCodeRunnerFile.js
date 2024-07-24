import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography, Modal, message, Rate, Select } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import Image from "../assets/Image.png";
import ImageVid from "../assets/ImageVid.mp4";
import "./Home.css";

// Ant Design Dropdown items
const items = [
  {
    key: '1',
    label: 'Speciality 1',
  },
  {
    key: '2',
    label: 'Speciality 2',
  },
  {
    key: '3',
    label: 'Speciality 3',
  },
];

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

// Generate options for 1 to 100
const generateOptions = (max) => {
  return Array.from({ length: max }, (_, i) => (
    <Select.Option key={i + 1} value={i + 1}>
      {i + 1}
    </Select.Option>
  ));
};

const AddHospital = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    imageUrl: '',
    specialities: [],
    rating: 0,
    description: '',
    numberOfDoctors: 1,
    numberOfDepartments: 1
  });
  const [imageUrl, setImageUrl] = useState('');
  const [imageError, setImageError] = useState(false); // State to handle image load error
  const navigate = useNavigate();

  useEffect(() => {
    // Update the imageUrl state whenever formData.imageUrl changes
    setImageUrl(formData.imageUrl);
  }, [formData.imageUrl]);

  const handleLogin = () => {
    // Use Ant Design components for feedback
    Modal.success({
      title: 'Submission Successful',
      content: 'The hospital details have been submitted.',
      onOk() {
        // Clear form data
        setFormData({
          name: '',
          city: '',
          imageUrl: '',
          specialities: [],
          rating: 0,
          description: '',
          numberOfDoctors: 1,
          numberOfDepartments: 1
        });
        setImageError(false); // Reset image error state
        navigate('/addhospital');
      }
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleDropdownChange = (e) => {
    const selectedKeys = e.selectedKeys;
    setFormData({
      ...formData,
      specialities: selectedKeys
    });
  };

  const handleImageError = () => {
    setImageError(true); // Set error state if image fails to load
  };

  const handleRatingChange = (value) => {
    setFormData({
      ...formData,
      rating: value
    });
  };

  const handleSelectChange = (name) => (value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="login-main">
      <div className="login-right">
        <div className="login-right-container">
          <div className="center">
            <h2>Please enter Hospital Details</h2>
            <form>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="form-input"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="form-input"
              />
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Image URL"
                className="form-input"
              />
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="form-input"
              />

              <Dropdown
                menu={{
                  items,
                  selectable: true,
                  selectedKeys: formData.specialities,
                  onSelect: handleDropdownChange,
                  onDeselect: handleDropdownChange // Handle deselect
                }}
              >
                <Typography.Link>
                  <Space>
                    {formData.specialities.length > 0 ? formData.specialities.map(key => items.find(item => item.key === key)?.label).join(', ') : 'Select Specialities'}
                    <DownOutlined />
                  </Space>
                </Typography.Link>
              </Dropdown>
              
              <br /><br />
              <Rate
                value={formData.rating}
                onChange={handleRatingChange}
                character={({ index }) => customIcons[index + 1]}
              />

              <div className="form-selectors">
                <Select
                  value={formData.numberOfDoctors}
                  onChange={handleSelectChange('numberOfDoctors')}
                  style={{ width: '100%', marginBottom: '8px' }}
                >
                  {generateOptions(100)}
                </Select>
                <Select
                  value={formData.numberOfDepartments}
                  onChange={handleSelectChange('numberOfDepartments')}
                  style={{ width: '100%' }}
                >
                  {generateOptions(100)}
                </Select>
              </div>

              <div className="login-center-buttons">
                <button type="button" onClick={handleLogin}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="image-right">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Hospital"
            onError={handleImageError}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        ) : (
          <video
            src={ImageVid}
            autoPlay
            loop
            muted
            style={{ width: '100%', height: '80%' }}
          />
        )}
        {imageError && <p>Error loading image. Please check the URL.</p>}
      </div>
    </div>
  );
};

export default AddHospital;
