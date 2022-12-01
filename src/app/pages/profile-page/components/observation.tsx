import React from 'react';
import { Typography, Link } from '@mui/material';
import { HOME_PAGE } from 'app/router';
import { CustomPaper, CustomPaperTitle } from 'app/shared/assets';
import { Link as RouterLink } from 'react-router-dom';

export const Observation = (): JSX.Element => {
  return (
    <CustomPaper>
      <CustomPaperTitle>Наблюдение</CustomPaperTitle>
      <Typography sx={{ marginBottom: '10px' }}>
        Больше всего задач вы{' '}
        <Link component={RouterLink} to={HOME_PAGE}>
          создаете
        </Link>{' '}
        в Понедельник
      </Typography>
      <Typography>Больше всего задач вы завершаете во Вторник</Typography>
    </CustomPaper>
  );
};
