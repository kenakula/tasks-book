export const loginMock = async (value: string): Promise<string> => {
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
