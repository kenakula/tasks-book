import React from 'react';
import { Avatar, IconButton, styled, SxProps } from '@mui/material';
import {
  getAvatarLetters,
  getUsernameColorString,
} from '../../../shared/assets';

const CustomAvatar = styled(Avatar, {
  shouldForwardProp: prop => prop !== 'background',
})<{ background: string }>(({ theme, background }) => ({
  cursor: 'pointer',
  backgroundColor: background,
  [theme.breakpoints.up('sm')]: {
    width: 44,
    height: 44,
  },
}));

interface Props {
  username: string;
  clickHandler?: (event: React.MouseEvent<HTMLElement>) => void;
  imagePath?: string;
  styles?: SxProps;
}

export const AvatarComponent = ({
  username,
  clickHandler,
  imagePath,
  styles,
}: Props): JSX.Element => {
  return (
    <IconButton onClick={clickHandler ?? undefined}>
      <CustomAvatar
        src={imagePath ?? undefined}
        sx={styles ?? undefined}
        background={getUsernameColorString(username)}
      >
        {getAvatarLetters(username)}
      </CustomAvatar>
    </IconButton>
  );
};
