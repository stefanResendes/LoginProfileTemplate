import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { ScrollView } from 'react-native';
import global from '../global.js';
import {
  emailValidator,
  passwordValidator,
  firstNameValidator,
  lastNameValidator,
  phoneValidator
} from '../core/utils';

const CreateContactScreen = ({ navigation, route }) => {
  const [fName, setfName] = useState({value: '', error: ''});
  const [lName, setlName] = useState({value: '', error: ''});
  const [contactEmail, setContactEmail] = useState({value: '', error: ''});
  const [contactPhone, setContactPhone] = useState({value: '', error: ''});

  const _createContact = async () => {
    const fNameError = firstNameValidator(fName.value);
    const lNameError = lastNameValidator(lName.value);
    const contactEmailError = emailValidator(contactEmail.value);
    const contactPhoneError = phoneValidator(contactPhone.value, 'Contact')

    if (fNameError || lNameError || contactEmailError || contactPhoneError) {
      setfName({ ...fName, error: fNameError });
      setlName({ ...lName, error: lNameError });
      setContactEmail({ ...contactEmail, error: contactEmailError });
      setContactPhone({ ...contactPhone, error: contactPhoneError });
      return;
    } else {
      var data = {
        firstName: fName.value,
        lastName: lName.value,
        email: contactEmail.value,
        cellPhone: contactPhone.value
      };
      fetch('http://159.89.153.162:5000/api/v1/profile/contacts', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + global.Token,
        },
        body: JSON.stringify(data),
      });
    }
  };

  return (
    <Background>
      <ScrollView
        style={{
          width: '100%',
          maxWidth: 500,
        }}
      >
        <TextInput
          label="First Name"
          returnKeyType="next"
          value={fName.value}
          onChangeText={text => setfName({ value: text, error: '' })}
        />

        <TextInput
          label="Last Name"
          returnKeyType="next"
          value={lName.value}
          onChangeText={text => setlName({ value: text, error: '' })}
        />

        <TextInput
          label="Email"
          returnKeyType="next"
          value={contactEmail.value}
          onChangeText={text => setContactEmail({ value: text, error: '' })}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          label="Phone"
          returnKeyType="next"
          value={contactPhone.value}
          onChangeText={text => setContactPhone({ value: text, error: '' })}
        />

        <Button mode="outlined" onPress={_createContact}>
          Create Contact
        </Button>
      </ScrollView>
    </Background>
  );
};

export default memo(CreateContactScreen);
