import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserLoginScreen from '../components/UserLoginScreen';
import WatchlistScreen from '../components/WatchlistScreen';
import RecordingScreen from '../components/RecordingScreen';
import RentHistory from '../components/RentHistory';
import MovieDetail from '../components/MovieDetail';
import RentDetails from '../components/RentDetails';
import ContentLanguage from '../components/ContentLanguage';
import AppLanguage from '../components/AppLanguage';
import HomeScreen from '../screens/HomeScreen';
import RecordingDetails from '../components/RecordingDetails';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Stack=createStackNavigator();
const ProfileScreen = () => {
  return (
        <Stack.Navigator
        screenOptions={({ navigation }) => ({
        headerTitle:'',
        headerStyle:{backgroundColor:'black'},
        headerTintColor: '#E8751A', 
        headerLeftContainerStyle: { paddingLeft: 0, marginLeft: 0 },   
        headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 8, padding:0,
         }}>
          <Ionicons name="chevron-back-outline" size={35} color="white" />
        </TouchableOpacity>
      ),
    })}>
        <Stack.Screen name="UserLoginScreen" component={UserLoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="WatchlistScreen" component={WatchlistScreen}/>
        <Stack.Screen name="RecordingScreen" component={RecordingScreen}/>
        <Stack.Screen name="MovieDetail" component={MovieDetail}/>
        <Stack.Screen name="RentHistory" component={RentHistory} />
        <Stack.Screen name="RentDetails" component={RentDetails} 
        options={{
          presentation:"modal",
          animation: "slide_from_bottom",
          headerShown: false,
          gestureEnabled: true,
          contentStyle:{
            backgroundColor: "black"
          },
        }}
        />
        <Stack.Screen name="RecordingDetails" component={RecordingDetails} options={{
          presentation:"transparentModal",
          headerShown: false,
        }}/>
        <Stack.Screen name="ContentLanguage" component={ContentLanguage}/>
        <Stack.Screen name="AppLanguage" component={AppLanguage}/>
        <Stack.Screen name= "HomeScreen" component= {HomeScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
  );
};

export default ProfileScreen;