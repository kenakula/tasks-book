import React from 'react';
import { Box, Link, styled, Typography } from '@mui/material';
import { ReactComponent as CopyIcon } from '../../../assets/images/icon-copy.svg';

const FooterWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: '20px',
  padding: '20px',
  'p, a': {
    opacity: 0.6,
    fontSize: 14,
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    columnGap: '20px',
  },
}));

export const Footer = (): JSX.Element => {
  return (
    <FooterWrapper
      component="footer"
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Typography
        sx={{ display: 'flex', alignItems: 'center', svg: { mr: 1 } }}
      >
        <CopyIcon />
        copyright 2021
      </Typography>
      <Typography>Designed by CupTeam</Typography>

      <Link href="www.somesite.com">Политика конфиденциальности</Link>
    </FooterWrapper>
  );
};
