import React, { useEffect, useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { CustomPaper, CustomPaperTitle } from './custom-elements';
import { ReactComponent as ClockIcon } from 'assets/images/icon-clock.svg';
import { ReactComponent as CalendarIcon } from 'assets/images/icon-calendar.svg';
import { formatDate } from 'app/shared/assets';

const TimeWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  rowGap: '20px',
  columnGap: '20px',
  [theme.breakpoints.up('sm')]: {
    gridTemplate: '1fr / 1fr 1fr',
  },
}));

const DateTimeContainer = styled(Box)({
  '& .time-title': {
    marginBottom: '5px',
    fontSize: 14,
  },
  '& .time-value': {
    fontSize: 25,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    '& svg': {
      marginRight: '10px',
    },
  },
});

export const DateTimeComponent = (): JSX.Element => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timeout = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomPaper>
      <CustomPaperTitle>Такс такс такс</CustomPaperTitle>
      <TimeWrapper>
        <DateTimeContainer>
          <Typography className="time-title">На часах у нас</Typography>
          <Typography
            className="time-value"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ClockIcon />
            {formatDate(time, 'H:mm:ss')}
          </Typography>
        </DateTimeContainer>
        <DateTimeContainer>
          <Typography className="time-title">А сегодня у нас</Typography>
          <Typography
            className="time-value"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <CalendarIcon />
            {formatDate(time, 'd MMMM yyyy')}
          </Typography>
        </DateTimeContainer>
      </TimeWrapper>
    </CustomPaper>
  );
};
