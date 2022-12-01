import React from 'react';
import { Typography } from '@mui/material';
import { useGetFactQuery } from 'app/store';
import { CustomPaper, CustomPaperTitle } from 'app/shared/assets';
import { Loader } from 'app/components';

export const Facts = (): JSX.Element => {
  const { isLoading, isError, data } = useGetFactQuery(1, {
    refetchOnFocus: true,
  });

  return (
    <CustomPaper>
      <CustomPaperTitle>Факт дня</CustomPaperTitle>
      {isLoading && <Loader />}
      {isError && (
        <Typography color="error" sx={{ fontWeight: 600 }} textAlign="center">
          Произошла ошибка, попробуйте позже.
        </Typography>
      )}
      {data && <Typography>{data[0].fact}</Typography>}
    </CustomPaper>
  );
};
