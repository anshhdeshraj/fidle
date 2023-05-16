import { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import Register from './screens/RegisterScreen';
import Dashboard from './screens/Dashboard';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import Explore from './screens/Explore';
import AddPost from './screens/AddPost';
import Inbox from './screens/Inbox';
const Stack = createStackNavigator();

export default function App() {
 return(<>
 <NavigationContainer>
      <Stack.Navigator screenOptions={{gestureEnabled: false,  swipeEnabled: false}}>
        <Stack.Screen name="Login"
         options={{
          headerShown: false,  swipeEnabled: false
        }}
       component={LoginScreen} />
      <Stack.Screen name="Register" options={{
        headerShown: false ,  swipeEnabled: false
      }} component={Register} />
      <Stack.Screen name="Dashboard" options={{
        headerShown: false,  swipeEnabled: false
      }} component={Dashboard} />
      <Stack.Screen name="Profile" options={{
        headerShown: false,  swipeEnabled: false
      }} component={Profile} />
      <Stack.Screen name="Settings" options={{
        headerShown: false,  swipeEnabled: false
      }} component={Settings} />
      <Stack.Screen name="Explore" options={{
        headerShown: false,  swipeEnabled: false
      }} component={Explore} />
      <Stack.Screen name="AddPost" options={{
        headerShown: false,  swipeEnabled: false
      }} component={AddPost} />
      <Stack.Screen name="Inbox" options={{
        headerShown: false,  swipeEnabled: false
      }} component={Inbox} />
      </Stack.Navigator>
    </NavigationContainer>
 </>
  );
}




