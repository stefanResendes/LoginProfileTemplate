import React, { memo, useState, useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import { Image, Platform, ScrollView } from 'react-native';
import global from '../global.js';
import { StackActions } from '@react-navigation/native';

const Dashboard = ({ navigation, route }) => {

  const [photo, setPhoto] = useState(null);
  const [profileHomePhone, setProfileHomePhone] = useState(global.Profile.homePhone);
  const [profileWorkPhone, setProfileWorkPhone] = useState(global.Profile.workPhone);
  const [profileCellPhone, setProfileCellPhone] = useState(global.Profile.cellPhone);
  const [profileAddress, setProfileAddress] = useState(global.Profile.address);
  const [profileBio, setProfileBio] = useState(global.Profile.bio);
  const [profileHobbies, setProfileHobbies] = useState(global.Profile.hobbies.join(', '));

  const _logout = () => {
    fetch('http://159.89.153.162:5000/api/v1/auth/logout', {
      method: 'GET'
    });
    global.Token = '';
    global.User = '';
    global.Profile = '';
    navigation.dispatch(
      StackActions.replace('Home')
    )
  }

  const _handleChoosePhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setPhoto(result);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const _getPhoto = () => {
    fetch('http://159.89.153.162:5000/api/v1/profile/0001/photo', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + global.Token
      }
    });
  }

  const _uploadPhoto = () => {
    console.log(global.Token);

    var token = global.Token;

    var image = {
      uri: photo.uri,
      type: 'image/jpeg',
      name: 'photo.jpg'
    }

    var data = new FormData();
    data.append('file', image);
    fetch('http://159.89.153.162:5000/api/v1/profile/'+ global.Profile._id +'/photo', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: data
    });
  }

  const _navUpdateUserInfo = () => {
    navigation.navigate('UpdateUserInformation');
  }

  const _navCreateUpdateProfile = () => {
    navigation.navigate('CreateUpdateProfile', { action: 'Update' });
  }

  const _refreshPage = () => {
    setProfileHomePhone(global.Profile.homePhone);
    setProfileWorkPhone(global.Profile.workPhone);
    setProfileCellPhone(global.Profile.cellPhone);
    setProfileAddress(global.Profile.address);
    setProfileBio(global.Profile.bio);
    setProfileHobbies(global.Profile.hobbies.join(', '));
  }

  return (
    <Background>
      <ScrollView>
      {photo && (
        <Image
          source={{ uri: photo.uri }}
          style={{ width: 300, height: 300 }}
        />
      )}
      <Header>{global.User.firstName} {global.User.lastName}</Header>
      <Paragraph>
        Home Phone: {profileHomePhone}
      </Paragraph>
      <Paragraph>
        Work Phone: {profileWorkPhone}
      </Paragraph>
      <Paragraph>
        Cell Phone: {profileCellPhone}
      </Paragraph>
      <Paragraph>
        Address: {profileAddress}
      </Paragraph>
      <Paragraph>
        Bio: {profileBio}
      </Paragraph>
      <Paragraph>
        Hobbies: {profileHobbies}
      </Paragraph>
      <Button mode="outlined" onPress={_refreshPage}>
        Refresh
      </Button>
      <Button mode="outlined" onPress={_logout}>
        Logout
      </Button>
      <Button mode="outlined" onPress={_navUpdateUserInfo}>
        Update User
      </Button>
      <Button mode="outlined" onPress={_navCreateUpdateProfile}>
        Update Profile
      </Button>
      <Button mode="outlined" onPress={_handleChoosePhoto}>
        Choose Photo
      </Button>
      <Button mode="outlined" onPress={_uploadPhoto}>
        Send Photo
      </Button>
      <Button mode="outlined" onPress={_getPhoto}>
        Get Photo
      </Button>
      </ScrollView>
    </Background>
  );
}

export default memo(Dashboard);
