import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { HOME_PAGE } from './routes';

export const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const { authenticated } = useAppSelector(state => state.auth);

  if (authenticated) {
    return <Navigate to={HOME_PAGE} />;
  }

  return children;
};
