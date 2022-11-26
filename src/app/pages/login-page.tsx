import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { logIn } from '../store/auth/auth-slice';

export const LoginPage = (): JSX.Element => {
  let navigate = useNavigate();
  let location = useLocation();
  const dispatch = useAppDispatch();

  let from = location.state?.from?.pathname || '/';

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get('username') as string;

    dispatch(logIn(username)).then(() => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <span>
          Username: <input name="username" type="text" />
        </span>{' '}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
