import React from 'react';
import './Error.css'; 
import errorImage from '../assets/error-image.jpg'; 

const Error = () => {
  return (
    <div className="error-page">
      <img src={errorImage} alt="Error" />
      <h1>Access Denied</h1>
      <p>You must be logged in to access this page.</p>
    </div>
  );
};

export default Error;
