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

    useEffect(() => {
      socket.connect();
      socket.on('chat_return', msg => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
      });
    }, []);

    const onSend = useCallback((messages = []) => {
      console.log('Doing onSend');
      socket.emit('chat_message', messages);
    }, []);

    

    const { width, height } = Dimensions.get('window');
    const actHeight = height - 200;
    const inverted = true;

    return (
      <Background>
        <View style ={{ width: '100%', height: actHeight }}>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                _id: global.User.email,
                }}
                inverted= {inverted}
            />
        </View>
      </Background>
    );
};

export default memo(ChatScreen);