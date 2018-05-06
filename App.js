/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import { Container, Header, Body, Title, Content, List, ListItem } from 'native-base';
import { StackNavigator, } from 'react-navigation';
import Modal from './src/components/modal';
import DataItem from './src/components/list_item';
import HomePage from './Home';
import SearchPage from './SearchPage';

type Props = {};

const App = StackNavigator({
  Search: { screen: SearchPage },
  Home: { screen: HomePage },
});

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
