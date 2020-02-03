import React, { Component } from 'react';
import { StyleSheet, Button, Text, View, TouchableWithoutFeedback } from 'react-native';
import HeaderComponent from './HeaderComponent';
import BodyComponent from './BodyComponent';

export default class WeatheryApp extends Component {
  
  state = {
    myState: 'Weatheri'
  }
  updateState = () => this.setState({ myState: 'Weathery' })
  render() {
    return (
      <View style = {styles.container}>
        <HeaderComponent myState = {this.state.myState} updateState = {this.updateState}/>
        <BodyComponent />
      </View>
    );
  }
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})