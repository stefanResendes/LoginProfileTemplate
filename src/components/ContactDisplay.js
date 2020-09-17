import React, { memo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { theme } from '../core/theme';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const ContactDisplay = ({ data }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <Collapse style={{ marginBottom: 10 }}>
        <CollapseHeader>
          <View>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 0,
                fontWeight: 'bold',
              }}
            >
              {/* <FontAwesomeIcon icon={faCheck} /> */}
              <FontAwesomeIcon icon={faTimes} />
              {' '}
              {item.firstName}
              {' '}
              {item.lastName}
            </Text>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <Text>{item.email}</Text>
          <Text>
            ({item.cellPhone.charAt(0)}
            {item.cellPhone.charAt(1)}
            {item.cellPhone.charAt(2)}) {item.cellPhone.charAt(3)}
            {item.cellPhone.charAt(4)}
            {item.cellPhone.charAt(5)}-{item.cellPhone.charAt(6)}
            {item.cellPhone.charAt(7)}
            {item.cellPhone.charAt(8)}
            {item.cellPhone.charAt(9)}
          </Text>
        </CollapseBody>
      </Collapse>
    )}
  />
);

export default memo(ContactDisplay);