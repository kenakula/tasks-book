import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
} from '@mui/material';

export const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    padding: '20px',
    borderRadius: 10,
    boxShadow: theme.shadows[9],
  },
}));

export const CustomTitle = styled(DialogTitle)(({ theme }) => ({
  marginBottom: '20px',
  padding: '0 40px 0 0',
  color: theme.palette.primary.main,
  '& .MuiButtonBase-root': {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  '& svg': {
    color: theme.palette.grey[500],
  },
}));

export const CustomContent = styled(DialogContent)({
  padding: 0,
  marginBottom: '30px',
});

export const CustomActions = styled(DialogActions)({
  padding: 0,
});
