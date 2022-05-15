import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import UserPage from '../screens/UserPage';

const stackNavigatorOptions = {
    headerShown:false
}
const AuthNavigator = createStackNavigator({
    TypeOfUser:{screen:UserPage,    navigationOptions: () => ({
        headerShown: false
      })},
    
    Login:{screen:Login,
        navigationOptions: () => ({
            headerShown: false
          })},
    Register:{screen:Register,
        navigationOptions: () => ({
            headerShown: false
          })},
 
}, 
);
export default AuthNavigator;