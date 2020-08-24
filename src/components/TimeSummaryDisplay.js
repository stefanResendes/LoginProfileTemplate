import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { theme } from '../core/theme';
import Button from '../components/Button';
import { useNavigation, StackActions } from '@react-navigation/native';

const TimeSummaryDisplay = ({ timeIn, timeOut, children }) => {

    const navigation = useNavigation();

    const _navTest = () => {
        /* navigation.navigate('Dashboard'); */
    }

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Button onPress={_navTest}>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 10,
            color: theme.colors.secondary,
            fontWeight: 'bold',
          }}
        >
          {children}:
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          {} {timeIn} - {timeOut}
        </Text>
      </Button>
    </View>
  );
};

export default memo(TimeSummaryDisplay);
