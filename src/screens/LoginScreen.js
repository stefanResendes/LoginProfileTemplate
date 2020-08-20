import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import global from '../global.js';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  global.Profile = {homePhone: '', workPhone: '', cellPhone: '', address: '', bio: '', hobbies: []};
  global.User = '';
  global.Token = '';

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    } else {
      var token = '';
      var data = {
        email: email.value,
        password: password.value
      }
      fetch('http://159.89.153.162:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((response) => response.json())
      .then((json) => {
        if (json.success !== undefined && json.success === false) {
          if (json.error === "Invalid credentials - username.") {
            setEmail({ value: email.value , error: 'Invalid Email' });
          } else if (json.error === "Invalid credentials - password.") {
            setPassword({ value: password.value, error: 'Invalid Password' });
          }
        } else {
          global.Token = json.token;
        }
      }).then(() => {
        return _getUser(global.Token);
      }).then((res) => res.json())
      .then((json) =>  {
        global.User = json.data;
      }).then(() => {
        return _getProfile(global.Token);
      }).then((res) => res.json())
      .then((json) => {
        if (json.success !== undefined && json.success === false) {
          global.Profile = {homePhone: '', workPhone: '', cellPhone: '', address: '', bio: '', hobbies: []};
        } else {
          global.Profile = json;
        }
      }).then(() => {
        console.log(global.Token);
        console.log(global.User);
        console.log(global.Profile);
        console.log(global.Profile.homePhone);

        if (global.Profile.homePhone === '') {
          navigation.navigate('CreateUpdateProfile', { action: 'Create' });
        } else {
          navigation.navigate('Dashboard');
        }
      });
    }
  };

  const _getUser = (tok) => {
    return fetch('http://159.89.153.162:5000/api/v1/auth/me', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tok
      }
    });
  }

  const _getProfile = (tok) => {
    return fetch('http://159.89.153.162:5000/api/v1/profile/me', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tok
      }
    });
  }

  return (
    <Background>
      <Logo />

      <Header>Welcome Back.</Header>

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

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
