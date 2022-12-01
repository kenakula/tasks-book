import React from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Socials } from '../socials/socials';
import { CustomDivider, CustomTextElement } from './assets';

interface Props {
  text: string;
  link: string;
  linkText: string;
}

export const ConnectAccount = ({
  text,
  link,
  linkText,
}: Props): JSX.Element => {
  return (
    <>
      <CustomTextElement textAlign="center">
        {text}{' '}
        <Link component={RouterLink} to={link}>
          {linkText}
        </Link>
      </CustomTextElement>
      <CustomDivider light>или</CustomDivider>
      <Socials />
    </>
  );
};
