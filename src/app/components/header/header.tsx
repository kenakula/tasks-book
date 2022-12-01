import React, { useEffect, useState } from 'react';
import { AppBar, IconButton, useMediaQuery } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { HOME_PAGE } from 'app/router';
import { useAppSelector } from 'app/hooks';
import { useCustomTheme } from 'app/themes/theme';
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
import {
  CustomDesktopDrawer,
  CustomMobileDrawer,
  CustomNav,
  CustomToolbar,
  HeaderContainer,
} from './assets';

export const Header = (): JSX.Element => {
  const { authenticated, user } = useAppSelector(state => state.auth);
  const { categories } = useAppSelector(state => state.tasks);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { theme } = useCustomTheme();
  const matches = useMediaQuery(theme!.breakpoints.up('md'));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchTaskCategories()).then(() => {
        if (categories.length && location.pathname === HOME_PAGE) {
          dispatch(setCurrentCategory(categories[0]));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, dispatch, categories]);

  const setCategory = (alias: string): void => {
    const category = categories.filter(cat => cat.alias === alias)[0];

    if (category) {
      dispatch(setCurrentCategory(category));
    } else {
      dispatch(setCurrentCategory(defaultTaskCategory));
    }
  };

  const handleDrawerToggle = (): void => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleLogout = (): void => {
    dispatch(logOut()).then(() => {
      navigate(HOME_PAGE);
    });
  };

  return (
    <HeaderContainer>
      <AppBar position="fixed">
        <CustomToolbar>
          {authenticated && user && (
            <>
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <ButtonComponent startIcon={<PlusIcon />} type="button">
                Новая задача
              </ButtonComponent>
              <MenuElement
                handleLogout={handleLogout}
                theme={theme!}
                username={user.name}
                isMobile={!matches}
                avatar={user.userImage}
              />
            </>
          )}
        </CustomToolbar>
      </AppBar>
      <CustomNav>
        {matches ? (
          <CustomDesktopDrawer authed={authenticated} variant="permanent" open>
            <DrawerElement
              authenticated={authenticated}
              handleLogout={handleLogout}
              setCategory={setCategory}
              toggleDrawer={handleDrawerToggle}
            />
          </CustomDesktopDrawer>
        ) : (
          <CustomMobileDrawer
            variant="temporary"
            open={mobileDrawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <DrawerElement
              authenticated={authenticated}
              handleLogout={handleLogout}
              setCategory={setCategory}
              toggleDrawer={handleDrawerToggle}
            />
          </CustomMobileDrawer>
        )}
      </CustomNav>
    </HeaderContainer>
  );
};
