import React from 'react';
import { Provider } from 'react-redux';
import { RouterComponent } from './router/router-component';
import { store } from './store';
import { ThemeStoreProvider } from './themes/theme';

const App = (): JSX.Element => {
  return (
    <ThemeStoreProvider>
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    </ThemeStoreProvider>
  );
};

export default App;
