import React from 'react';
import {
  Box,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Link,
  Skeleton,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { HOME_PAGE, COMPARE_PAGE, STATS_PAGE } from 'app/router';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import {
  AddCategoryButton,
  CategoryItem,
  DrawerTitle,
  renderIcon,
} from '../assets';
import { useAppSelector } from 'app/hooks';
import { setCurrentCategory, useAppDispatch } from 'app/store';
import { defaultTaskCategory } from 'app/shared/assets';

interface Props {
  authenticated: boolean;
  handleLogout: () => void;
  setCategory: (alias: string) => void;
  toggleDrawer: () => void;
}

export const DrawerElement = ({
  setCategory,
  toggleDrawer,
  handleLogout,
  authenticated,
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const { categories, currentCategory, categoriesLoading } = useAppSelector(
    state => state.tasks,
  );

  const handleCategoryClick = (alias: string): void => {
    setCategory(alias);
    toggleDrawer();
  };

  const handleLogoClick = (): void => {
    if (categories) {
      dispatch(setCurrentCategory(categories[0]));
    }
  };

  const handleLinkClick = (): void => {
    dispatch(setCurrentCategory(defaultTaskCategory));
    toggleDrawer();
  };

  return (
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
        <Link
          to={HOME_PAGE}
          component={NavLink}
          onClick={handleLogoClick}
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
      </Toolbar>
      {authenticated ? (
        <>
          <DrawerTitle color="primary">Категории</DrawerTitle>
          {!categoriesLoading && currentCategory ? (
            <List sx={{ marginBottom: '60px' }}>
              {categories.map(({ name, alias }) => (
                <CategoryItem
                  active={currentCategory.alias === alias}
                  key={alias}
                  disablePadding
                >
                  <ListItemButton
                    component={NavLink}
                    to={HOME_PAGE}
                    onClick={() => handleCategoryClick(alias)}
                  >
                    <ListItemIcon>{renderIcon(alias)}</ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </CategoryItem>
              ))}
              <ListItem disablePadding color="primary">
                <AddCategoryButton>
                  <ListItemIcon>{renderIcon('add')}</ListItemIcon>
                  <ListItemText primary="Добавить" />
                </AddCategoryButton>
              </ListItem>
            </List>
          ) : (
            <Skeleton height={300} sx={{ mx: 2 }} />
          )}
          <DrawerTitle color="primary">Данные</DrawerTitle>
          <List sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                onClick={handleLinkClick}
                to={STATS_PAGE}
                sx={{
                  '&.active': {
                    opacity: 0.4,
                    pointerEvent: 'none',
                  },
                  '& .MuiListItemIcon-root': {
                    minWidth: 30,
                  },
                }}
              >
                <ListItemIcon>{renderIcon('stats')}</ListItemIcon>
                <ListItemText primary="Статистика" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to={COMPARE_PAGE}
                onClick={handleLinkClick}
                sx={{
                  '&.active': {
                    opacity: 0.4,
                    pointerEvent: 'none',
                  },
                  '& .MuiListItemIcon-root': {
                    minWidth: 30,
                  },
                }}
              >
                <ListItemIcon>{renderIcon('trending')}</ListItemIcon>
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
};
