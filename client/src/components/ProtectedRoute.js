import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuth = async () => {
  try {
    const response = await axios.get(`https://recipefinderappbackend.onrender.com/login/success`, { withCredentials: true });
    if (response.status === 200 && response.data.user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  } catch (err) {
    console.error("Error during authentication check:", err);
    setIsAuthenticated(false);  
  }
};

  useEffect(() => {
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div><ReactLoading className='loading' type={'spin'} color={'#ffffff'} height={'80px'} width={'80px'} /></div>;
  }

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/error" />;
};

export default ProtectedRoute;
