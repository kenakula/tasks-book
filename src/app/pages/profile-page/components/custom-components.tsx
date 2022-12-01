import { Avatar, Box, Stack, styled } from '@mui/material';

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

export const TimeWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  rowGap: '20px',
  columnGap: '20px',
  [theme.breakpoints.up('sm')]: {
    gridTemplate: '1fr / 1fr 1fr',
  },
}));

export const DateTimeContainer = styled(Box)({
  '& .time-title': {
    marginBottom: '5px',
    fontSize: 14,
  },
  '& .time-value': {
    display: 'flex',
    alignItems: 'center',
    fontSize: 25,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    '& svg': {
      marginRight: '10px',
    },
  },
});

export const CustomAvatar = styled(Avatar, {
  shouldForwardProp: prop => prop !== 'background',
})<{ background: string }>(({ theme, background }) => ({
  width: 100,
  height: 100,
  backgroundColor: background,
  fontSize: 38,
  [theme.breakpoints.up('md')]: {
    width: 150,
    height: 150,
    fontSize: 60,
  },
}));

export const FileInput = styled('input')({
  display: 'none',
});

export const InfoWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '20px',
  columnGap: '20px',
  '& > .MuiBox-root': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '10px',
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
}));
