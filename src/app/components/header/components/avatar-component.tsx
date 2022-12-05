import React from 'react';
import { Avatar, IconButton, styled, SxProps } from '@mui/material';
import {
  getAvatarLetters,
  getMediaUrl,
  getUsernameColorString,
} from 'app/shared/assets';
import { MediaModel } from 'app/shared/models';

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
  username?: string;
  clickHandler?: (event: React.MouseEvent<HTMLElement>) => void;
  image?: string | MediaModel;
  styles?: SxProps;
}

export const AvatarComponent = ({
  username,
  clickHandler,
  image,
  styles,
}: Props): JSX.Element => {
  return (
    <IconButton onClick={clickHandler ?? undefined}>
      {username && (
        <CustomAvatar
          src={getMediaUrl(image)}
          sx={styles ?? undefined}
          background={getUsernameColorString(username)}
        >
          {getAvatarLetters(username)}
        </CustomAvatar>
      )}
    </IconButton>
  );
};
