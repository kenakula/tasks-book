import React from 'react';
import { RouterComponent } from './router/router-component';
import { AuthProvider } from './store';
import { ThemeStoreProvider } from './themes/theme';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <AuthProvider>
        <ThemeStoreProvider>
          <RouterComponent />
        </ThemeStoreProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
