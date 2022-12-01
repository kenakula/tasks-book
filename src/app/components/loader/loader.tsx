import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export const Loader = (): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size={20} color="primary" />
    </Box>
  );
};
