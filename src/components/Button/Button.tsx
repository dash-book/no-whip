import React from 'react';
import './Button.scss';

const Buttons: React.FC = () => {
  return (
    <div className="buttons">
      <button className="primary-btn">Employees</button>
      <button className="secondary-btn">Audits</button>
    </div>
  );
};

export default Buttons;
