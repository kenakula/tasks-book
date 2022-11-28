export const getAvatarLetters = (username: string): string => {
  const str = username
    .split(' ')
    .map((word: string, index: number, array: string[]) => {
      if (array.length === 1) {
        return word[0].toUpperCase() + word[1].toUpperCase();
      }

      return word[0].toUpperCase();
    })
    .join('');

  return str;
};
