import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { ScrollView } from 'react-native';
import global from '../global.js';

const ClockInOut = ({ navigation, route }) => {
  const _ClockIn = () => {
    var inDate = new Date().getDate();
    var inMonth = new Date().getMonth() + 1;
    var inYear = new Date().getFullYear();
    var inHour = new Date().getHours();
    var inMin = new Date().getMinutes();
    var inSec = new Date().getSeconds();

    setClockInDate(inMonth + '/' + inDate + '/' + inYear);
    setClockIn(inHour + ':' + inMin + ':' + inSec);
  };

  const _ClockOut = () => {
    var outDate = new Date().getDate();
    var outMonth = new Date().getMonth() + 1;
    var outYear = new Date().getFullYear();
    var outHour = new Date().getHours();
    var outMin = new Date().getMinutes();
    var outSec = new Date().getSeconds();

    setClockOutDate(outMonth + '/' + outDate + '/' + outYear);
    setClockOut(outHour + ':' + outMin + ':' + outSec);

    var inTime = clockIn.split(':');

    var startDate = new Date(0, 0, 0, inTime[0], inTime[1], inTime[2]);
    var endDate = new Date(0, 0, 0, outHour, outMin, outSec);

    var diff = endDate.getTime() - startDate.getTime();
    var diffHours = Math.floor(diff / 1000 / 60 / 60);
    diff -= diffHours * 1000 * 60 * 60;
    var diffMins = Math.floor(diff / 1000 / 60);

    setTime(diffHours + ':' + diffMins);
  };

  const _EnterTime = () => {
    var data = {
      timetracker_firstname: global.User.firstName,
      timetracker_lastname: global.User.lastName,
      timetracker_emailaddress: global.User.email,
      timetracker_clockindate: clockInDate,
      timetracker_clockintime: clockIn,
      timetracker_clockoutdate: clockOutDate,
      timetracker_clockouttime: clockOut,
    };
    fetch('http://192.168.1.3:3000/timetracker/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const [clockIn, setClockIn] = useState('');
  const [clockOut, setClockOut] = useState('');
  const [clockInDate, setClockInDate] = useState('');
  const [clockOutDate, setClockOutDate] = useState('');

  const [time, setTime] = useState('00:00');

  return (
    <Background>
      <ScrollView>
        <Header>Time Clock</Header>
        <Paragraph>{time}</Paragraph>
        <Button mode="outlined" onPress={_ClockIn}>
          Clock In
        </Button>
        <Button mode="outlined" onPress={_ClockOut}>
          Clock Out
        </Button>
        <Button mode="outlined" onPress={_EnterTime}>
          Submit
        </Button>
      </ScrollView>
    </Background>
  );
};

export default memo(ClockInOut);
