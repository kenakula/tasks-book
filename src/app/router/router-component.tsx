import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  ComparePage,
  HomePage,
  Layout,
  LoginPage,
  PremiumPage,
  ProfilePage,
  SettingsPage,
  SignupPage,
  StatsPage,
} from '../pages';
import { PrivateRoute } from './private-route';
import { ProtectedRoute } from './protected-route';
import {
  HOME_PAGE,
  PROFILE_PAGE,
  LOGIN_PAGE,
  SIGNUP_PAGE,
  STATS_PAGE,
  COMPARE_PAGE,
  SETTINGS_PAGE,
  PREMIUM_PAGE,
} from './routes';

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
            path={STATS_PAGE}
            element={
              <PrivateRoute>
                <StatsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={COMPARE_PAGE}
            element={
              <PrivateRoute>
                <ComparePage />
              </PrivateRoute>
            }
          />
          <Route
            path={SETTINGS_PAGE}
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={PREMIUM_PAGE}
            element={
              <PrivateRoute>
                <PremiumPage />
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
        <Route path="/" element={<Navigate to={HOME_PAGE} />} />
      </Routes>
    </BrowserRouter>
  );
};
