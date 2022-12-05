import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Пользователь', plural: 'Пользователи' },
  auth: {
    tokenExpiration: 1000000, // How many seconds to keep the user logged in
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      label: 'Имя',
      minLength: 1,
    },
    {
      type: 'checkbox',
      name: 'subscribed',
      label: 'Подписка на рассылку',
    },
    {
      type: 'upload',
      name: 'userImage',
      label: 'Аватар',
      relationTo: 'media',
    },
  ],
};

export default Users;
