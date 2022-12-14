import React from 'react';
import { useAppSelector } from 'app/hooks';
import {
  DateTimeComponent,
  Facts,
  Observation,
  PageColumn,
  PageWrapper,
  PremiumLink,
  UserInfo,
} from './components';
import { CustomPaper } from 'app/shared/assets';

export const ProfilePage = (): JSX.Element => {
  const { user, loading } = useAppSelector(state => state.auth);

  return (
    <PageWrapper sx={{ paddingTop: '40px' }}>
      <PageColumn spacing={4}>
        <CustomPaper>
          {user && <UserInfo user={user} loading={loading} />}
        </CustomPaper>
      </PageColumn>
      <PageColumn spacing={4}>
        <PremiumLink />
        <DateTimeComponent />
        <Observation />
        <Facts />
      </PageColumn>
    </PageWrapper>
  );
};
