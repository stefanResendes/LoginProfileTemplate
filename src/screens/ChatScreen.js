import React, { memo, useState, useEffect, useCallback } from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import { Text, ScrollView, View, Dimensions } from 'react-native';
import TextInput from '../components/TextInput';
import global from '../global.js';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';

const ChatScreen = ({ navigation, route }) => {
    const { target } = route.params;

    const [messages, setMessages] = useState([]);
    /* const socket = io('http://174.138.41.52:9090'); */
    const socket = io('http://192.168.1.3:9090');

    useEffect(() => {
      socket.connect();
      socket.emit('username', global.User.email);
      socket.on('chat_return', msg => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
      });
      socket.on('is_online', ret => {
        console.log(ret);
      });
    }, []);

    const onSend = useCallback((messages = []) => {
      socket.emit('chat_message', messages);
    }, []);

    const _changeToGroup = useCallback((target) => {
      socket.emit('switchRoom', target);
    }, []);

    const _changeToGroupOnLoad = useCallback(target => {
      if (target !== 'group') {
        socket.emit('directMessage', target);
      }
    }, []);

    const { width, height } = Dimensions.get('window');
    const actHeight = height - 200;
    const inverted = true;

    return (
      <Background>
        {_changeToGroupOnLoad(target)}
        <View style={{ width: '100%', height: actHeight }}>
          <TextInput
            label="Target"
            returnKeyType="next"
            onChangeText={text => _changeToGroup(text)}
          />
          {/* <Button mode="outlined" onPress={_changeToGroup}>
            Change Room
          </Button> */}
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: global.User.email,
            }}
            inverted={inverted}
          />
        </View>
      </Background>
    );
};

export default memo(ChatScreen);