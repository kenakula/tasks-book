import React from 'react';
import { Link, Typography } from '@mui/material';
import { ReactComponent as CopyIcon } from 'assets/images/icon-copy.svg';
import { FooterWrapper } from './assets';

export const Footer = (): JSX.Element => {
  return (
    <FooterWrapper component="footer">
      <Typography>
        <CopyIcon />
        copyright 2021
      </Typography>
      <Typography>Designed by CupTeam</Typography>

      <Link href="www.somesite.com">Политика конфиденциальности</Link>
    </FooterWrapper>
  );
};
