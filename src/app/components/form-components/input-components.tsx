import React from 'react';
import { InputAdornment, SxProps } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { ColorTypes, InputTypes } from 'app/shared/types';
import { CustomInput } from './assets';

interface Props<T extends FieldValues> {
  formControl: Control<T, any>;
  type: InputTypes;
  name: Path<T>;
  label?: string;
  fullwidth?: boolean;
  error?: boolean;
  errorMessage?: string;
  variant?: 'outlined' | 'standard' | 'filled';
  small?: boolean;
  color?: ColorTypes;
  styles?: SxProps;
  multiline?: number;
  id?: string;
  disabled?: boolean;
  startIcon?: JSX.Element;
}

export const InputComponent = <T extends FieldValues>({
  formControl,
  type,
  name,
  label,
  fullwidth,
  variant = 'outlined',
  small,
  color = 'primary',
  error,
  errorMessage,
  styles,
  multiline,
  disabled,
  id,
  startIcon,
}: Props<T>): JSX.Element => {
  return (
    <Controller
      control={formControl}
      name={name}
      render={({ field }) => (
        <CustomInput
          {...field}
          id={id ?? undefined}
          sx={styles}
          size={small ? 'small' : undefined}
          label={label ?? undefined}
          fullWidth={fullwidth}
          multiline={!!multiline}
          rows={multiline}
          variant={variant}
          type={type}
          color={color}
          error={error}
          disabled={disabled}
          helperText={error && errorMessage}
          InputProps={
            startIcon
              ? {
                  startAdornment: (
                    <InputAdornment position="start">
                      {startIcon}
                    </InputAdornment>
                  ),
                }
              : undefined
          }
        />
      )}
    />
  );
};
