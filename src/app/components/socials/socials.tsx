import React from 'react';
import { Link, SxProps } from '@mui/material';
import { ReactComponent as FacebookIcon } from 'assets/images/icon-fb.svg';
import { ReactComponent as TwitterIcon } from 'assets/images/icon-tw.svg';
import { SocialsWrapper } from './assets';

interface Props {
  styles?: SxProps;
}

export const Socials = ({ styles = {} }: Props): JSX.Element => {
  return (
    <SocialsWrapper
      sx={{
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
