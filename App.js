
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import GetLocation from 'react-native-get-location'



class MyClass extends Component {

  state={
    latitude:0,
    longitude:0,
    error:null
  }

  get_location=()=>{

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
  })
  .then(location => {
      console.log(location.latitude);
      console.log(location.longitude);
      this.setState({
        latitude:location.latitude,
        longitude:location.longitude
      })
  
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
      console.log('error',error)
      alert('First You have to turn off your location')
  })
  }




componentDidMount=()=>{

this.get_location()
}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: this.state.latitude,
         longitude: this.state.longitude,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
       <Marker coordinate={this.state}/>
     </MapView>
   </View>
        <Text>My Map</Text>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height:'100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});



//make this component available to the app
export default MyClass;
