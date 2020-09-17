import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { StackActions, DrawerActions } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => (
  <Background>
    <Header>Login Template</Header>
    <Button mode="contained" onPress={() => navigation.dispatch(
      StackActions.replace('LoginScreen')
      )}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.dispatch(
        StackActions.replace('RegisterScreen')
        )}
    >
      Sign Up
    </Button>
  </Background>
);

export default memo(HomeScreen);
