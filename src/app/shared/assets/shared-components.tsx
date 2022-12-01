import React from 'react';
import { Box, Paper, PaperProps, styled, Typography } from '@mui/material';
import { DRAWER_WIDTH } from './layout-variables';

export const MainBox = styled(Box, {
  shouldForwardProp: prop => prop !== 'authed',
})<{
  authed: boolean;
}>(({ theme, authed }) => ({
  position: 'relative',
  flexGrow: 1,
  padding: '80px 20px 0',

  [theme.breakpoints.up('md')]: {
    paddingLeft: `${(authed ? DRAWER_WIDTH : 0) + 20}px`,
  },
  [theme.breakpoints.up('xl')]: {
    paddingLeft: `${(authed ? DRAWER_WIDTH : 0) + 70}px`,
    paddingRight: '70px',
  },
}));

export const CustomPaper = styled(
  (props: PaperProps) => <Paper elevation={0} {...props} />,
  { shouldForwardProp: prop => prop !== 'accent' },
)<{ accent?: boolean }>(({ theme, accent }) => ({
  padding: '20px',
  boxShadow: '0 10px 25px rgba(29, 52, 54, 0.2)',
  borderRadius: 10,
  background: accent
    ? theme.palette.warning.main
    : theme.palette.background.paper,
  '&:hover': accent
    ? {
        boxShadow: '0 10px 30px rgba(29, 52, 54, 0.4)',
      }
    : undefined,
}));

export const CustomPaperTitle = styled(Typography)(({ theme }) => ({
  marginBottom: '20px',
  fontSize: 18,
  fontWeight: 500,
  color: theme.palette.primary.main,
}));

export const InputWrapper = styled(Box)({
  width: '100%',
  '& .MuiTypography-root': {
    display: 'block',
    marginBottom: '10px',
    fontSize: 14,
    fontWeight: 500,
  },
});

export const ButtonWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
});

export const FormWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  top: '50%',
  margin: '0 auto',
  padding: 20,
  maxWidth: 350,
  borderRadius: 10,
  transform: 'translateY(-50%)',
  boxShadow: '0 10px 25px rgba(29, 52, 54, 0.2)',
  background: theme.palette.background.paper,
}));

export const FormTitle = styled(Typography)({
  fontSize: 18,
  fontWeight: 500,
  marginBottom: '20px',
});
