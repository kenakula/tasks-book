import React from 'react';
import {
  Box,
  Paper,
  PaperProps,
  Stack,
  styled,
  Typography,
} from '@mui/material';

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
  [theme.breakpoints.up('xl')]: {
    columnGap: '70px',
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
