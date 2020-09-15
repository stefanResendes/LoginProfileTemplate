import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import { ScrollView, View } from 'react-native';
import TimeSummaryDisplay from '../components/TimeSummaryDisplay.js';
import global from '../global.js';

const TimeSummary = ({ navigation, route }) => {
  const _refreshList = () => {
    fetch('http://192.168.1.3:3000/timetracker', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setData(json);
      });
  };

  const [data, setData] = useState([]);

  return (
    <Background>
      <ScrollView
        style={{
          width: '100%',
          maxWidth: 500,
        }}
      >
        <Header>Time Summary</Header>
        <Button mode="outlined" onPress={_refreshList}>
          Refresh
        </Button>
        {data.map((item, index) => (
          <TimeSummaryDisplay
            fname={item.timetracker_firstname}
            lname={item.timetracker_lastname}
            email={item.timetracker_emailaddress}
            dateIn={item.timetracker_clockindate}
            timeIn={item.timetracker_clockintime}
            dateOut={item.timetracker_clockoutdate}
            timeOut={item.timetracker_clockouttime}
          >
            {item.timetracker_clockindate}
          </TimeSummaryDisplay>
        ))}
      </ScrollView>
    </Background>
  );
};

export default memo(TimeSummary);