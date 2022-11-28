import React from 'react';
import { Box, Link, styled, SxProps } from '@mui/material';
import { ReactComponent as FacebookIcon } from 'assets/images/icon-fb.svg';
import { ReactComponent as TwitterIcon } from 'assets/images/icon-tw.svg';

const SocialsWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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

interface Props {
  styles?: SxProps;
}

export const Socials = ({ styles = {} }: Props): JSX.Element => {
  return (
    <SocialsWrapper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: '20px',
        ...styles,
      }}
    >
      <Link target="_blank" rel="noreferrer" href="www.facebook.com">
        <FacebookIcon />
      </Link>
      <Link target="_blank" rel="noreferrer" href="www.twitter.com">
        <TwitterIcon />
      </Link>
    </SocialsWrapper>
  );
};
