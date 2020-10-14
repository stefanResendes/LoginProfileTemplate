import React, { memo, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button, Menu, Divider, Provider, List } from 'react-native-paper';
import { theme } from '../core/theme';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faTimes, faAngleDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const ContactDisplay = ({ data }) => {

  const navigation = useNavigation();

  const _sendDM = item => {
    navigation.navigate('ChatScreen', {target: item});
  };

  const _combineName = item => {
    return (
      <Text>
        {item.firstName} {item.lastName} {_userExists(item)}
      </Text>
    );
  };

  const _userExists = item => {
    if (item.userExists) {
      return <FontAwesomeIcon icon={faCheck} />;
    } else {
      return <FontAwesomeIcon icon={faTimes} />;
    }
  };

  const _makePhoneNumber = item => {
    return (
      '(' +
      item.cellPhone.charAt(0) +
      item.cellPhone.charAt(1) +
      item.cellPhone.charAt(2) +
      ')' +
      item.cellPhone.charAt(3) +
      item.cellPhone.charAt(4) +
      item.cellPhone.charAt(5) +
      '-' +
      item.cellPhone.charAt(6) +
      item.cellPhone.charAt(7) +
      item.cellPhone.charAt(8) +
      item.cellPhone.charAt(9)
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 2 }}>
            <List.Accordion
              title={_combineName(item)}
              style={{ backgroundColor: '#E1E1E1' }}
            >
              <List.Item
                title={item.email}
                description={_makePhoneNumber(item)}
              />
            </List.Accordion>
          </View>
          <View style={{ flex: 1 }}>
            <Button mode="outlined" onPress={() => _sendDM(item) }>
              Send Message
            </Button>
          </View>
        </View>
      )}
    />
  );
};

export default memo(ContactDisplay);