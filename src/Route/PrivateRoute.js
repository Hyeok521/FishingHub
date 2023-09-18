import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router';

const PrivateRoute = ({ authenticate, children }) => {
  const location = useLocation();

  if (!authenticate) {
    return <Navigate to="/login" replace state={{ to: location }} />;
  }
  return children;
};

export default PrivateRoute;
