import React, { useContext } from 'react';
import { View, Text, Button, Image, ActivityIndicator } from 'react-native';
import { AuthProvider, AuthContext } from './src/context/AuthContext';

const HomeScreen: React.FC = () => {
  const { user, loading, login, logout } = useContext(AuthContext);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: 'center' }}
      />
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user ? (
        <>
          <Text>Welcome, {user.name}</Text>
          {user.photo && (
            <Image
              source={{ uri: user.photo }}
              style={{ width: 80, height: 80, borderRadius: 40, margin: 10 }}
            />
          )}
          <Text>{user.email}</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <Button title="Sign in with Google" onPress={login} />
      )}
    </View>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HomeScreen />
    </AuthProvider>
  );
};

export default App;
