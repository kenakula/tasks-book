import React from 'react';
import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../components';
import { DRAWER_WIDTH } from '../shared/assets/layout-variables';
import { useAppSelector } from '../hooks';

const MainBox = styled(Box, { shouldForwardProp: prop => prop !== 'authed' })<{
  authed: boolean;
}>(({ theme, authed }) => ({
  position: 'relative',
  flexGrow: 1,
  padding: '80px 20px 0',

  [theme.breakpoints.up('sm')]: {
    paddingLeft: `${(authed ? DRAWER_WIDTH : 0) + 20}px`,
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: `${(authed ? DRAWER_WIDTH : 0) + 70}px`,
    paddingRight: '70px',
  },
}));

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
