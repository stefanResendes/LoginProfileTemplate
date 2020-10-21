import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import TextArea from '../components/TextArea.js';
import { StackActions } from '@react-navigation/native';
import {
  nameValidator,
  emailValidator,
  passwordValidator,
  phoneValidator,
  addressValidator,
  bioValidator,
  hobbiesValidator
} from '../core/utils';
import { ScrollView } from 'react-native';
import global from '../global.js';

const CreateUpdateProfile = ({ navigation, route }) => {
  /* const { action } = route.params; */

  const profile = global.Profile;

  const [homephone, setHomePhone] = useState({
    value: profile.homePhone,
    error: '',
  });
  const [workphone, setWorkPhone] = useState({
    value: profile.workPhone,
    error: '',
  });
  const [cellphone, setCellPhone] = useState({
    value: profile.cellPhone,
    error: '',
  });
  const [address, setAddress] = useState({ value: profile.address, error: '' });
  const [bio, setBio] = useState({ value: profile.bio, error: '' });
  const [hobbies, setHobbies] = useState({
    value: profile.hobbies.join(', '),
    error: '',
  });

  const _createProfile = () => {
    const homePhoneError = phoneValidator(homephone.value, 'Home');
    const workPhoneError = phoneValidator(workphone.value, 'Work');
    const cellPhoneError = phoneValidator(cellphone.value, 'Cell');
    const addressError = addressValidator(address.value);
    const bioError = bioValidator(bio.value);
    const hobbiesError = hobbiesValidator(hobbies.value);

    if (
      homePhoneError ||
      workPhoneError ||
      cellPhoneError ||
      addressError ||
      bioError ||
      hobbiesError
    ) {
      setHomePhone({ ...homephone, error: homePhoneError });
      setWorkPhone({ ...workphone, error: workPhoneError });
      setCellPhone({ ...cellphone, error: cellPhoneError });
      setAddress({ ...address, error: addressError });
      setBio({ ...bio, error: bioError });
      setHobbies({ ...hobbies, error: hobbiesError });
      return;
    } else {
      var hobbiesArray = hobbies.value.split(', ');

      var data = {
        cellPhone: cellphone.value,
        homePhone: homephone.value,
        workPhone: workphone.value,
        address: address.value,
        bio: bio.value,
        hobbies: hobbiesArray,
      };
      
      fetch('http://159.89.153.162:5000/api/v1/profile', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + global.Token,
        },
        body: JSON.stringify(data),
      });
    }

    _updateGlobalProfile();
  };

  const _updateGlobalProfile = () => {
    var hobbiesArray = hobbies.value.split(', ');

    global.Profile.cellPhone = cellphone.value;
    global.Profile.homePhone = homephone.value;
    global.Profile.workPhone = workphone.value;
    global.Profile.address = address.value;
    global.Profile.bio = bio.value;
    global.Profile.hobbies = hobbiesArray;

    /* navigation.navigate('Dashboard'); */
    navigation.dispatch(StackActions.replace('Dashboard'));
  };

  return (
    <Background>
      <ScrollView
        style={{
          width: '100%',
          maxWidth: 500,
        }}
      >
        <Header>Profile</Header>
        <TextInput
          label="Home Phone"
          returnKeyType="next"
          value={homephone.value}
          onChangeText={text => setHomePhone({ value: text, error: '' })}
          error={!!homephone.error}
          errorText={homephone.error}
        />

        <TextInput
          label="Work Phone"
          returnKeyType="next"
          value={workphone.value}
          onChangeText={text => setWorkPhone({ value: text, error: '' })}
          error={!!workphone.error}
          errorText={workphone.error}
        />

        <TextInput
          label="Cell Phone"
          returnKeyType="next"
          value={cellphone.value}
          onChangeText={text => setCellPhone({ value: text, error: '' })}
          error={!!cellphone.error}
          errorText={cellphone.error}
        />

        <TextInput
          label="Address"
          returnKeyType="next"
          value={address.value}
          onChangeText={text => setAddress({ value: text, error: '' })}
          error={!!address.error}
          errorText={address.error}
        />

        <TextArea
          label="Bio"
          returnKeyType="next"
          value={bio.value}
          onChangeText={text => setBio({ value: text, error: '' })}
          error={!!bio.error}
          errorText={bio.error}
        />

        <TextArea
          label="Hobbies"
          returnKeyType="next"
          value={hobbies.value}
          onChangeText={text => setHobbies({ value: text, error: '' })}
          error={!!hobbies.error}
          errorText={hobbies.error}
        />

        <Button mode="outlined" onPress={_createProfile}>
          Submit Profile
        </Button>
      </ScrollView>
    </Background>
  );
};

export default memo(CreateUpdateProfile);
