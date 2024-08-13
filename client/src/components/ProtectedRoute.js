import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/login/success`, { withCredentials: true });
      setIsAuthenticated(!!response.data.user);
    } catch (err) {
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
