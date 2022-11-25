import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store';
import { LOGIN_PAGE } from './routes';

export const PrivateRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={LOGIN_PAGE} state={{ from: location }} replace />;
  }

  return children;
};
