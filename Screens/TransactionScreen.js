import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Touchable, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default class Transaction extends Component {
 
  constructor(){
    super();
    this.state ={
      hasCameraPermissions : 'null',
      scanned : false,
      scannedStudentID : '',
      scannedBookID : '',
      buttonState : 'normal'
    }
  }
 
  render(){

  const hasCameraPermissions = this.state.hasCameraPermissions

  const buttonState = this.state.buttonState

  const scanned = this.state.scanned

  if(buttonState !== 'normal' && hasCameraPermissions){
    return(
      <BarCodeScanner onBarCodeScanned = {
        scanned ? console.log('successful') : this.handleBarCodeScanner
      }></BarCodeScanner>
    )
  }
   else if(buttonState === 'normal'){

  return (
    <View style={styles.container}>
      <View>
        <Image source = {require('../assets/booklogo.jpg')} style = {{width : 200, height: 200}} />
        <Text style = {{textAlign: 'center', fontSize: 30}}>Wily</Text>
      </View>
      <Text>Transaction</Text>
      <View style = {styles.inputContainer}>
        <TextInput placeholder = 'book ID' style = {styles.inputBox} value = {this.state.scannedBookID}></TextInput>
        <TouchableOpacity style = {styles.scanButton} onPress = {() => {this.getCameraPermissions('bookID')}}>
          <Text style = {styles.scanText}>Scan</Text>
        </TouchableOpacity>
        </View>
        <View style = {styles.inputContainer}>
        
        <TextInput placeholder = 'student ID' style = {styles.inputBox} value = {this.state.scannedStudentID}></TextInput>
        <TouchableOpacity style = {styles.scanButton} onPress = {() => {this.getCameraPermissions('studentID')}}>
          <Text style = {styles.scanText}>Scan</Text>
        </TouchableOpacity>
    </View>
    </View>
  );

}
 }

  getCameraPermissions = async (ID) => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA)

    this.setState({
      hasCameraPermissions : status === 'granted',
      buttonState : ID,
      scanned: 'false'
    });
  }

  handleBarCodeScanner = async ({type , data}) => {
    this.setState({
      buttonState : 'normal',
      scannedData : 'data',
      scanned : true
    });
    
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    backgroundColor: '#5522ff',
    padding: 10,
    margin: 10,
    },
    scanText: {
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      margin: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scanButton: {
      backgroundColor: '#1f2f3f',
      width: 50,
      borderWidth: 2,
      borderColor:'#000000',
      marginLeft: 50
    },
    scanText: {
      textAlign: 'center',
      marginTop: 10,
      fontSize: 15,
      color: '#fff'
    },
    inputBox: {
      width: 200,
      height: 50,
      borderWidth: 2,
      borderColor:'#000000',
      fontSize: 20
    }
});
