/* eslint-disable react-native/no-inline-styles */
import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import openMap from 'react-native-open-maps';
import {TouchableOpacity} from 'react-native-gesture-handler';
import authService from '../../services/AuthService';
import {ActivityIndicator} from 'react-native';
import {Linking} from 'expo';

const HomeScreen = ({navigation}) => {
  const mapOpen = () => {
    openMap({latitude: parseInt(lat), longitude: parseInt(long)},navigation=true);
  };
  const [loader,setLoading]= useState(true);
  const [name,setName]= useState("");
  const [phoneNumber,setPhoneNumber]= useState("");
  const [VehicleNum,SetVehicleNum]= useState("");
  const [vehicleBrand,setvehicleBrand]= useState("");
  const [vehicleColor,setVehicleColor]= useState("");
  const [time,setTime]= useState("");
  const [lat,setLat]= useState("");
  const [long,setLong]= useState("");
  const [acc,setAcc]= useState("");

  var control =  true;
  const everyTime=async()=> {
    if(control===true){
      console.log("sda",control);
   let data =  await authService.accident()
   if(data.data.length!=0){
    console.log("data",data);
    setLoading(false);
    let n = data.data.length-1;
    setName(data.data[n].customerId.name);
    setPhoneNumber(data.data[n].customerId.phoneNo);
    SetVehicleNum(data.data[n].customerId.vehicleNo);
    setvehicleBrand(data.data[n].customerId.vehicleBrand);
    setVehicleColor(data.data[n].customerId.vehicleColor);
    console.log(data.data[n].accidentLocationId.date)
    setTime(data.data[n].accidentLocationId.date+" "+data.data[0].accidentLocationId.time); 
    setLat(data.data[n].accidentLocationId.lat);
    setLong(data.data[n].accidentLocationId.long);
    setAcc(data.data[n].accidentLocationId._id);
    control = false;
   }
    }
  
}
  useEffect(()=>{
 if(loader){
  // vAR
  var myInterval = setInterval(everyTime, 5000);
 }
  },[loader]);
  return (
    <View
      style={{
        backgroundColor: '#FFF',
        paddingVertical: 20,
        flex: 1,
      }}>
      <View style={{height: 50}} />
      <Text
        style={{
          fontSize: 30,
          alignSelf: 'center',
        }}>
        Save the Life
      </Text>
      <View style={{height: '70%'}}>
        {loader? (
          <View
            style={{
              height: '90%',
              width: '90%',
              borderColor: 'grey',
              borderWidth: 2,
              margin: 16,
              borderRadius: 23,
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator
              style={{
                marginTop: '50%',
              }}
            />
            <Text style={{fontSize: 20, margin: 16}}>
              searching for accident
            </Text>
            <Text style={{fontSize: 20, margin: 16}}>
              if it occur you will be notified
            </Text>
          </View>
        ) : (
          <View
            style={{
              height: '90%',
              width: '90%',
              borderColor: 'grey',
              borderWidth: 2,
              margin: 16,
              borderRadius: 23,
            }}>
            <Text style={{fontSize: 20, margin: 16}}>Name: {name}</Text>
            <Text style={{fontSize: 20, margin: 16}}>
              phone number: {phoneNumber}
            </Text>
            <Text style={{fontSize: 20, margin: 16}}>
              vehicle number:  {VehicleNum}
            </Text>
            <Text style={{fontSize: 20, margin: 16}}>
            vehicle Brand: {vehicleBrand}
            </Text>
            <Text style={{fontSize: 20, margin: 16}}>
            vehicle color: {vehicleColor}
            </Text>
            <Text style={{fontSize: 20, margin: 16}}>
            time: {time}
            </Text>
            <TouchableOpacity
              onPress={async() => {
                await authService.accept({accidentId:acc});
                mapOpen();
              }}
              style={{
                marginHorizontal: 55,
                alignItems: 'center',
                marginTop: 30,
                backgroundColor: '#00716F',
                paddingVertical: 10,
                borderRadius: 23,
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  color: 'white',
                }}>
                Accept
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {setLoading(true);
                control = true;
              }}
              style={{
                marginHorizontal: 55,
                alignItems: 'center',
                marginTop: 30,
                backgroundColor: '#00716F',
                paddingVertical: 10,
                borderRadius: 23,
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  color: 'white',
                }}>
                Decline
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          authService.logout(navigation);
        }}
        style={{
          marginHorizontal: 55,
          alignItems: 'center',
          marginTop: 30,
          backgroundColor: '#00716F',
          paddingVertical: 10,
          borderRadius: 23,
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            color: 'white',
          }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;
