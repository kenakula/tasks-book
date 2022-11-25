import React from 'react';

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [user, setUser] = React.useState<any>(null);

  const signin = (newUser: string, callback: VoidFunction): void => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback: VoidFunction): void => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  const value = React.useMemo(() => ({ user, signin, signout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => React.useContext(AuthContext);
