import { UserModel } from 'app/shared/types';

export const loginMock = async (value: UserModel): Promise<UserModel> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value);
    }, 500);
  });
};

export const logoutMock = async (): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

export const saveUserDataMock = async (data: UserModel): Promise<UserModel> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};
