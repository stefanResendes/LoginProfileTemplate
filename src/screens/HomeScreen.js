import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { StackActions } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Login Template</Header>

    <Paragraph>
      The easiest way to start with your amazing application.
    </Paragraph>
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
