import { CollectionConfig } from 'payload/types';

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Категория', plural: 'Категории' },
  auth: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      label: 'Название категории',
      minLength: 1,
    },
    {
      type: 'text',
      name: 'slug',
      label: 'Алиас категории',
      minLength: 1,
    },
  ],
};

export default Categories;
