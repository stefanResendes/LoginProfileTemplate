import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import AppMenu from './components/Menu.js';

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
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: 'Login',
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            title: 'Register',
          }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{
            title: 'Forgot Password',
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard',
            headerRight: () => <AppMenu />,
          }}
        />
        <Stack.Screen
          name="UpdateUserInformation"
          component={UpdateUserInformation}
          options={{
            title: 'User Information',
          }}
        />
        <Stack.Screen
          name="CreateUpdateProfile"
          component={CreateUpdateProfile}
          options={{
            title: 'Profile',
          }}
        />
        <Stack.Screen name="ClockInOut" component={ClockInOut} />
        <Stack.Screen name="TimeSummary" component={TimeSummary} />
        <Stack.Screen
          name="ContactsScreen"
          component={ContactsScreen}
          options={{
            title: 'Contacts',
          }}
        />
        <Stack.Screen
          name="CreateContactScreen"
          component={CreateContactScreen}
          options={{
            title: 'Create Contact',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;