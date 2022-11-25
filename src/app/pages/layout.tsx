import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthStatus } from '../components/auth-status';
import { HOME_PAGE, PROFILE_PAGE } from '../router';

const Layout = (): JSX.Element => {
  return (
    <>
      <header>
        <AuthStatus />
        <nav>
          <ul>
            <li>
              <Link to={HOME_PAGE}>home page</Link>
            </li>
            <li>
              <Link to={PROFILE_PAGE}>profile page</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
};

export default Layout;
