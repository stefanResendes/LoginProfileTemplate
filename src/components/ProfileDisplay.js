import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { theme } from '../core/theme';

const ProfileDisplay = ({ title, children, ...props }) => (
  <View style={{ flex: 1, flexDirection: 'row' }}>
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 10,
          color: theme.colors.secondary,
          fontWeight: 'bold',
        }}
      >
        {title}
      </Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 10,
          textAlign: 'left',
        }}
      >
        {children}
      </Text>
    </View>
  </View>
);

export default memo(ProfileDisplay);
