import React from 'react';
import { Checkbox, FormControlLabel, styled } from '@mui/material';
import { Controller } from 'react-hook-form';

const CustomCheckbox = styled(Checkbox)({
  padding: '16px',
  width: 18,
  height: 18,
  borderRadius: 4,
});

interface Props {
  error?: boolean;
  errorMessage?: string;
  formControl: any;
  name: string;
  label?: string;
  color?: 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning';
  disabled?: boolean;
}

export const CheckboxComponent = ({
  formControl,
  name,
  color = 'primary',
  label,
  disabled,
}: Props): JSX.Element => {
  return (
    <FormControlLabel
      sx={{ marginLeft: '-2px' }}
      control={
        <Controller
          name={name}
          control={formControl}
          render={({ field }) => (
            <CustomCheckbox
              disabled={disabled}
              color={color}
              {...field}
              checked={field.value}
              onChange={e => field.onChange(e.target.checked)}
            />
          )}
        />
      }
      label={label}
    />
  );
};
