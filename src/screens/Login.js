import React, { useState,useEffect } from 'react';
import {Text,View,Image, TextInput} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import  authService  from '../services/AuthService';

const Login = ({ navigation, analyticsTrackEvent }) => {
const userType = navigation.state.params.person;
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");


const loginUser = async()=>{
    if(userType==='driver'){
        if(email===''||password===''){
            alert('Please fill all the fields');
            return;
        }else{
            await authService.loginD({email,password,userType},navigation);
        }
    }
    else{
        if(email===''||password===''){
            alert('Please fill all the fields');
            return;
        }else{
            await authService.loginU({email,password,userType},navigation);
        }
  
    }
}
        return(
            <View style={{backgroundColor:"#FFF",height:"100%"}}>
                <Image source ={require('../images/image.jpg')}
                    style={{width:"100%",height:"43%"}}
                />
                <Text
                 style={{
                     fontSize:30,
                     alignSelf:"center",
                 }}
                >Save the Life</Text>

                <Text
                style={{
                    marginHorizontal:55,
                    textAlign:'center',
                    marginTop:5,
                    opacity:0.4
                }}
                >
                    Every Year 20 million people lose their life due to  road Accidents due to late treatment. 
                </Text>

                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginHorizontal:55,
                    borderWidth:2,
                    marginTop:50,
                    paddingHorizontal:10,
                    borderColor:"#00716F",
                    borderRadius:23,
                    paddingVertical:2
                }}>
                    <Icon name="mail" color="#00716F" size={24}/>
                    <TextInput 
                        placeholder="phone number"
                        keyboardType='number-pad'
                        dataDetectorTypes='phoneNumber'

                        onChangeText={setEmail}
                        style={{paddingHorizontal:10}}
                    />

                    

                </View>
                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginHorizontal:55,
                    borderWidth:2,
                    marginTop:15,
                    paddingHorizontal:10,
                    borderColor:"#00716F",
                    borderRadius:23,
                    paddingVertical:2
                }}>
                    <Icon name="mail" color="#00716F" size={24}/>
                    <TextInput 
                              secureTextEntry
                        placeholder="Password"
                        onChangeText={setPassword}
                        style={{paddingHorizontal:10}}
                    />

                    

                </View>

                <TouchableOpacity 
                onPress={loginUser}
                style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:30,
                    backgroundColor:"#00716F",
                    paddingVertical:10,
                    borderRadius:23
                }}>
                    <Text style={{
                        color:"white",
                    }}>Login</Text>
                </TouchableOpacity>
                <Text 
                
                onPress={()=>navigation.navigate('Register',{userType:userType})}
                
                style={{
                    alignSelf:"center",
                    color:"#00716F",
                    paddingVertical:30
                }}>New User</Text>
            </View>
        )
    
}
export default Login;