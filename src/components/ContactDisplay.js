import React, { memo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { theme } from '../core/theme';

const ContactDisplay = ({ data }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <View>
        <Divider />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 12,
                marginBottom: 10,
              }}
            >
              {item.firstName}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 12,
                marginBottom: 10,
                textAlign: 'left',
              }}
            >
              {item.lastName}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 12,
                marginBottom: 10,
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
                fontSize: 12,
                marginBottom: 10,
              }}
            >
              {item.cellPhone}
            </Text>
          </View>
        </View>
        <Divider />
      </View>
    )}
  />
);

export default memo(ContactDisplay);