import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HeaderComponent = (props) => {
   return (
      <View style = {styles.headerState}>
         <Text style = {styles.textState} onPress = {props.updateState}>
            {props.myState}
         </Text>
      </View>
   )
}
export default HeaderComponent

const styles = StyleSheet.create ({
   headerState: {
      marginTop: 24,
      backgroundColor: 'blue',
      flex: 1,
      width: '100%'
   },
   textState: {
      marginTop: 20,
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
      padding: 2
   }
})