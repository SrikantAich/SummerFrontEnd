import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, EditOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Modal, FloatButton, Tooltip } from 'antd';
import './Home.css';

function Delete() {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    id:'',
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!formData.name || !formData.city || !formData.id ) {
      Modal.error({
        title: 'Submission Unsuccessful',
        content: 'Fill in all the details.'
      });
    } else {
      try {
        const response = await fetch('https://summerbackend-ntn7.onrender.com/api/v1/deletehospital', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          Modal.success({
            title: 'Submission Successful',
            content: 'The hospital details have been deleted.',
            onOk() {
              console.log(formData);
              setFormData({
                name: '',
                city: '',
                id:'',
              });
              navigate('/deletehospital');
            }
          });
        } else {
          const errorData = await response.json();
          Modal.error({
            title: 'Submission Unsuccessful',
            content: `Error: ${errorData.message}`,
          });
        }
      } catch (error) {
        Modal.error({
          title: 'Submission Unsuccessful',
          content: `Error: ${error.message}`,
        });
      }
    }
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

  const handleEditClick = () => {
    navigate('/edithospital');
  };

  const handleHomeClick = () => {
    navigate('/main');
  };

  const handleAddClick = () => {
    navigate('/addhospital');
  };

  return (
    <div className="container">
      <div className="main">
        <div className="login-main">
          <div className="login-right">
            <div className="login-right-container">
              <div className="center">
                <h2>Please enter Hospital Details</h2>
                <form>
                  <div className="input-container">
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      placeholder="I.D"
                      className="form-input"
                    />
                    <Tooltip title="Hospital ID is available on the home page.">
                      <InfoCircleOutlined className="info-icon" style={{ fontSize: '24px' }} />
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
                  <div className="remember-div">
                    <input type="checkbox" id="remember-checkbox" />
                    <label htmlFor="remember-checkbox">
                      I am sure I want to delete this hospital.
                    </label>
                  </div>
                  <div className="login-center-buttons">
                    <button type="button" onClick={handleLogin}>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>
          Delete
          <FloatButton.Group
            shape="circle"
            style={{ right: 24 }}
          >
            <FloatButton icon={<HomeOutlined />} onClick={handleHomeClick} />
            <FloatButton icon={<PlusOutlined />} onClick={handleAddClick} />
            <FloatButton icon={<EditOutlined />} onClick={handleEditClick} />
          </FloatButton.Group>
        </div>
      </div>
    </div>
  );
}

export default Delete;
