import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal, Rate, Select, FloatButton } from 'antd';
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
    id:'',
    extraImageUrl: '',
    numberOfDoctors: 'Number of Doctors',
    numberOfDepartments: 'Number of Departments'
  });
  const [checkboxChecked, setCheckboxChecked] = useState(false); // New state for checkbox
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!formData.id || !checkboxChecked) {
      Modal.error({
        title: 'Submission Unsuccessful',
        content: 'Fill in all the details and check the declaration box.'
      });
    } else {
      Modal.success({
        title: 'Submission Successful',
        content: 'The hospital details have been submitted.',
        onOk() {
          console.log(formData);
          setFormData({
            name: '',
            city: '',
            id:'',
            imageUrl: '',
            specialities: [],
            rating: 0,
            description: '',
            extraImageUrl: '',
            numberOfDoctors: 'Number of Doctors',
            numberOfDepartments: 'Number of Departments'
          });
          setCheckboxChecked(false); // Reset checkbox state
          navigate('/edithospital');
        }
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
    navigate('/main');
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
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="Hospital I.D"
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
                <input
                  type="text"
                  name="extraImageUrl"
                  value={formData.extraImageUrl}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="form-input"
                  style={{ marginBottom: '16px' }}
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
