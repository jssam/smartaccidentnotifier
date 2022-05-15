import React, {useState} from 'react';
import {Text, View, Image, TextInput, StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown';
import { TouchableOpacity } from 'react-native-gesture-handler';
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

  const signInUser = async()=>{
    if(userType==='driver'){
        if(name===''||email===''||phoneNumber===''||password===''||vehichleNumber===''||hospitalId===''){
            alert('Please fill all the fields');
            return;
        }
        else{
            let data={
                name,
                phoneNo:phoneNumber,
                email,
                vehicleNo:vehichleNumber,
                hospitalId,
                password
            }
            console.log(data);
        }
    }else{
        if(name===''||email===''||phoneNumber===''||password===''||vehichleNumber===''||vehicleBrand===''||vehicleColor===''){
            alert('Please fill all the fields');
            return;
        }else{
            let data={
                name,
                phoneNo:phoneNumber,
                email,
                vehicleBrand,
                vehicleColor,
                vehicleNo:vehichleNumber,
                password,
            }
            console.log(data);
        }
    }
}


  const Hospitals = [
    {name: 'Max', id: '1'},
    {name: 'maulanaazad hospital', id: 2},
    {name: 'aiims', id: 3},
    {name: 'khamar hospital', id: 4},
    {name: 'maulanaazad hospital', id: 5},
    {name: 'Max hospital', id: 6},
    {name: 'aiims hospital', id: 7},
    {name: 'maulanaazad hospital', id: 8},
    {name: 'khamar hospital', id: 9},
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
            setHospitalId(selectedItem.id);
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
      onPress={()=>{signInUser();}}
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
