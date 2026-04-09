import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; 
import Upcoming from '../components/Upcoming';
// import Upcoming1 from '../components/Upcoming1';
// import Upcoming2 from '../components/Upcoming2';
import MovieDetail from '../components/MovieDetail';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack=createStackNavigator();

const UpcomingScreen = () => {
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
          <Stack.Screen name="Upcoming" component={Upcoming} options={{headerShown: false}}/>
          {/* <Stack.Screen name="Upcoming1" component={Upcoming1}/>
          <Stack.Screen name="Upcoming2" component={Upcoming2}/> */}
          <Stack.Screen name="MovieDetail" component={MovieDetail} />
        </Stack.Navigator>
  );
};

export default UpcomingScreen;