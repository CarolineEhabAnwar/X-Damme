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


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{header: () => null}}
    />
    
  </Stack.Navigator>
);

/*const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({route}) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);*/

/*const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);*/

const AppStack = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2e64e5',
      }}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default AppStack;