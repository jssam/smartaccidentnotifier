import {createStackNavigator} from 'react-navigation-stack';

import  HomeScreen  from '../screens/HomeScreen/index';

const stackNavigatorOptions = {
    headerShown:false
}
const AuthNavigator = createStackNavigator({
    HomeScreen:{screen:HomeScreen,
        navigationOptions: () => ({
            headerShown: false
          })},
 
}, 
);
export default AuthNavigator;

