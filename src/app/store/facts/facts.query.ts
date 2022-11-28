import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FactModel } from 'app/shared/types';

export const factsApi = createApi({
  reducerPath: 'factsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.api-ninjas.com/v1',
    prepareHeaders(headers) {
      const token = process.env.REACT_APP_FACTS_API_KEY;
      if (token) {
        headers.set('X-Api-Key', token);
      }
    },
  }),
  endpoints: build => ({
    getFact: build.query<FactModel[], number>({
      query: limit => ({
        url: `/facts?limit=${limit}`,
      }),
    }),
  }),
});

export const { useGetFactQuery } = factsApi;
