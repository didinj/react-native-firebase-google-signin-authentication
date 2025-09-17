import React, { createContext, useState, useEffect, ReactNode } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  UserInfo,
  signInWithGoogle,
  signOutFromGoogle,
} from '../services/auth';

interface AuthContextType {
  user: UserInfo | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(
      (firebaseUser: FirebaseAuthTypes.User | null) => {
        if (firebaseUser) {
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            photo: firebaseUser.photoURL,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const login = async () => {
    const signedInUser = await signInWithGoogle();
    if (signedInUser) {
      setUser(signedInUser);
    }
  };

  const logout = async () => {
    await signOutFromGoogle();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
