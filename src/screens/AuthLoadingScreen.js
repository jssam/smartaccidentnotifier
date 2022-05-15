import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import authService from '../services/AuthService';

const AuthLoadingScreen = ({ navigation }) => {

  useEffect(() => {
    bootstrapAsync();
  }, []);

  // Fetch the token from storage then navigate to our appropriate place
  const bootstrapAsync = async () => {
    const user = await authService.getUser();
    if (user) {
        navigation.navigate('MainStack');
      
    } else {
      navigation.navigate('TypeOfUser');
    }

    // This will switch to the Main screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  // Render any loading content that you like here
  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.loading} />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthLoadingScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "	#FFFFFF",
    flex: 1
  },
  loading: {
    marginTop: 30
  }
});
