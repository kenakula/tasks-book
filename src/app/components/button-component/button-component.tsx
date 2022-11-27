import { Button, styled, SxProps } from '@mui/material';
import React from 'react';
import { LoadingButton } from '@mui/lab';
import { ColorTypes } from '../../shared/types';

const CustomButton = styled(Button)({
  padding: '7px 25px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 500,
});

const CustomLoadingButton = styled(LoadingButton)({
  padding: '7px 25px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 500,
});

interface Props {
  type: 'button' | 'submit' | 'reset';
  children: JSX.Element | string;
  variant?: 'text' | 'outlined' | 'contained';
  color?: ColorTypes;
  styles?: SxProps;
  loadingIcon?: boolean;
  loading?: boolean;
}

export const ButtonComponent = ({
  type,
  children,
  variant = 'contained',
  color = 'primary',
  styles,
  loadingIcon,
  loading,
}: Props): JSX.Element => {
  if (loadingIcon) {
    return (
      <CustomLoadingButton
        type={type}
        variant={variant}
        color={color}
        sx={styles ?? undefined}
        loading={loading}
      >
        {children}
      </CustomLoadingButton>
    );
  }

  return (
    <CustomButton
      type={type}
      variant={variant}
      color={color}
      sx={styles ?? undefined}
    >
      {children}
    </CustomButton>
  );
};
