import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useGetFactQuery } from 'app/store/facts/facts.query';
import { CustomPaper, CustomPaperTitle } from './custom-elements';

export const Facts = (): JSX.Element => {
  const { isLoading, isError, data } = useGetFactQuery(1, {
    refetchOnFocus: true,
  });

  return (
    <CustomPaper>
      <CustomPaperTitle>Факт дня</CustomPaperTitle>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={20} color="primary" />
        </Box>
      )}
      {isError && (
        <Typography color="error" sx={{ fontWeight: 600 }} textAlign="center">
          Произошла ошибка, попробуйте позже.
        </Typography>
      )}
      {data && <Typography>{data[0].fact}</Typography>}
    </CustomPaper>
  );
};
