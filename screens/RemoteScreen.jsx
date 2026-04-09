import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; 
import Remote from '../components/Remote';
import Remote1 from '../components/Remote1';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack=createStackNavigator();

const RemoteScreen = () => {
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
          <Ionicons name="chevron-back-outline" size={35} color="#E8751A" />
        </TouchableOpacity>
      ),
    })}>
          <Stack.Screen name="Remote" component={Remote} options={{headerShown: false}} />
          <Stack.Screen name="Remote1" component={Remote1} options={{headerShown: false}} />
        </Stack.Navigator>
  );
};

export default RemoteScreen;