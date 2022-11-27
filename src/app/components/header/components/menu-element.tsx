import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Theme,
  Menu,
  styled,
  MenuProps,
  alpha,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { ReactComponent as DropdownIcon } from '../../../../assets/images/icon-drop.svg';
import { renderIcon } from '../assets';
import { PREMIUM_PAGE, PROFILE_PAGE, SETTINGS_PAGE } from '../../../router';
import { NavLink } from 'react-router-dom';
import { useCustomTheme } from '../../../themes/theme';

const CustomMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 10,
    marginTop: theme.spacing(2),
    padding: '20px 0',
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow: theme.shadows[12],
    '& .MuiMenu-list': {
      padding: '4px 0',
      fontSize: 12,
    },
    '& .MuiMenuItem-root': {
      marginBottom: '10px',
      '&:last-child': {
        marginBottom: 0,
      },
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

interface Props {
  theme: Theme;
  username: string;
  handleLogout: () => void;
  isMobile: boolean;
}

export const MenuElement = ({
  theme,
  username,
  handleLogout,
  isMobile,
}: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { toggleColorMode } = useCustomTheme();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleColorMode = (): void => {
    handleClose();

    if (toggleColorMode) {
      toggleColorMode();
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!isMobile && (
          <Typography
            sx={{
              marginRight: '20px',
              fontSize: 16,
              fontWeight: 500,
              color: theme.palette.text.primary,
            }}
          >
            Хорошего дня, {username}
          </Typography>
        )}
        <Avatar
          sx={{
            bgcolor: deepPurple[500],
            marginRight: '10px',
            width: 44,
            height: 44,
          }}
        >
          KA
        </Avatar>
        <IconButton
          size="large"
          onClick={handleClick}
          sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
        >
          <DropdownIcon fontSize="64px" />
        </IconButton>
        <CustomMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose} component={NavLink} to={PROFILE_PAGE}>
            <ListItemIcon sx={{ minWidth: 30 }}>
              {renderIcon('user')}
            </ListItemIcon>
            <ListItemText primary="Личный кабинет" />
          </MenuItem>
          <MenuItem
            onClick={handleColorMode}
            sx={{
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.warning.main
                  : theme.palette.text.primary,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 30,
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.warning.main
                    : theme.palette.text.primary,
                '& svg': {
                  fill:
                    theme.palette.mode === 'dark'
                      ? theme.palette.warning.main
                      : 'none',
                },
              }}
            >
              {renderIcon('moon')}
            </ListItemIcon>
            <ListItemText primary="Темный режим" />
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            component={NavLink}
            to={SETTINGS_PAGE}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              {renderIcon('settings')}
            </ListItemIcon>
            <ListItemText primary="Настройки" />
          </MenuItem>
          <MenuItem onClick={handleClose} component={NavLink} to={PREMIUM_PAGE}>
            <ListItemIcon
              sx={{ minWidth: 30, color: theme.palette.primary.main }}
            >
              {renderIcon('star')}
            </ListItemIcon>
            <ListItemText
              sx={{ color: theme.palette.primary.main }}
              primary="Премиум"
            />
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleLogout();
            }}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              {renderIcon('logout')}
            </ListItemIcon>
            <ListItemText primary="Выйти" />
          </MenuItem>
        </CustomMenu>
      </Box>
    </Box>
  );
};
