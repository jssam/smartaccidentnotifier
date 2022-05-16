/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import openMap from 'react-native-open-maps';
import {TouchableOpacity} from 'react-native-gesture-handler';
import authService from '../../services/AuthService';
import {ActivityIndicator} from 'react-native';
import {Linking} from 'expo';
const HomeScreen = ({navigation}) => {
  const mapOpen = () => {
    openMap({latitude: 37.865101, longitude: -119.53833});
  };
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
        {true ? (
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
            <Text style={{fontSize: 20, margin: 16}}>Name: ritik</Text>
            <Text style={{fontSize: 20, margin: 16}}>
              phone number: 891239821938
            </Text>
            <Text style={{fontSize: 20, margin: 16}}>
              vehicle number: 2213as
            </Text>
            <Text style={{fontSize: 20, margin: 16}}>
              place: sajsannajcnajsncjasn sancj
            </Text>
            <TouchableOpacity
              onPress={() => {
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
              onPress={() => {}}
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
