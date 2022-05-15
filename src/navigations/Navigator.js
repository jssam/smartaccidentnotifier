import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';


const AppNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    AuthNavigator: AuthNavigator,
    MainStack: MainTabNavigator
 
},
{
    defaultNavigationOptions : 'AuthLoading'
}  
);
export default createAppContainer(AppNavigator);