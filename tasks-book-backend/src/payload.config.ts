import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Categories from './collections/Categories';
import Media from './collections/Media';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  cors: ['http://localhost:3001'],
  collections: [Users, Categories, Media],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
