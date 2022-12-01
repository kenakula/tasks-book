import { Box, styled } from '@mui/material';

export const SocialsWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  rowGap: '20px',
  '.MuiLink-root': {
    display: 'flex',
    marginRight: '20px',
    transition: 'opacity 0.2s ease-in',
    '&:hover': {
      opacity: 0.7,
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
});
