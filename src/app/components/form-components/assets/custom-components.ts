import { Checkbox, styled, TextField } from '@mui/material';

export const CustomCheckbox = styled(Checkbox)({
  padding: '16px',
  width: 18,
  height: 18,
  borderRadius: 4,
});

export const CustomInput = styled(TextField)({
  '.MuiInputBase-root': {
    borderRadius: '8px',
  },
  '.MuiFormLabel-root': {
    opacity: 0.9,
    fontSize: 14,
    lineHeight: '1.7em',
  },
});
