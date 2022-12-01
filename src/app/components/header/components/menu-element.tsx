import React, { useState } from 'react';
import {
  Box,
  Theme,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from '@mui/material';
import { ReactComponent as DropdownIcon } from 'assets/images/icon-drop.svg';
import { PREMIUM_PAGE, PROFILE_PAGE, SETTINGS_PAGE } from 'app/router';
import { NavLink } from 'react-router-dom';
import { useCustomTheme } from 'app/themes/theme';
import { AvatarComponent } from './avatar-component';
import {
  ColorModeToggler,
  CustomMenu,
  DropdownButton,
  GreetingsElement,
  renderIcon,
} from '../assets';
import { setCurrentCategory, useAppDispatch } from 'app/store';
import { defaultTaskCategory } from 'app/shared/assets';

interface Props {
  theme: Theme;
  username: string;
  handleLogout: () => void;
  isMobile: boolean;
  avatar: string;
}

export const MenuElement = ({
  theme,
  avatar,
  username,
  isMobile,
  handleLogout,
}: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const { toggleColorMode } = useCustomTheme();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleColorModeClick = (): void => {
    handleClose();

    if (toggleColorMode) {
      toggleColorMode();
    }
  };

  const handleLinkClick = (): void => {
    handleClose();
    dispatch(setCurrentCategory(defaultTaskCategory));
  };

  const handleLogoutClick = (): void => {
    handleClose();
    handleLogout();
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
          <GreetingsElement>
            Хорошего дня, <span>{username}</span>
          </GreetingsElement>
        )}
        <AvatarComponent
          clickHandler={handleClick}
          username={username}
          imagePath={avatar}
        />
        <DropdownButton onClick={handleClick} open={open}>
          <DropdownIcon fontSize="64px" />
        </DropdownButton>
        <CustomMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem
            onClick={handleLinkClick}
            component={NavLink}
            to={PROFILE_PAGE}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              {renderIcon('user')}
            </ListItemIcon>
            <ListItemText primary="Личный кабинет" />
          </MenuItem>
          <ColorModeToggler onClick={handleColorModeClick}>
            <ListItemIcon>{renderIcon('moon')}</ListItemIcon>
            <ListItemText primary="Темный режим" />
          </ColorModeToggler>
          <MenuItem
            onClick={handleLinkClick}
            component={NavLink}
            to={SETTINGS_PAGE}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              {renderIcon('settings')}
            </ListItemIcon>
            <ListItemText primary="Настройки" />
          </MenuItem>
          <MenuItem
            onClick={handleLinkClick}
            component={NavLink}
            to={PREMIUM_PAGE}
          >
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
          <MenuItem onClick={handleLogoutClick}>
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
