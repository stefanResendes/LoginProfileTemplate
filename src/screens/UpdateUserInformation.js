import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {
  nameValidator,
  emailValidator,
  passwordValidator,
} from '../core/utils';
import { Image, Text, ScrollView, View } from 'react-native';
import global from '../global.js';

const UpdateUserInformation = ({ navigation, route }) => {
  const [firstname, setFirstName] = useState({
    value: global.User.firstName,
    error: '',
  });
  const [lastname, setLastName] = useState({
    value: global.User.lastName,
    error: '',
  });
  const [middlename, setMiddleName] = useState({
    value: global.User.middleName,
    error: '',
  });
  const [email, setEmail] = useState({ value: global.User.email, error: '' });
  const [updateuserpass, setUpdateUserPass] = useState({
    value: '',
    error: '',
  });
  const [homephone, setHomePhone] = useState({
    value: global.User.homePhone,
    error: '',
  });
  const [workphone, setWorkPhone] = useState({
    value: global.User.workPhone,
    error: '',
  });
  const [cellphone, setCellPhone] = useState({
    value: global.User.cellPhone,
    error: '',
  });
  const [address, setAddress] = useState({
    value: global.User.address,
    error: '',
  });

  const _updateUser = () => {
    const firstNameError = nameValidator(firstname.value);
    const lastNameError = nameValidator(lastname.value);
    const middleNameError = nameValidator(middlename.value);
    const emailError = emailValidator(email.value);
    const updateuserpassError = passwordValidator(updateuserpass.value);
    const homePhoneError = nameValidator(homephone.value);
    const workPhoneError = nameValidator(workphone.value);
    const cellPhoneError = nameValidator(cellphone.value);
    const addressError = nameValidator(address.value);

    if (
      firstNameError ||
      lastNameError ||
      middleNameError ||
      homePhoneError ||
      workPhoneError ||
      cellPhoneError ||
      addressError ||
      emailError ||
      updateuserpassError
    ) {
      setFirstName({ ...firstname, error: firstNameError });
      setMiddleName({ ...middlename, error: middleNameError });
      setLastName({ ...lastname, error: lastNameError });
      setHomePhone({ ...homephone, error: homePhoneError });
      setWorkPhone({ ...workphone, error: workPhoneError });
      setCellPhone({ ...cellphone, error: cellPhoneError });
      setAddress({ ...address, error: addressError });
      setEmail({ ...email, error: emailError });
      setUpdateUserPass({ ...updateuserpass, error: updateuserpassError });
      return;
    } else {
      var data = {
        firstName: firstname.value,
        middleName: middlename.value,
        lastName: lastname.value,
        email: email,
        password: updateuserpass.value,
        homePhone: homephone.value,
        workPhone: workphone.value,
        cellPhone: cellphone.value,
        address: address.value,
      };
      fetch('http://159.89.153.162:5000/api/v1/auth/updatedetails', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(data),
      });
    }
  };

  return (
    <Background>
      <ScrollView>
        <Header>Update User</Header>
        <TextInput
          label="First Name"
          returnKeyType="next"
          value={firstname.value}
          onChangeText={text => setFirstName({ value: text, error: '' })}
          error={!!firstname.error}
          errorText={firstname.error}
        />

        <TextInput
          label="Middle Name"
          returnKeyType="next"
          value={middlename.value}
          onChangeText={text => setMiddleName({ value: text, error: '' })}
          error={!!middlename.error}
          errorText={middlename.error}
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
          value={updateuserpass.value}
          onChangeText={text => setUpdateUserPass({ value: text, error: '' })}
          error={!!updateuserpass.error}
          errorText={updateuserpass.error}
          secureTextEntry
        />

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

        <Button mode="outlined" onPress={_updateUser}>
          Update User
        </Button>
      </ScrollView>
    </Background>
  );
};

export default memo(UpdateUserInformation);
