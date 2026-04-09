import { View, Text } from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import RemoteScreen from '../screens/RemoteScreen';
import UpcomingScreen from '../screens/UpcomingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { enableScreens } from 'react-native-screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

enableScreens();

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName, focused, color, size )=>{
  let iconName;

  if(routeName==='Home'){
    iconName='home-outline';
  }
  else if(routeName==='Remote'){
    iconName='tv-outline';
  }
  else if(routeName==='Upcoming'){
    iconName='calendar-clear-outline';
  }
  else if(routeName==='Profile'){
    iconName='person-outline';
  }

  return <Ionicons name={iconName} size={size} color={color}/>;
};

const hiddenTabScreens = [
  'HomeMovies',
  'MovieDetail',
  'WatchlistScreen',
  'RecordingScreen',
  'RentHistory',
  'RentDetails',
  'MovieDetail',
  'SignIn',
  'CreateAccount',
  'VerifyOTP',
  'ContentLanguage',
  'AppLanguage',
  'HomeScreen',
  'RecordingDetails',
];

const getTabBarStyle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (hiddenTabScreens.includes(routeName)) {
    return { display: 'none' };
  }

  return { backgroundColor: '#1a1a1a', paddingBottom: 2, height: 60 };
};

const TabNavigator = () => {

  const { t } = useTranslation();

  return (
      <Tab.Navigator
      screenOptions={({route})=>({
        tabBarIcon:({focused, color, size}) =>
          getTabBarIcon(route.name, focused, color, size),

        tabBarActiveTintColor: '#E8751A',
        tabBarInactiveTintColor: 'white',
        tabBarStyle:getTabBarStyle(route),
        tabBarLabelStyle :{ fontSize: 10},
      })}
>

        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown:false,
            tabBarLabel: t('home')
          }}
        />

        <Tab.Screen
          name="Remote"
          component={RemoteScreen}
          options={{
            headerShown:false,
            tabBarLabel: t('remote')
          }}
        />

        <Tab.Screen
          name="Upcoming"
          component={UpcomingScreen}
          options={{
            headerShown:false,
            tabBarLabel: t('upcoming')
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown:false,
            tabBarLabel: t('profile')
          }}
        />

      </Tab.Navigator>
  );
};

export default TabNavigator;