import React, { memo, useState, useEffect } from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import global from '../global.js';
/* import { RNCamera } from 'react-native-camera'; */
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

const CameraScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
      (async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setHasPermission(status === 'granted');
      })();
    }, []);

    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
        return (
            <View style={styles.container}>
                <Camera style={{ flex: 1 }} type={type}>

                </Camera>
            </View>
        );
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
});

export default memo(CameraScreen);