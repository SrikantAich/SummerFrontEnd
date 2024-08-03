import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Rate, Select, FloatButton } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import ImageVid from "../assets/ImageVid.mp4";
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

const AddHospital = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    image: '',  // Changed from imageUrl to image
    speciality: [],  // Changed from specialities to speciality
    rating: 0,
    description: '',
    numberOfDoctors: null,  // Changed default to null
    numberOfDepartments: null,  // Changed default to null
  });

  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { name, city, image, speciality, rating, description, numberOfDoctors, numberOfDepartments } = formData;

    if (!name || !city || !image || speciality.length === 0 || rating === 0 || !description || numberOfDoctors === null || numberOfDepartments === null) {
      Modal.error({
        title: 'Submission Unsuccessful',
        content: 'Fill in all the details.'
      });
    } else {
      try {
        const payload = {
          name,
          city,
          image,
          speciality,
          rating,
          description,
          numberOfDoctors,
          numberOfDepartments
        };

        const response = await fetch('https://summerbackend-ntn7.onrender.com/api/v1/addhospital', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        Modal.success({
          title: 'Submission Successful',
          content: 'The hospital details have been submitted.',
          onOk() {
            console.log(result);
            setFormData({
              name: '',
              city: '',
              image: '',  // Reset image
              speciality: [],  // Reset speciality
              rating: 0,
              description: '',
              numberOfDoctors: null,  // Reset to null
              numberOfDepartments: null,  // Reset to null
            });
            setImageError(false);
            navigate('/addhospital');
          }
        });
      } catch (error) {
        Modal.error({
          title: 'Submission Unsuccessful',
          content: 'There was an error submitting the form.'
        });
        console.error('Error:', error);
      }
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

  const handleImageError = () => {
    setImageError(true);
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

  const handleEditClick = () => {
    navigate('/edithospital');
  };

  return (
    <>
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
                <input
                  type="text"
                  name="image"
                  value={formData.image}
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
                  {generateOptions(100)} {/* Adjust the max number as needed */}
                </Select>

                <Select
                  name="numberOfDepartments"
                  value={formData.numberOfDepartments}
                  onChange={(value) => setFormData({ ...formData, numberOfDepartments: value })}
                  placeholder="Select Number of Departments"
                  style={{ width: '100%', marginBottom: '16px' }}
                >
                  {generateOptions(100)} {/* Adjust the max number as needed */}
                </Select>
                <Select
                  mode="multiple"
                  name="speciality"
                  value={formData.speciality}
                  onChange={(value) => handleSelectChange(value, 'speciality')}
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
                  <input type="checkbox" id="remember-checkbox" />
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

        <div className="image-right">
          {formData.image ? (
            <img
              src={formData.image}
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

        <FloatButton.Group
          shape="circle"
          style={{
            right: 24,
          }}
        >
          <FloatButton icon={<HomeOutlined />} onClick={handleHomeClick} />
          <FloatButton icon={<DeleteOutlined />} onClick={handleDeleteClick} />
          <FloatButton icon={<EditOutlined />} onClick={handleEditClick} />
        </FloatButton.Group>
      </div>
    </>
  );
};

export default AddHospital;
