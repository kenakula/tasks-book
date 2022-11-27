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
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { HOME_PAGE } from '../../../router';
import { todoCategories } from '../../../shared/assets';
import { renderIcon } from '../assets';
import { ReactComponent as Logo } from '../../../../assets/images/logo.svg';

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

interface Props {
  authenticated: boolean;
  currentCategory: string;
  handleLogout: () => void;
  handleCategoryClick: (alias: string) => void;
  theme: Theme;
}

export const DrawerElement = ({
  authenticated,
  currentCategory,
  handleLogout,
  handleCategoryClick,
  theme,
}: Props): JSX.Element => {
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
};
