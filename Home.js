/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

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
import Modal from './src/components/modal';
import DataItem from './src/components/list_item';
import App from './App'

var SQLite = require('react-native-sqlite-storage')
// Warning: with every update to database , property name needs to be changed
var db = SQLite.openDatabase({name: 'tessssst.db', createFromLocation: '~sqlitecars.db'})

var omlet = "omlet";
var zm = 10;

export default class HomePage extends Component{
  static navigationOptions = {
    title: 'Results',
  };

constructor(props){
  super(props)

  // this shit is required
  this._handleItemDataOnPress = this._handleItemDataOnPress.bind(this)
  this._handleModalClose = this._handleModalClose.bind(this)

  this.state = {
    setModalVisible: false,
    type: this.props.navigation.state.params.type,
    yearOfProductionTo: this.props.navigation.state.params.yearOfProductionTo,
    yearOfProductionFrom: this.props.navigation.state.params.yearOfProductionFrom,
    fuelType: this.props.navigation.state.params.fuelType,
    modalArticleData: {},
    data: []     
  }



}

componentDidMount(){
  this._getRecordsFromTable(this.state.type,this.state.fuelType,this.state.yearOfProductionFrom,this.state.yearOfProductionTo);
}

componentWillUnmount(){
}



_test(){
  this.omlet = "andrzej";
}

_getRecordsFromTable(carType,fuelType,yearOfProductionFrom,yearOfProductionTo){
   
  var query = this._createQueryfromInput(carType,fuelType,yearOfProductionFrom,yearOfProductionTo);
  var argumentsArray = [carType,fuelType,yearOfProductionFrom,yearOfProductionTo];
  db.transaction((tx) => {
    tx.executeSql(query, [argumentsArray[0],argumentsArray[1],argumentsArray[2],argumentsArray[3]], (tx, results) => {
            var resultArray = [];
            for(var i = 0; i < results.rows.length; i++){
              resultArray[i] = results.rows.item(i);
            }
            this.setState({data: resultArray});
      });
  });
}

_createQueryfromInput(carType,fuelType,yearOfProductionFrom,yearOfProductionTo){
    // if all are empty return null
    if(carType == "" && fuelType == "" && yearOfProductionFrom == "" && yearOfProductionTo == ""){
      return null;
    }
    var query = "SELECT * FROM cars WHERE ";
    if(carType ==""){
      query += "type!=? and ";
    }
    else{
      query += "type=? and ";    
    }
    if(fuelType ==""){
      query += "fuelType!=? and ";
    }
    else{
      query += "fuelType=? and ";    
    }
    if(yearOfProductionFrom ==""){
      query += "yearOfProduction!=? and ";
    }
    else{
      query += "yearOfProduction>=? and ";    
    }     
    if(yearOfProductionTo ==""){
      query += "yearOfProduction!=?";
    }
    else{
      query += "yearOfProduction<=?";    
    }
    return query;
}

_handleItemDataOnPress(articleData) {
  this.setState({
      setModalVisible: true,
      modalArticleData: articleData
  })
}

_handleModalClose() {
  this.setState({
      setModalVisible: false,
      modalArticleData: {}
  })
}



  render() { 
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1, backgroundColor: '#fff', padding:10 }}
              padder={false}>
            <Button
              title="Go back to Search Page"
              onPress={() =>
                navigate('Search')
              }
            />              
            <List
              dataArray={this.state.data}
              renderRow={(item) => {
                  return (
                      <ListItem>
                          <DataItem onPress={this._handleItemDataOnPress} data={item} />
                      </ListItem>
                  )
            }}/>
            <Modal 
              showModal={this.state.setModalVisible}
              articleData={this.state.modalArticleData}
              onClose={this._handleModalClose}/>            
        </Content>
      </Container>
    );
  }
}

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
