import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (date: Date, pattern: string): string => {
  return format(date, pattern, { locale: ru });
};
