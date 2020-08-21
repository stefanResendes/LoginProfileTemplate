import React, { memo } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { useNavigation, StackActions } from '@react-navigation/native';

const AppMenu = () => {
    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const _logout = () => {
        fetch('http://159.89.153.162:5000/api/v1/auth/logout', {
          method: 'GET'
        });
        global.Token = '';
        global.User = '';
        global.Profile = '';
        navigation.dispatch(
          StackActions.replace('Home')
        )
    }

    const _navUpdateUserInfo = () => {
        closeMenu();
        navigation.navigate('UpdateUserInformation');
    }
    
    const _navCreateUpdateProfile = () => {
        closeMenu();
        navigation.navigate('CreateUpdateProfile', { action: 'Update' });
    }

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<TouchableOpacity onPress={openMenu}><Image style={{ width: 24, height: 24 }} source={require('../assets/menu_icon.png')}/></TouchableOpacity>}>

            {/* <TouchableOpacity onPress={openMenu}><Image style={{ width: 24, height: 24 }} source={require('../assets/menu_icon.png')}/></TouchableOpacity> */}

            <Menu.Item onPress={ _logout } title="Logout" />
            <Divider />    
            <Menu.Item onPress={ _navUpdateUserInfo } title="Update User" />
            <Menu.Item onPress={ _navCreateUpdateProfile } title="Update Profile" />
        </Menu>
    );
};

export default memo(AppMenu);