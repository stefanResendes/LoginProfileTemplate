import React from 'react';
import { NavigationContainer, StackActions, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

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
const Drawer = createDrawerNavigator();

global.Profile = {homePhone: '', workPhone: '', cellPhone: '', address: '', bio: '', hobbies: []};
global.User = '';
global.Token = '';

const logout = () => {
  const navigation = useNavigation();
  fetch('http://159.89.153.162:5000/api/v1/auth/logout', {
    method: 'GET',
  });
  global.Token = '';
  global.User = '';
  global.Profile = {
    homePhone: '',
    workPhone: '',
    cellPhone: '',
    address: '',
    bio: '',
    hobbies: [],
  };
  StackActions.replace('Home');
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => logout} />
    </DrawerContentScrollView>
  );
}

const MenuButton = () => {
  return (
    <TouchableOpacity onPress={ () => {this.props.navigate('DrawerOpen')} }>
      <Image
        style={{ width: 24, height: 24 }}
        source={require('./assets/menu_icon.png')}
      />
    </TouchableOpacity>
  );
}

const drawerNav = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard',
        }}
      />
      <Drawer.Screen
        name="UpdateUserInformation"
        component={UpdateUserInformation}
        options={{
          title: 'User Information',
        }}
      />
      <Drawer.Screen
        name="CreateUpdateProfile"
        component={CreateUpdateProfile}
        options={{
          title: 'Profile',
        }}
      />
      <Drawer.Screen name="ClockInOut" component={ClockInOut} />
      <Drawer.Screen name="TimeSummary" component={TimeSummary} />
      <Drawer.Screen
        name="ContactsScreen"
        component={ContactsScreen}
        options={{
          title: 'Contacts',
        }}
      />
      <Drawer.Screen
        name="CreateContactScreen"
        component={CreateContactScreen}
        options={{
          title: 'Create Contact',
        }}
      />
    </Drawer.Navigator>
  );
}

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
          name="CreateUpdateProfile"
          component={CreateUpdateProfile}
          options={{
            title: 'Profile',
          }}
        />
        <Stack.Screen name="Dashboard" 
          component={drawerNav}
          options={{
            headerRight: () => <AppMenu /> 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;