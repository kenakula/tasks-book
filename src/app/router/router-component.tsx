import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, ProfilePage } from '../pages';
import Layout from '../pages/layout';
import { LoginPage } from '../pages/login-page';
import { SignupPage } from '../pages/signup-page';
import { PrivateRoute } from './private-route';
import { ProtectedRoute } from './protected-route';
import { HOME_PAGE, PROFILE_PAGE, LOGIN_PAGE, SIGNUP_PAGE } from './routes';

export const RouterComponent = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path={HOME_PAGE}
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path={PROFILE_PAGE}
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path={LOGIN_PAGE}
            element={
              <ProtectedRoute>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={SIGNUP_PAGE}
            element={
              <ProtectedRoute>
                <SignupPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
