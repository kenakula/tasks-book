import React from 'react';
import { Typography, Link } from '@mui/material';
import { PREMIUM_PAGE } from 'app/router';
import { NavLink } from 'react-router-dom';
import { CustomPaper } from 'app/shared/assets';

export const PremiumLink = (): JSX.Element => {
  return (
    <CustomPaper accent sx={{ padding: 0 }}>
      <Link
        component={NavLink}
        to={PREMIUM_PAGE}
        sx={{ textDecoration: 'none' }}
      >
        <Typography
          textAlign="center"
          sx={{
            padding: '13px 20px',
            color: '#ffffff',
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          Оформить премиум подписку
        </Typography>
      </Link>
    </CustomPaper>
  );
};
