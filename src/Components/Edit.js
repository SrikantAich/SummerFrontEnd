import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, DeleteOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Modal, Rate, Select, FloatButton, Tooltip } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import './Home.css';

// Ant Design Dropdown items for Specialities
const specialityItems = [
  { key: 'Cardiology', label: 'Cardiology' },
  { key: 'Anesthesiology', label: 'Anesthesiology' },
  { key: 'Emergency medicine', label: 'Emergency medicine' },
  { key: 'Gastroenterology', label: 'Gastroenterology' },
  { key: 'Pediatrics', label: 'Pediatrics' },
  { key: 'Dermatology', label: 'Dermatology' },
];

// Custom Icons for Rating
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

const EditHospital = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    imageUrl: '',
    specialities: [],
    rating: 0,
    description: '',
    id: '',
    extraImageUrl: '',
    numberOfDoctors: 'Number of Doctors',
    numberOfDepartments: 'Number of Departments'
  });
  const [checkboxChecked, setCheckboxChecked] = useState(false); // New state for checkbox
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validate required fields
    if (!formData.id || !formData.name || !formData.description || !checkboxChecked) {
      Modal.error({
        title: 'Submission Unsuccessful',
        content: (
          <>
            <p>Fill in all the required details and check the declaration box.</p>
            <p>Required fields: Hospital ID, Name, and Description.</p>
          </>
        )
      });
      return;
    }

    // Create the request body
    const requestBody = {
      id: formData.id,
      name: formData.name,
      city: formData.city,
      imageUrl: formData.imageUrl,
      specialities: formData.specialities,
      rating: formData.rating,
      description: formData.description,
    };

    if (formData.numberOfDoctors !== 'Number of Doctors') {
      requestBody.numberOfDoctors = Number(formData.numberOfDoctors);
    }

    if (formData.numberOfDepartments !== 'Number of Departments') {
      requestBody.numberOfDepartments = Number(formData.numberOfDepartments);
    }

    try {
      const response = await fetch('https://summerbackend-ntn7.onrender.com/api/v1/edithospital', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred');
      }

      const data = await response.json();
      console.log(data); // Inspect the response from the server

      Modal.success({
        title: 'Submission Successful',
        content: 'The hospital details have been submitted.',
        onOk() {
          setFormData({
            name: '',
            city: '',
            id: '',
            imageUrl: '',
            specialities: [],
            rating: 0,
            description: '',
            numberOfDoctors: 'Number of Doctors',
            numberOfDepartments: 'Number of Departments'
          });
          setCheckboxChecked(false);
          navigate('/edithospital');
        }
      });
    } catch (error) {
      console.error('Error submitting form:', error.message);
      Modal.error({
        title: 'Submission Failed',
        content: `An error occurred: ${error.message}. Please try again.`
      });
    }
  };

  const handleSelectChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setCheckboxChecked(checked); // Update checkbox state
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      if (name === 'extraImageUrl') {
        setFormData(prevData => ({
          ...prevData,
          imageUrl: value
        }));
      }
    }
  };

  const handleRatingChange = (value) => {
    setFormData({
      ...formData,
      rating: value
    });
  };

  const handleHomeClick = () => {
    navigate('/addhospital');
  };

  const handleDeleteClick = () => {
    navigate('/deletehospital');
  };

  const handleAddClick = () => {
    navigate('/addhospital');
  };

  return (
    <>
      <div className="login-main">
        <div className="login-right">
          <div className="login-right-container">
            <div className="center">
              <h2>Edit Hospital Details</h2>
              <form>
                <div className="form-input-with-info">
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="Hospital I.D"
                    className="form-input"
                  />
                  <Tooltip title="Hospital ID is available on the home page.">
                    <InfoCircleOutlined className="info-icon" style={{ fontSize: '24px' }}/>
                  </Tooltip>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Hospital Name"
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
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="form-input"
                />
            
                <Select
                  name="numberOfDoctors"
                  value={formData.numberOfDoctors}
                  onChange={(value) => setFormData({ ...formData, numberOfDoctors: value })}
                  placeholder="Select Number of Doctors"
                  style={{ width: '100%', marginBottom: '16px' }}
                >
                  {generateOptions(10)}
                </Select>
                <Select
                  name="numberOfDepartments"
                  value={formData.numberOfDepartments}
                  onChange={(value) => setFormData({ ...formData, numberOfDepartments: value })}
                  placeholder="Select Number of Departments"
                  style={{ width: '100%', marginBottom: '16px' }}
                >
                  {generateOptions(10)}
                </Select>
                <Select
                  mode="multiple"
                  name="specialities"
                  value={formData.specialities}
                  onChange={(value) => handleSelectChange(value, 'specialities')}
                  placeholder="Select Specialities"
                  style={{ width: '100%', marginBottom: '16px' }}
                >
                  {specialityItems.map(item => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
                <br /><br />
                <Rate
                  value={formData.rating}
                  onChange={handleRatingChange}
                  character={({ index }) => customIcons[index + 1]}
                />
                <div className="remember-div">
                  <input
                    type="checkbox"
                    id="remember-checkbox"
                    checked={checkboxChecked} // Bind checkbox state
                    onChange={handleChange}
                  />
                  <label htmlFor="remember-checkbox">
                    I hereby declare that the information provided is true to the best of my knowledge.
                  </label>
                </div>
                <div className="login-center-buttons">
                  <button type="button" onClick={handleLogin}>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <FloatButton.Group
          shape="circle"
          style={{
            right: 24,
          }}
        >
          <FloatButton icon={<HomeOutlined />} onClick={handleHomeClick} />
          <FloatButton icon={<DeleteOutlined />} onClick={handleDeleteClick} />
          <FloatButton icon={<PlusOutlined />} onClick={handleAddClick} />
        </FloatButton.Group>
      </div>
    </>
  );
};

export default EditHospital;
