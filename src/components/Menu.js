import React, { memo } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const AppMenu = () => {
    const navigation = useNavigation();

    const _openDrawer = () => {
      navigation.dispatch(DrawerActions.openDrawer());
    }

    return (
      <TouchableOpacity onPress={_openDrawer}>
        <Image
          style={{ width: 24, height: 24 }}
          source={require('../assets/menu_icon.png')}
        />
      </TouchableOpacity>
    );
};

export default memo(AppMenu);