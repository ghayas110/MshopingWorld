/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import { configureStore } from './redux/ConfigureStore'
import { PersistGate } from 'redux-persist/integration/react';
import Main from './component/Main';
import Amplify, { Auth } from 'aws-amplify'
import config from './aws-exports'

Amplify.configure(config)

const { persistor, store } = configureStore()

const App = () => {

  return (
    <>
      <Provider store={store} >
        <PersistGate
          persistor={persistor}
        >
          <Main />
        </PersistGate>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
