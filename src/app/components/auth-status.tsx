import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store';

export const AuthStatus = (): JSX.Element => {
  let { signout, user } = useAuth();
  let navigate = useNavigate();

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {user}!{' '}
      <button
        type="button"
        onClick={() => {
          signout(() => navigate('/'));
        }}
      >
        Sign out
      </button>
    </p>
  );
};
