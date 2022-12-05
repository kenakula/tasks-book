import { MediaModel } from '../models';

export const getMediaUrl = (media: string | MediaModel | undefined): string => {
  if (!media) {
    return '';
  }

  if (typeof media === 'string') {
    return media;
  }

  return media.url ?? '';
};
