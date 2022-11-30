import React from 'react';
import {
  Box,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Link,
  styled,
  Theme,
  Skeleton,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { HOME_PAGE, COMPARE_PAGE, STATS_PAGE } from 'app/router';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { renderIcon } from '../assets';
import { useAppSelector } from 'app/hooks';
import { setCurrentCategory, useAppDispatch } from 'app/store';

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
    transform: 'translateY(-50%)',
    background: theme.palette.primary.main,
  },
}));

interface Props {
  theme: Theme;
  authenticated: boolean;
  handleLogout: () => void;
  setCategory: (alias: string) => void;
}

export const DrawerElement = ({
  theme,
  setCategory,
  handleLogout,
  authenticated,
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const { categories, currentCategory, categoriesLoading } = useAppSelector(
    state => state.tasks,
  );

  const handleCategoryClick = (alias: string): void => {
    setCategory(alias);
  };

  const handleLogoClick = (): void => {
    if (categories) {
      dispatch(setCurrentCategory(categories[0]));
    }
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
          <Typography
            sx={{ padding: '0 16px', fontSize: 24, fontWeight: 500 }}
            color="primary"
          >
            Категории
          </Typography>
          {!categoriesLoading ? (
            <List sx={{ marginBottom: '60px' }}>
              {categories.map(({ name, alias }) => (
                <CategoryItem
                  active={currentCategory.alias === alias}
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
          ) : (
            <Skeleton height={300} sx={{ mx: 2 }} />
          )}
          <Typography
            sx={{ padding: '0 16px', fontSize: 24, fontWeight: 500 }}
            color="primary"
          >
            Данные
          </Typography>
          <List sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to={STATS_PAGE}
                onClick={() => handleCategoryClick('')}
                sx={{
                  '&.active': {
                    opacity: 0.4,
                    pointerEvent: 'none',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 30 }}>
                  {renderIcon('stats')}
                </ListItemIcon>
                <ListItemText
                  sx={{ color: theme.palette.text.primary }}
                  primary="Статистика"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to={COMPARE_PAGE}
                onClick={() => handleCategoryClick('')}
                sx={{
                  '&.active': {
                    opacity: 0.4,
                    pointerEvent: 'none',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 30 }}>
                  {renderIcon('trending')}
                </ListItemIcon>
                <ListItemText
                  sx={{ color: theme.palette.text.primary }}
                  primary="Сравнить"
                />
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
