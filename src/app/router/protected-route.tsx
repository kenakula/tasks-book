import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store';
import { HOME_PAGE } from './routes';

export const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  let auth = useAuth();

  if (auth.user) {
    return <Navigate to={HOME_PAGE} />;
  }

  return children;
};
