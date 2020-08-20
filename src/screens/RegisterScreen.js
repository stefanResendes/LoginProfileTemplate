import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { StackActions } from '@react-navigation/native';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [lastname, setLastName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const lastNameError = nameValidator(lastname.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError || lastNameError) {
      setName({ ...name, error: nameError });
      setLastName({...lastname, error: lastNameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    } else {
      var data = {
        firstName: name.value,
        lastName: lastname.value,
        email: email.value,
        password: password.value
      }
      fetch('http://159.89.153.162:5000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      navigation.dispatch(
        StackActions.replace('Login')
        );
    }
  };

  return (
    <Background>
      <Header>Create Account</Header>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Last Name"
        returnKeyType="next"
        value={lastname.value}
        onChangeText={text => setLastName({ value: text, error: '' })}
        error={!!lastname.error}
        errorText={lastname.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.dispatch(
          StackActions.replace('LoginScreen')
          )}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
