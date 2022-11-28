import React from 'react';
import { useAppSelector } from '../../hooks';
import { CustomPaper, PageColumn, PageWrapper, UserInfo } from './components';

export const ProfilePage = (): JSX.Element => {
  const { user, loading } = useAppSelector(state => state.auth);

  return (
    <PageWrapper sx={{ paddingTop: '40px' }}>
      <PageColumn spacing={4}>
        <CustomPaper>
          {user && <UserInfo user={user} loading={loading} />}
        </CustomPaper>
      </PageColumn>
    </PageWrapper>
  );
};
