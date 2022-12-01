import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { DateTimeContainer, TimeWrapper } from './custom-components';
import { ReactComponent as ClockIcon } from 'assets/images/icon-clock.svg';
import { ReactComponent as CalendarIcon } from 'assets/images/icon-calendar.svg';
import { CustomPaper, CustomPaperTitle, formatDate } from 'app/shared/assets';

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
          <Typography className="time-value">
            <ClockIcon />
            {formatDate(time, 'H:mm:ss')}
          </Typography>
        </DateTimeContainer>
        <DateTimeContainer>
          <Typography className="time-title">А сегодня у нас</Typography>
          <Typography className="time-value">
            <CalendarIcon />
            {formatDate(time, 'd MMMM yyyy')}
          </Typography>
        </DateTimeContainer>
      </TimeWrapper>
    </CustomPaper>
  );
};
