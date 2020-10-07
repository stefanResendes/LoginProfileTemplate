import React, { memo, useState, useEffect, useCallback } from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import { Text, ScrollView, View, Dimensions } from 'react-native';
import global from '../global.js';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';

const ChatScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const socket = io('http://174.138.41.52:9090');
    /* const socket = io('http://192.168.1.3:9090'); */

    useEffect(() => {
      socket.connect();
      socket.emit('username', global.User.email);
      socket.on('chat_return', msg => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
      });
      socket.on('is_online', ret => {
        console.log(ret);
      })
    }, []);

    const onSend = useCallback((messages = []) => {
      socket.emit('chat_message', messages);
    }, []);

    const _changeRoom = useCallback(() => {
      socket.emit('switchRoom', 'room1');
    }, []);

    const { width, height } = Dimensions.get('window');
    const actHeight = height - 200;
    const inverted = true;

    return (
      <Background>
        <View style={{ width: '100%', height: actHeight }}>
          <Button mode="outlined" onPress={_changeRoom}>
            Change to Group
          </Button>
          
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