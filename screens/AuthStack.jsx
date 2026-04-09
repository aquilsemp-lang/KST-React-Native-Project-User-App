import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../components/Profile';
import SignIn from '../components/SignIn';
import CreateAccount from '../components/CreateAccount';
import VerifyOTP from '../components/VerifyOTP';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Stack=createStackNavigator();
const AuthStack = () => {
  return (
        <Stack.Navigator
        screenOptions={({ navigation }) => ({
        headerTitle:'',
        contentStyle: { backgroundColor: '#000' },
        headerStyle:{backgroundColor:'#000'},
        headerTintColor: '#E8751A', 
        headerLeftContainerStyle: { paddingLeft: 0, marginLeft: 0 },  
        headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 8, padding:0,
         }}>
          <Ionicons name="chevron-back-outline" size={35} color="white" />
        </TouchableOpacity>
      ),
    })}>
          <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
          <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
          <Stack.Screen name="CreateAccount" component={CreateAccount} options={{headerShown: false}}/>
          <Stack.Screen name="VerifyOTP" component={VerifyOTP} options={{headerShown: false}}/>
        </Stack.Navigator>
  );
};

export default AuthStack;