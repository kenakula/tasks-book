import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { HOME_PAGE, PROFILE_PAGE } from '../../router';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import { useAppSelector } from '../../hooks';
import { useCustomTheme } from '../../themes/theme';
import { DRAWER_WIDTH } from '../../shared/assets/layout-variables';
import MenuIcon from '@mui/icons-material/Menu';
import { todoCategories } from '../../shared/assets/todo-categories';
import { logOut } from '../../store/auth/auth-slice';
import { useAppDispatch } from '../../store';
import { renderIcon } from './assets';

const LogoComponent = (): JSX.Element => (
  <Link
    to={HOME_PAGE}
    component={NavLink}
    sx={{
      display: 'flex',
      alignItems: 'center',
      maxWidth: '130px',
      textDecoration: 'none',
      fontSize: 18,
      lineHeight: '23px',
      fontWeight: 600,
      svg: {
        flexShrink: 0,
        marginRight: '10px',
      },
    }}
  >
    <Logo />
    Tasks Book
  </Link>
);

const CategoryItem = styled(ListItem, {
  shouldForwardProp: prop => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  position: 'relative',
  '&::before': {
    content: "''",
    position: 'absolute',
    right: 0,
    top: '50%',
    display: active ? 'block' : 'none',
    width: 30,
    height: 18,
    borderRadius: '10px 0 0 10px',
    background: theme?.palette.primary.main,
    transform: 'translateY(-50%)',
  },
}));

export const Header = (): JSX.Element => {
  const { authenticated } = useAppSelector(state => state.auth);
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
      navigate('/');
    });
  };

  const drawer = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingBottom: '20px',
      }}
    >
      <Toolbar
        sx={{
          padding: '20px',
          marginBottom: '40px',
        }}
      >
        <LogoComponent />
      </Toolbar>
      {authenticated ? (
        <>
          <Typography
            sx={{ padding: '0 16px', fontSize: 24, fontWeight: 500 }}
            color="primary"
          >
            Категории
          </Typography>
          <List sx={{ marginBottom: '60px' }}>
            {todoCategories.map(({ name, alias }) => (
              <CategoryItem
                active={currentCategory === alias}
                key={alias}
                disablePadding
              >
                <ListItemButton onClick={() => handleCategoryClick(alias)}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    {renderIcon(alias)}
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </CategoryItem>
            ))}
            <ListItem disablePadding color="primary">
              <ListItemButton sx={{ color: theme?.palette.primary.main }}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  {renderIcon('add')}
                </ListItemIcon>
                <ListItemText primary="Добавить" />
              </ListItemButton>
            </ListItem>
          </List>
          <Typography
            sx={{ padding: '0 16px', fontSize: 24, fontWeight: 500 }}
            color="primary"
          >
            Данные
          </Typography>
          <List sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  {renderIcon('stats')}
                </ListItemIcon>
                <ListItemText primary="Статистика" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  {renderIcon('trending')}
                </ListItemIcon>
                <ListItemText primary="Сравнить" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ marginTop: 'auto' }}>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  {renderIcon('logout')}
                </ListItemIcon>
                <ListItemText primary="Выйти" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      ) : null}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          background: theme?.palette.background.default,
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ padding: '20px' }}>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {authenticated && (
            <List sx={{ display: 'flex', flexShrink: 0, marginLeft: 'auto' }}>
              <ListItem>
                <NavLink to={HOME_PAGE}>home</NavLink>
              </ListItem>
              <ListItem>
                <NavLink to={PROFILE_PAGE}>profile</NavLink>
              </ListItem>
            </List>
          )}
        </Toolbar>
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
                boxShadow: authenticated
                  ? '0 10px 25px rgba(29, 52, 54, 0.2)'
                  : 'none',
              },
            }}
            open
          >
            {drawer}
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
            {drawer}
          </Drawer>
        )}
      </Box>
    </Box>
  );
};
