import React from 'react';
import { Box, Paper, PaperProps, Stack, styled } from '@mui/material';

export const PageColumn = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '&:last-child': {
    marginBottom: theme.spacing(0),
  },
}));

export const PageWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '1fr 1fr',
    columnGap: '20px',
  },
}));

export const CustomPaper = styled((props: PaperProps) => (
  <Paper elevation={0} {...props} />
))({
  padding: '20px',
  boxShadow: '0 10px 25px rgba(29, 52, 54, 0.2)',
  borderRadius: 10,
});
