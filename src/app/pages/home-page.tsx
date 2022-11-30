import React from 'react';
import { useParams } from 'react-router-dom';

export const HomePage = (): JSX.Element => {
  const params = useParams<{ alias: string }>();

  return <h1>HomePage: {params.alias}</h1>;
};
