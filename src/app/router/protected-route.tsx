import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import { HOME_PAGE } from './routes';

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props): JSX.Element => {
  const { authenticated } = useAppSelector(state => state.auth);

  if (authenticated) {
    return <Navigate to={HOME_PAGE} />;
  }

  return children;
};
