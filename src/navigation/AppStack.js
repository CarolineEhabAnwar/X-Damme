import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//Importing Screens
import HomeScreen from '../screens/UserUI/HomeScreen'
import ItemsScreen from "../screens/UserUI/ItemsScreen"
import MechanicDetailsScreen from "../screens/UserUI/MechanicDetailsScreen"
import MechanicScreen from "../screens/UserUI/MechanicScreen"
import ServiceDetailsScreen from "../screens/UserUI/ServiceDetailsScreen"
import TutorialsScreen from "../screens/UserUI/TutorialsScreen"
import ItemDetailsScreen from '../screens/UserUI/ItemDetailsScreen'
import EmergencyScreen from '../screens/UserUI/EmergencyScreen'
import EmergencyContactsScreen from '../screens/UserUI/EmergencyContactsScreen'
import WinchNumbersScreen from '../screens/UserUI/WinchNumbersScreen'
import ProfileScreen from "../screens/UserUI/ProfileScreen"
import ContactUsScreen from "../screens/UserUI/ContactUsScreen"
import SettingsScreen from "../screens/UserUI/SettingsScreen"
import MyCarsScreen from "../screens/UserUI/MyCarsScreen"
import MyCarsDetailsScreen from "../screens/UserUI/MyCarsDetailsScreen"
import AddCarScreen from "../screens/UserUI/AddCarScreen"
import EditKMScreen from "../screens/UserUI/EditKMScreen"
import MyRequestsScreen from "../screens/UserUI/MyRequestsScreen"
import MyRequestsDetailsScreen from "../screens/UserUI/MyRequestsDetailsScreen"
import AreYouScreen from "../screens/AreYouScreen"


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="Items"
      component={ItemsScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="MechanicDetails"
      component={MechanicDetailsScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="Mechanics"
      component={MechanicScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="ServiceDetails"
      component={ServiceDetailsScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="Tutorials"
      component={TutorialsScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="ItemDetails"
      component={ItemDetailsScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="Emergency"
      component={EmergencyScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="EmergencyContacts"
      component={EmergencyContactsScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="WinchNumbers"
      component={WinchNumbersScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="ContactUs"
      component={ContactUsScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="MyCars"
      component={MyCarsScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="MyCarsDetails"
      component={MyCarsDetailsScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="AddCar"
      component={AddCarScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="EditKM"
      component={EditKMScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="MyRequests"
      component={MyRequestsScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="MyRequestsDetails"
      component={MyRequestsDetailsScreen}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="AreYou"
      component={AreYouScreen}
      options={{header: () => null}}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={FeedStack}
      options={{header: () => null}}
    />
    
  </Stack.Navigator>
  );
};

export default AppStack;