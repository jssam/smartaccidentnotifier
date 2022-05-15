/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function UserPage({navigation}) {
  return (
    <View
      style={{
        backgroundColor:"#FFF",
        paddingVertical: 20,
        height:"100%",  
      }}>
      <Image
        source={require('../images/image.jpg')}
        style={{width: '100%', height: '43%'}}
      />
      <Text
        style={{
          fontSize: 30,
          alignSelf: 'center',
        }}>
        Save the Life
      </Text>
      <Text
        style={{
          marginHorizontal: 55,
          textAlign: 'center',
          marginTop: 5,
          opacity: 0.4,
        }}>
        Every Year 20 million people lose their life due to road Accidents due
        to late treatment.
      </Text>
      <TouchableOpacity 
      onPress={() => navigation.navigate('Login',{person:"driver"})}
        style={{
          marginHorizontal: 55,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
          backgroundColor: '#00716F',
          paddingVertical: 10,
          borderRadius: 23,
        }}>

        <Text
          style={{
            color: 'white',
          }}>
          Ambulance Driver
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => navigation.navigate('Login',{person:"user"})}
        style={{
          marginHorizontal: 55,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
          backgroundColor: '#00716F',
          paddingVertical: 10,
          borderRadius: 23,
        }}>
        <Text
          style={{
            color: 'white',
          }}>
          User
        </Text>
      </TouchableOpacity>
    </View>
  );
}
