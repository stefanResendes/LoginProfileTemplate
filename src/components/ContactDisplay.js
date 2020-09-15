import React, { memo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { theme } from '../core/theme';

const ContactDisplay = ({ data }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <View style={{ borderColor: 'black', borderWidth: 0, marginBottom: 10 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 0,
                fontWeight: 'bold'
              }}
            >
              {item.firstName} {item.lastName}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 0,
              }}
            >
              {item.email}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 0,
              }}
            >
              ({item.cellPhone.charAt(0)}
              {item.cellPhone.charAt(1)}
              {item.cellPhone.charAt(2)}) {item.cellPhone.charAt(3)}
              {item.cellPhone.charAt(4)}
              {item.cellPhone.charAt(5)}-{item.cellPhone.charAt(6)}
              {item.cellPhone.charAt(7)}
              {item.cellPhone.charAt(8)}
              {item.cellPhone.charAt(9)}
            </Text>
          </View>
        </View>
      </View>
    )}
  />
);

export default memo(ContactDisplay);