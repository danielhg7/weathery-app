import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faCloud } from '@fortawesome/free-solid-svg-icons'

export default class BodyComponent extends Component {

    searchText = '';

    apiUrl = 'http://10.90.148.120:8000/';

    formattedCity = '';
    baseCountryFlag = 'https://www.countryflags.io/';
    flag32 = "/shiny/32.png";
    state = {
        data: '',
        currentWeather: {

        }
    }

    watchID = null;
    
    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(
           (position) => {
                console.log(position);
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                this.setState({ 
                    latitude:latitude,
                    longitude:longitude
                });
                console.log(this.state);
                fetch(this.apiUrl + `api/location/coords/?latitude=${this.state.latitude}&longitude=${this.state.longitude}`, {
                    method: 'GET'
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("First api call: ", responseJson);
                    this.setState({
                        data: responseJson
                    })
                    this.formattedCity = this.state.data.formattedAddress.trim();
                    var url = new URL(this.apiUrl + "api/location?address=" + encodeURIComponent(this.formattedCity));
                    fetch(encodeURI(url), {
                        method: 'GET'
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {

                        console.log("Second api call: ",responseJson);

                        this.setState({
                            countryCode: responseJson.countryCode
                        });

                        this.countryFlag = this.baseCountryFlag + this.state.countryCode + this.flag32;

                        console.log(this.countryFlag);
                        var url = new URL(`api/forecast?latitude=${encodeURIComponent(responseJson.latitude)}&longitude=${encodeURIComponent(responseJson.longitude)}&units=si` , this.apiUrl);
                        console.log(url);
                        fetch(encodeURI(url), {
                            method: 'GET'
                        })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log("Third api call: ",responseJson.currently);
                            this.setState({
                                currentWeather: responseJson.currently,
                                dailyWeather: responseJson.daily
                            });
                        });
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
            },
           (error) => alert(error.message),
           { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
           const lastPosition = JSON.stringify(position);
           this.setState({ lastPosition });
        });
    }

    updateState = () => this.setState({ myState: 'Weathery' })
    render() {
        return (
            <View style={styles.bodyState}>
                <Text style={{color:'white'}}>
                    {this.state.data.formattedAddress}
                </Text>
                <Image style={{width: 20, height: 20}} 
                    source={{uri: this.countryFlag}}
                />
                <Text style={{color:'white'}}>
                    {this.state.currentWeather.summary}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    bodyState: {
       flex: 9,
       width: '100%',
       justifyContent:'flex-start',
       alignItems: 'center',
       backgroundColor: 'black',
       marginTop: 3
    },
    input: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 4,
        width: '60%',
        backgroundColor:'white',
        padding: 4,
        textAlign: 'center'
    },
    placeholderStyle: {
        fontFamily: 'Arial',
        color: 'blue'
    }
 })