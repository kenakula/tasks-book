import { ITaskCategory, UserModel } from 'app/shared/types';

const categories: ITaskCategory[] = [
  { name: 'Дом', alias: 'dom' },
  { name: 'Семья', alias: 'semya' },
  { name: 'Работа', alias: 'rabota' },
  { name: 'Спорт ', alias: 'sport' },
];

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

export const fetchCategories = async (): Promise<ITaskCategory[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(categories);
    }, 500);
  });
};

export const saveTaskCategory = async (
  category: ITaskCategory,
): Promise<ITaskCategory> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(category);
    }, 500);
  });
};
