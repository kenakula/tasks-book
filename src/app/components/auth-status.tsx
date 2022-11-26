import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { useAppDispatch } from '../store';
import { logOut } from '../store/auth/auth-slice';

export const AuthStatus = (): JSX.Element => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authenticated, loading, username } = useAppSelector(
    state => state.auth,
  );

  const clickHandler = (): void => {
    dispatch(logOut()).then(() => navigate('/'));
  };

  if (!authenticated) {
    return <p>You are not logged in. {loading && 'loading ...'}</p>;
  }

  return (
    <p>
      Welcome {username}
      <button type="button" onClick={clickHandler}>
        Sign out
      </button>
      {loading && 'loading ...'}
    </p>
  );
};
