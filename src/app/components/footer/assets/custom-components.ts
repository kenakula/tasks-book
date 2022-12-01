import { Box, styled } from '@mui/material';

export const FooterWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: '20px',
  padding: '20px',
  '& .MuiTypography-root': {
    display: 'flex',
    alignItems: 'center',
    '& svg': { marginRight: '5px' },
  },
  'p, a': {
    opacity: 0.6,
    fontSize: 14,
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: '20px',
  },
}));
