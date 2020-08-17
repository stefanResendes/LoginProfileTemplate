import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';

const Dashboard = ({ navigation, route }) => {

  const { token } = route.params;
  const [profile, setProfile] = useState([]);

  const _logout = () => {
    fetch('http://159.89.153.162:5000/api/v1/auth/logout', {
      method: 'GET'
    });
    navigation.navigate('Home');
  }

  const _getProfile = () => {
    fetch('http://159.89.153.162:5000/api/v1/profile/me', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
    .then((json) => {
      console.log(json);
      setProfile(json);
    });
  }

  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favourite code editor and start
        editing this project.
      </Paragraph>
      <Button mode="outlined" onPress={_logout}>
        Logout
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('UpdateUserInformation', { token: token })}>
        Update User
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('CreateUpdateProfile', { token: token, profile: profile })}>
        Create/Update Profile
      </Button>
      <Button mode="outlined" onPress={_getProfile}>
        Get Profile
      </Button>
    </Background>
  );
}

export default memo(Dashboard);
