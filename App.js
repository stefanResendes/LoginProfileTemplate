import React from 'react';
import { Provider } from 'react-native-paper';
import AppStack from './src/index.js';
import { theme } from './src/core/theme';

const Main = () => (
  <Provider theme={theme}>
    <AppStack />
  </Provider>
);

export default Main;
