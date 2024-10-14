import React from 'react';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center align-center">
      <Space direction="vertical" size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link to="/employees">
          <Button type="default" size="large" style={{ width: '200px' }}>
            Employees
          </Button>
        </Link>
        <Link to="/audit">
          <Button type="default" size="large" style={{ width: '200px' }}>
            Audits
          </Button>
        </Link>
        <Link to="/tracking">
          <Button type="default" size="large" style={{ width: '200px' }}>
            Tracking
          </Button>
        </Link>
        <Link to="/who-is-working">
          <Button type="default" size="large" style={{ width: '200px' }}>
            Who is Working?
          </Button>
        </Link>
      </Space>
    </div>
  );
};

export default HomePage;
