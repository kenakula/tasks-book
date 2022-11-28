import React from 'react';
import { styled, SxProps, TextField } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { ColorTypes, InputTypes } from 'app/shared/types';

const CustomInput = styled(TextField)({
  '.MuiInputBase-root': {
    borderRadius: '8px',
  },
  '.MuiFormLabel-root': {
    opacity: 0.9,
    fontSize: 14,
    lineHeight: '1.7em',
  },
});

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
  id,
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
          helperText={error && errorMessage}
        />
      )}
    />
  );
};
