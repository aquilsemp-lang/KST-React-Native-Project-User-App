import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; 
import Home from '../components/Home';
import HomeMovies from '../components/HomeMovies';
import SearchScreen from '../components/SearchScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack=createStackNavigator();

const HomeScreen = () => {
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
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="HomeMovies" component={HomeMovies} />
          <Stack.Screen name= "SearchScreen" component={SearchScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
  );
};

export default HomeScreen;