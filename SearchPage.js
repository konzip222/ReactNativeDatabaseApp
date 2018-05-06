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
  TouchableHighlight,
  Button
} from 'react-native';
import { Container, Header, Body, Title, Content, List, ListItem, Label  } from 'native-base';
import ListPopover from 'react-native-list-popover';
const carTypes = [' ', 'car','motorcycle','lorry'];
const fuelTypes = [' ', 'petrol','diesel'];

export default class SearchPage extends Component{
  static navigationOptions = {
    title: 'SearchPage',
  };

constructor(props){
  super(props)

  this.state = {
    typeInput: '',
    yearOfProductionFromInput: '',
    yearOfProductionToInput: '',    
    fuelTypeInput: '',
    isVisibleCarTypes: false,
    isVisibleFuelTypes: false,    
    typooooo: '',
  }
}



  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={{ flex: 1, backgroundColor: '#fff', padding:20 ,    margin: 20}}
              padder={false}>
          <Label>Car type</Label>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.setState({isVisibleCarTypes: true})}>
            <Text>{this.state.typeInput || 'Car type'}</Text>
          </TouchableHighlight>
          <Label>Fuel type</Label>            
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.setState({isVisibleFuelTypes: true})}>
            <Text>{this.state.fuelTypeInput || 'Fuel type'}</Text>
          </TouchableHighlight>               
          <Label>Year of production from</Label>
          <TextInput
            style={{height: 40, borderColor: 'gray', marginBottom: 10, borderWidth: 1}}
            onChangeText={(text) => this.setState({yearOfProductionFromInput: text})}
            value={this.state.yearOfProductionFromInput}/>
          <Label>Year of production to</Label>
          <TextInput
            style={{height: 40, borderColor: 'gray', marginBottom: 10, borderWidth: 1}}
            onChangeText={(text) => this.setState({yearOfProductionToInput: text})}
            value={this.state.yearOfProductionToInput}/>                           
                                 
            <Button
              title="Search"
              onPress={() =>
                navigate('Home',{type: this.state.typeInput, yearOfProductionFrom: this.state.yearOfProductionFromInput, 
                  yearOfProductionTo: this.state.yearOfProductionToInput, fuelType: this.state.fuelTypeInput})
              }
            />
          <ListPopover
            style={{backgroundColor: 'gray'}}
            list={carTypes}
            isVisible={this.state.isVisibleCarTypes}
            onClick={(item) => this.setState({typeInput: item})}
            onClose={() => this.setState({isVisibleCarTypes: false})}/>
          <ListPopover
            style={{backgroundColor: 'gray'}}
            list={fuelTypes}
            isVisible={this.state.isVisibleFuelTypes}
            onClick={(item) => this.setState({fuelTypeInput: item})}
            onClose={() => this.setState({isVisibleFuelTypes: false})}/>                                      
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
//    flex: 1,
 //   alignItems: 'center',
    backgroundColor: '#AAAAAA',
//    justifyContent: 'center',
  },
  button: {
    marginBottom: 10,
    borderRadius: 4,
    padding: 10,
    borderColor: 'gray',
    backgroundColor: '#DDDDDD',
  },
});
