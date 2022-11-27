import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  styled,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HOME_PAGE } from '../../router';
import { useAppSelector } from '../../hooks';
import { useCustomTheme } from '../../themes/theme';
import { DRAWER_WIDTH } from '../../shared/assets/layout-variables';
import MenuIcon from '@mui/icons-material/Menu';
import { logOut } from '../../store/auth/auth-slice';
import { useAppDispatch } from '../../store';
import { DrawerElement } from './components/drawer-element';
import { MenuElement } from './components/menu-element';
import { renderIcon } from './assets';

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  position: 'relative',
  padding: '20px',
  [theme.breakpoints.up('lg')]: {
    paddingRight: '70px',
  },
}));

export const Header = (): JSX.Element => {
  const { authenticated, username } = useAppSelector(state => state.auth);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { theme } = useCustomTheme();
  const matches = useMediaQuery(theme!.breakpoints.up('sm'));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentCategory, setCurrentCategory] = useState<string>('dom');

  const handleCategoryClick = (alias: string): void => {
    setCurrentCategory(alias);
  };

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = (): void => {
    dispatch(logOut()).then(() => {
      navigate(HOME_PAGE);
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          background: theme?.palette.background.default,
          boxShadow: 'none',
        }}
      >
        <CustomToolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              color:
                theme?.palette.mode === 'light'
                  ? theme?.palette.text.primary
                  : theme?.palette.warning.main,
              '& svg': {
                fill:
                  theme?.palette.mode === 'light'
                    ? 'none'
                    : theme?.palette.warning.main,
              },
            }}
          >
            {renderIcon('moon')}
          </Box>
          {authenticated && (
            <MenuElement
              handleLogout={handleLogout}
              theme={theme!}
              username={username!}
            />
          )}
        </CustomToolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {matches ? (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
                border: 'none',
                background: authenticated
                  ? theme?.palette.background.paper
                  : 'transparent',
                boxShadow: authenticated ? theme?.shadows[8] : 'none',
              },
            }}
            open
          >
            <DrawerElement
              authenticated={authenticated}
              theme={theme!}
              currentCategory={currentCategory}
              handleLogout={handleLogout}
              handleCategoryClick={handleCategoryClick}
            />
          </Drawer>
        ) : (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                background: theme?.palette.background.paper,
                width: DRAWER_WIDTH,
              },
            }}
          >
            <DrawerElement
              authenticated={authenticated}
              theme={theme!}
              currentCategory={currentCategory}
              handleLogout={handleLogout}
              handleCategoryClick={handleCategoryClick}
            />
          </Drawer>
        )}
      </Box>
    </Box>
  );
};
