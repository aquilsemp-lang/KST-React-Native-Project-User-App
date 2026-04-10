import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Upcoming from '../components/Upcoming';
import MovieDetail from '../components/MovieDetail';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../store/themeContext';

const Stack = createStackNavigator();

const UpcomingScreen = () => {

  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitle: '',
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: '#E8751A',
        headerLeftContainerStyle: { paddingLeft: 0, marginLeft: 0 },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 8, padding: 0 }}>
            <Ionicons name="chevron-back-outline" size={35} color={colors.icon} />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen name="Upcoming" component={Upcoming} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
};

export default UpcomingScreen;