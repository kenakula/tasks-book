import React from 'react';
import { ReactComponent as HomeIcon } from '../../../../assets/images/icon-home.svg';
import { ReactComponent as UsersIcon } from '../../../../assets/images/icon-users.svg';
import { ReactComponent as WorkIcon } from '../../../../assets/images/icon-work.svg';
import { ReactComponent as SportIcon } from '../../../../assets/images/icon-sport.svg';
import { ReactComponent as AddIcon } from '../../../../assets/images/icon-add.svg';
import { ReactComponent as TrendingIcon } from '../../../../assets/images/icon-trending.svg';
import { ReactComponent as StatsIcon } from '../../../../assets/images/icon-stats.svg';
import { ReactComponent as LogoutIcon } from '../../../../assets/images/icon-logout.svg';
import { ReactComponent as MoonIcon } from '../../../../assets/images/icon-moon.svg';
import { ReactComponent as SettingsIcon } from '../../../../assets/images/icon-settings.svg';
import { ReactComponent as StarIcon } from '../../../../assets/images/icon-star.svg';
import { ReactComponent as UserIcon } from '../../../../assets/images/icon-user.svg';

export const renderIcon = (alias: string): JSX.Element => {
  switch (alias) {
    case 'dom':
      return <HomeIcon />;
    case 'semya':
      return <UsersIcon />;
    case 'rabota':
      return <WorkIcon />;
    case 'add':
      return <AddIcon />;
    case 'trending':
      return <TrendingIcon />;
    case 'stats':
      return <StatsIcon />;
    case 'logout':
      return <LogoutIcon />;
    case 'moon':
      return <MoonIcon />;
    case 'star':
      return <StarIcon />;
    case 'settings':
      return <SettingsIcon />;
    case 'user':
      return <UserIcon />;
    default:
      return <SportIcon />;
  }
};
