import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "./global.css"
import './src/i18n';
import i18n, { loadLanguage } from './src/i18n';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from './store/authStore';
import AuthStack from './screens/AuthStack';
import TabNavigator from './components/TabNavigator';
import { ThemeProvider } from './store/themeContext';
import Toast from './globalComponents/Toast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [langLoaded, setLangLoaded] = useState(false);

  useEffect(() => {
    const initLanguage = async () => {
      try {
        const savedLang = await loadLanguage();
        await i18n.changeLanguage(savedLang);
      } catch (error) {
        console.error('Failed to load language:', error);
      } finally {
        setLangLoaded(true);
      }
    };

    initLanguage();
  }, []);

  // Don't render app until language is loaded to avoid flicker
  if (!langLoaded) return null;

  return (
    <GestureHandlerRootView>
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          {isAuthenticated ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
        <Toast />
      </ThemeProvider>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;