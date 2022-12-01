import React from 'react';
import {
  alpha,
  Box,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  MenuProps,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { DRAWER_WIDTH } from 'app/shared/assets';

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  '& .MuiAppBar-root': {
    background: theme.palette.background.default,
    boxShadow: 'none',
  },
}));

export const CustomToolbar = styled(Toolbar)(({ theme }) => ({
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

export const CustomNav = styled('nav')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
}));

export const CustomDesktopDrawer = styled(Drawer, {
  shouldForwardProp: prop => prop !== 'authed',
})<{ authed: boolean }>(({ theme, authed }) => ({
  display: 'none',
  '& .MuiDrawer-paper': {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    width: DRAWER_WIDTH,
    border: 'none',
    background: authed ? theme?.palette.background.paper : 'transparent',
    boxShadow: authed ? theme?.shadows[8] : 'none',
  },
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

export const CustomMobileDrawer = styled(Drawer)(({ theme }) => ({
  display: 'block',
  '& .MuiDrawer-paper': {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    width: DRAWER_WIDTH,
    border: 'none',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[8],
  },
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const CustomMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
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
    boxShadow: '0 10px 25px rgba(29, 52, 54, 0.2)',
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
      '&.active': {
        opacity: 0.3,
        pointerEvents: 'none',
      },
    },
  },
}));

export const GreetingsElement = styled(Typography)(({ theme }) => ({
  arginRight: '20px',
  fontSize: 16,
  fontWeight: 500,
  color: theme.palette.text.primary,
  '& span': {
    fontWeight: 700,
  },
}));

export const DropdownButton = styled(IconButton, {
  shouldForwardProp: prop => prop !== 'open',
})<{ open: boolean }>(({ open }) => ({
  transform: open ? 'rotate(180deg)' : 'none',
  transition: 'transform 0.2s ease-in',
}));

export const ColorModeToggler = styled(MenuItem)(({ theme }) => ({
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.warning.main
      : theme.palette.text.primary,
  '& .MuiListItemIcon-root': {
    minWidth: 30,
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.warning.main
        : theme.palette.text.primary,
    '& svg': {
      fill: theme.palette.mode === 'dark' ? theme.palette.warning.main : 'none',
    },
  },
}));

export const CategoryItem = styled(ListItem, {
  shouldForwardProp: prop => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  position: 'relative',
  '& .MuiListItemIcon-root': {
    minWidth: 30,
  },
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

export const AddCategoryButton = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  '& .MuiListItemIcon-root': {
    minWidth: 30,
  },
}));

export const DrawerTitle = styled(Typography)({
  padding: '0 16px',
  fontSize: 24,
  fontWeight: 500,
});
