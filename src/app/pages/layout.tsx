import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from 'app/components';
import { useAppSelector } from 'app/hooks';
import { MainBox } from 'app/shared/assets';

export const Layout = (): JSX.Element => {
  const { authenticated } = useAppSelector(state => state.auth);

  return (
    <>
      <Header />
      <MainBox authed={authenticated} component="main">
        <Outlet />
      </MainBox>
      {authenticated ? null : <Footer />}
    </>
  );
};
