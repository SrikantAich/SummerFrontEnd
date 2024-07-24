import React from 'react';
import { Card, message, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

function Cards({ id, name, city, image, speciality }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(id)
      .then(() => {
        message.success('ID copied to clipboard');
      })
      .catch(err => {
        message.error('Failed to copy ID');
        console.error('Error copying text: ', err);
      });
  };

  return (
    <Link to={`/hospital/${id}`} style={{ textDecoration: 'none' }}>
      <Card
        hoverable
        style={{ width: 290, height: 350, marginTop: 15 }}
        cover={<img alt={name} src={image} style={{ height: 150, objectFit: 'cover' }} />}
      >
        <Meta
          title={name}
          description={
            <div style={{ height: 'calc(100% - 150px)', overflow: 'hidden' }}>
              <h4 style={{ margin: 0 }}>
                ID: {id}
                <Tooltip title="Click to copy">
                  <CopyOutlined onClick={handleCopy} style={{ cursor: 'pointer', marginLeft: 8 }} />
                </Tooltip>
              </h4>
              <p>City: {city}</p>
              <p>Speciality: {speciality.join(', ')}</p>
            </div>
          }
        />
      </Card>
    </Link>
  );
}

export default Cards;
