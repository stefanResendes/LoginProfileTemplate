import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  UpdateUserInformation,
  CreateUpdateProfile,
  ClockInOut,
  TimeSummary,
  ContactsScreen,
  CreateContactScreen
} from './screens';

import global from './global.js';

const Stack = createStackNavigator();

global.Profile = {homePhone: '', workPhone: '', cellPhone: '', address: '', bio: '', hobbies: []};
global.User = '';
global.Token = '';

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          name="UpdateUserInformation"
          component={UpdateUserInformation}
        />
        <Stack.Screen
          name="CreateUpdateProfile"
          component={CreateUpdateProfile}
        />
        <Stack.Screen name="ClockInOut" component={ClockInOut} />
        <Stack.Screen name="TimeSummary" component={TimeSummary} />
        <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
        <Stack.Screen name="CreateContactScreen" component={CreateContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;