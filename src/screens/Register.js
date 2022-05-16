import React, {useState} from 'react';
import {Text, View, Image, TextInput, StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown';
import {TouchableOpacity} from 'react-native-gesture-handler';
import authService from '../services/AuthService';
//class based
const Register = ({navigation, analyticsTrackEvent}) => {
  const userType = navigation.state.params.userType;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [vehichleNumber, setVehichleNumber] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');

  const signInUser = async () => {
    if (userType === 'driver') {
      if (
        name === '' ||
        email === '' ||
        phoneNumber === '' ||
        password === '' ||
        vehichleNumber === '' ||
        hospitalId === ''
      ) {
        alert('Please fill all the fields');
        return;
      } else {
        let data = {
          name,
          phoneNo: phoneNumber,
          email,
          vehicleNo: vehichleNumber,
          hospitalId,
          password,
        };
        await authService.signupD(data, navigation);
      }
    } else {
      if (
        name === '' ||
        email === '' ||
        phoneNumber === '' ||
        password === '' ||
        vehichleNumber === '' ||
        vehicleBrand === '' ||
        vehicleColor === ''
      ) {
        alert('Please fill all the fields');
        return;
      } else {
        let data = {
          name,
          phoneNo: phoneNumber,
          email,
          vehicleBrand,
          vehicleColor,
          vehicleNo: vehichleNumber,
          password,
        };
        await authService.signupU(data, navigation);
      }
    }
  };

  const Hospitals = [
    {
      _id: '626b4e17d7ee8bf2bdced769',
      name: 'Jag Prakash Chandra Hospital',
    },
    {
      _id: '6265fa525493666eb4179582',
      name: 'Burari Hospital',
    },
    {
      _id: '6265fa185493666eb4179580',
      name: 'Indraprastha Apollo Hospital',
    },
    {
      _id: '6265f9cb5493666eb417957e',
      name: 'Sanjay Gandhi Memorial Hospital',
    },
    {
      _id: '6265f9935493666eb417957c',
      name: 'Guru Gobind Singh Govt Hospital',
    },
    {
      _id: '6265f95e5493666eb417957a',
      name: 'Maharaja Agrasen Hospital',
    },
    {
      _id: '6265f92d5493666eb4179578',
      name: 'Sir Ganga Ram Hospital',
    },
    {
      _id: '6265f8f35493666eb4179576',
      name: 'AIIMS Hospital',
    },
    {
      _id: '6265f8b15493666eb4179574',
      name: 'Safdarjung Hospital',
    },
    {
      _id: '6265f8755493666eb4179572',
      name: 'Deen Dayal Upadhyay Hospital',
    },
    {
      _id: '6265f82d5493666eb4179570',
      name: 'Max Super Speciality Hospital, Saket',
    },
    {
      _id: '6265f7bd5493666eb417956e',
      name: 'Max Super Speciality Hospital, Patparganj',
    },
    {
      _id: '6265f77c5493666eb417956c',
      name: 'Jag Pravesh Chandra Hospital',
    },
    {
      _id: '6265f70a5493666eb417956a',
      name: 'Hindu Rao Hospital',
    },
    {
      _id: '6265f5d85493666eb4179568',
      name: 'Sant Parmanand Hospital',
    },
  ];
  return (
    <View style={{backgroundColor: '#FFF', height: '100%'}}>
      <View style={{height: '10%'}} />
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

      <View style={styles.container}>
        <TextInput
          placeholder="name"
          onChangeText={setName}
          placeholderTextColor="#00716F"
          style={{paddingHorizontal: 10}}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          onChangeText={setPhoneNumber}
          placeholder="phone number"
          placeholderTextColor="#00716F"
          style={{paddingHorizontal: 10}}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#00716F"
          style={{paddingHorizontal: 10}}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          onChangeText={setVehichleNumber}
          placeholder="Vehicle Number"
          placeholderTextColor="#00716F"
          style={{paddingHorizontal: 10}}
        />
      </View>
      {userType === 'driver' ? (
        <SelectDropdown
          buttonStyle={styles.container}
          buttonTextStyle={{paddingHorizontal: 10, color: '#00716F'}}
          data={Hospitals}
          onSelect={(selectedItem, index) => {
            setHospitalId(selectedItem._id);
            console.log(selectedItem, index);
          }}
          defaultButtonText={'select Hospital Name'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.name;
          }}
          rowTextForSelection={(item, index) => {
            return item.name;
          }}
        />
      ) : (
        <>
          <View style={styles.container}>
            <TextInput
              onChangeText={setVehicleBrand}
              placeholder="Vehicle Brand"
              placeholderTextColor="#00716F"
              style={{paddingHorizontal: 10}}
            />
          </View>
          <View style={styles.container}>
            <TextInput
              onChangeText={setVehicleColor}
              placeholder="Vehicle Color"
              placeholderTextColor="#00716F"
              style={{paddingHorizontal: 10}}
            />
          </View>
        </>
      )}
      <View style={styles.container}>
        <TextInput
          secureTextEntry
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#00716F"
          style={{paddingHorizontal: 10}}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          signInUser();
        }}
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
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Register;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '74%',
    height: 34,
    alignItems: 'center',
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 15,
    paddingHorizontal: 10,
    borderColor: '#00716F',
    borderRadius: 23,
    paddingVertical: 2,
    backgroundColor: '#ffff',
  },
  loading: {
    marginTop: 30,
  },
});
