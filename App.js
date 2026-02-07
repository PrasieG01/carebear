import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { getUserProfile } from './src/utils/storage';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [initialState, setInitialState] = useState({});

  useEffect(() => {
    async function bootstrap() {
      await getUserProfile(); // ensures AsyncStorage is ready
      setLoading(false);
    }
    bootstrap();
  }, []);

  if (loading) {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
