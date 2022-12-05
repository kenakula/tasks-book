import React from 'react';
import { Box, DialogProps, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonComponent } from '../button-component/button-component';
import { DialogAction } from 'app/shared/types';
import {
  CustomDialog,
  CustomTitle,
  CustomContent,
  CustomActions,
} from './assets';

interface Props {
  title: string;
  openState: boolean;
  children: JSX.Element | JSX.Element[];
  handleClose: () => void;
  confirmLabel?: string;
  fullWidth?: boolean;
  maxWidth?: DialogProps['maxWidth'];
  titleChildren?: JSX.Element | JSX.Element[];
  handleConfirm: () => void;
  handleCancel?: () => void;
  customActions?: DialogAction[];
}

export const DialogComponent = ({
  title,
  children,
  openState,
  handleClose,
  maxWidth = 'sm',
  fullWidth = true,
  titleChildren,
  handleCancel,
  handleConfirm,
  customActions,
  confirmLabel,
}: Props): JSX.Element => {
  const handleCancelButtonClick = (): void => {
    if (handleCancel) {
      handleCancel();
    }

    handleClose();
  };

  const handleConfirmButtonClick = (): void => {
    handleConfirm();
  };

  return (
    <CustomDialog
      open={openState}
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <CustomTitle>
        {title}
        {titleChildren}
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </CustomTitle>
      <CustomContent>{children}</CustomContent>
      <CustomActions>
        <ButtonComponent
          clickHandler={handleCancelButtonClick}
          color="error"
          variant="contained"
          type="button"
          styles={{ marginRight: 'auto' }}
        >
          Отменить
        </ButtonComponent>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
          {customActions
            ? customActions.map(({ action, label }) => (
                <ButtonComponent
                  key={label}
                  clickHandler={action}
                  color="primary"
                  variant="outlined"
                  type="button"
                >
                  {label}
                </ButtonComponent>
              ))
            : null}
          <ButtonComponent
            clickHandler={handleConfirmButtonClick}
            color="primary"
            variant="contained"
            type="button"
          >
            {confirmLabel ?? 'OK'}
          </ButtonComponent>
        </Box>
      </CustomActions>
    </CustomDialog>
  );
};
