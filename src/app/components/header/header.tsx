import React, { useEffect, useState } from 'react';
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
import { HOME_PAGE } from 'app/router';
import { useAppSelector } from 'app/hooks';
import { useCustomTheme } from 'app/themes/theme';
import { DRAWER_WIDTH } from 'app/shared/assets/layout-variables';
import MenuIcon from '@mui/icons-material/Menu';
import {
  fetchTaskCategories,
  logOut,
  setCurrentCategory,
  useAppDispatch,
} from 'app/store';
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg';
import { ButtonComponent } from '../button-component/button-component';
import { DrawerElement, MenuElement } from './components';
import { defaultTaskCategory } from 'app/shared/assets';

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  position: 'relative',
  padding: '14px 20px',
  [theme.breakpoints.up('md')]: {
    paddingLeft: `${DRAWER_WIDTH + 20}px`,
  },
  [theme.breakpoints.up('xl')]: {
    paddingRight: '70px',
    paddingLeft: `${DRAWER_WIDTH + 70}px`,
  },
}));

export const Header = (): JSX.Element => {
  const { authenticated, user } = useAppSelector(state => state.auth);
  const { categories } = useAppSelector(state => state.tasks);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useCustomTheme();
  const matches = useMediaQuery(theme!.breakpoints.up('md'));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchTaskCategories());
    }
  }, [authenticated, dispatch]);

  const setCategory = (alias: string): void => {
    const category = categories.filter(cat => cat.alias === alias)[0];

    if (category) {
      dispatch(setCurrentCategory(category));
    } else {
      dispatch(setCurrentCategory(defaultTaskCategory));
    }
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
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {authenticated && user && (
            <>
              <ButtonComponent startIcon={<PlusIcon />} type="button">
                Новая задача
              </ButtonComponent>
              <MenuElement
                handleLogout={handleLogout}
                theme={theme!}
                username={user.name}
                isMobile={!matches}
                avatar={user.userImage}
                setCategory={setCategory}
              />
            </>
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
              handleLogout={handleLogout}
              setCategory={setCategory}
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
              handleLogout={handleLogout}
              setCategory={setCategory}
            />
          </Drawer>
        )}
      </Box>
    </Box>
  );
};
