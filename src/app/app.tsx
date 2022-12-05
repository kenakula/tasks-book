import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { RouterComponent } from './router';
import { store } from './store';
import { ThemeStoreProvider } from './themes/theme';

const App = (): JSX.Element => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchMe = async () => {
      const result = await fetch('http://localhost:3000/api/users/me', {
        // Make sure to include cookies with fetch
        credentials: 'include',
      }).then(req => req.json());
      setUser(result.data);
    };

    fetchMe();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <ThemeStoreProvider>
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    </ThemeStoreProvider>
  );
};

export default App;
