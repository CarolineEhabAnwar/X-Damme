import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';

//Importing Waiting Screen
import WaitingScreen from '../screens/WaitingScreen'
import testScreen from "../screens/testScreen";

//Importing Components
import ItemComponent from '../screens/components/ItemComponent'
import FooterComponent from '../screens/components/FooterComponent'
import MechanicComponent from '../screens/components/MechanicComponent'
import ServiceComponent from '../screens/components/ServiceComponent'
import ServiceRequestComponent from '../screens/components/ServiceRequestComponent'
import ServiceRequestViewComponent from '../screens/components/ServiceRequestViewComponent'
import UserServiceRequestViewComponent from '../screens/components/UserServiceRequestViewComponent'


//Importing User Screens
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
import CartScreen from "../screens/UserUI/CartScreen"
import CartViewItemScreen from "../screens/UserUI/CartViewItemScreen"
import ReviewScreen from "../screens/UserUI/ReviewScreen"
import CustomersReviewsScreen from "../screens/UserUI/CustomersReviewsScreen"
import MyReviewsScreen from "../screens/UserUI/MyReviewsScreen"
import ChangeNameScreen from "../screens/UserUI/ChangeNameScreen"
import ChangePasswordScreen from "../screens/UserUI/ChangePasswordScreen"
import ChangeEmailScreen from "../screens/UserUI/ChangeEmailScreen"
import ChangeProfilePhotoScreen from "../screens/UserUI/ChangeProfilePhotoScreen"
import ChangeAddressScreen from "../screens/UserUI/ChangeAddressScreen";
import ChangePhoneNumberScreen from "../screens/UserUI/ChangePhoneNumberScreen";
import AdvViewScreen from "../screens/UserUI/AdvViewScreen"
import MyServiceRequestsScreen from "../screens/UserUI/MyServiceRequestsScreen"
import BeginnersStuffScreen from "../screens/UserUI/BeginnersStuffScreen"
import StuckOnTheRoadScreen from "../screens/UserUI/StuckOnTheRoadScreen"
import FirstAidScreen from "../screens/UserUI/FirstAidScreen"
import CarCheckUpScreen from "../screens/UserUI/CarCheckUpScreen"
import RecommendationScreen from "../screens/UserUI/RecommendationScreen"
import HotOffersScreen from "../screens/UserUI/HotOffersScreen"
import ReminderScreen from "../screens/UserUI/ReminderScreen"
import BestCarsScreen from "../screens/UserUI/BestCarsScreen"
import ShopOwnerProfileScreen from "../screens/UserUI/ShopOwnerProfileScreen"
import NearbyHospitalsScreen from "../screens/UserUI/NearbyHospitalsScreen"

//Importing Mechanic Screens
import MechAddOfferScreen from "../screens/Mech_UI/MechAddOfferScreen"
import MechSettingsScreen from "../screens/Mech_UI/MechSettingsScreen"
import MechAddServiceScreen from "../screens/Mech_UI/MechAddServiceScreen"
import MechContactUsScreen from "../screens/Mech_UI/MechContactUsScreen"
import MechEditServiceScreen from "../screens/Mech_UI/MechEditServiceScreen"
import MechHomeScreen from "../screens/Mech_UI/MechHomeScreen"
import MechProfileScreen from "../screens/Mech_UI/MechProfileScreen"
import MechRequestsScreen from "../screens/Mech_UI/MechRequestsScreen"
import MechServiceListScreen from "../screens/Mech_UI/MechServiceListScreen"
import MechViewRequestScreen from "../screens/Mech_UI/MechViewRequestScreen"
import MechViewServiceScreen from "../screens/Mech_UI/MechViewServiceScreen"
import MechRequestsHistoryScreen from "../screens/Mech_UI/MechRequestsHistoryScreen"

//Importing Shop Owner Screens
import SOAddItemScreen from "../screens/SO_UI/SOAddItemScreen"
import SOAddOfferScreen from "../screens/SO_UI/SOAddOfferScreen"
import SOContactUsScreen from "../screens/SO_UI/SOContactUsScreen"
import SOEditItemScreen from "../screens/SO_UI/SOEditItemScreen"
import SOHomeScreen from "../screens/SO_UI/SOHomeScreen"
import SOItemListScreen from "../screens/SO_UI/SOItemListScreen"
import SOProfileScreen from "../screens/SO_UI/SOProfileScreen"
import SORequestsScreen from "../screens/SO_UI/SORequestsScreen"
import SOViewRequestScreen from "../screens/SO_UI/SOViewRequestScreen"
import SOSettingsScreen from "../screens/SO_UI/SOSettingsScreen"
import SOViewItemScreen from "../screens/SO_UI/SOViewItemScreen"


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UserStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="Items"
      component={ItemsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MechanicDetails"
      component={MechanicDetailsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="Mechanics"
      component={MechanicScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ServiceDetails"
      component={ServiceDetailsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="Tutorials"
      component={TutorialsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ItemDetails"
      component={ItemDetailsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="Emergency"
      component={EmergencyScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="EmergencyContacts"
      component={EmergencyContactsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="WinchNumbers"
      component={WinchNumbersScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ContactUs"
      component={ContactUsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MyCars"
      component={MyCarsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MyCarsDetails"
      component={MyCarsDetailsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="AddCar"
      component={AddCarScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="EditKM"
      component={EditKMScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MyRequests"
      component={MyRequestsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MyRequestsDetails"
      component={MyRequestsDetailsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ItemComponent"
      component={ItemComponent}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="Cart"
      component={CartScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="CartViewItem"
      component={CartViewItemScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="Review"
      component={ReviewScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="CustomersReviews"
      component={CustomersReviewsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MyReviews"
      component={MyReviewsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="FooterComponent"
      component={FooterComponent}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangeName"
      component={ChangeNameScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangeEmail"
      component={ChangeEmailScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MechanicComponent"
      component={MechanicComponent}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ServiceComponent"
      component={ServiceComponent}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="AdvView"
      component={AdvViewScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MyServiceRequests"
      component={MyServiceRequestsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="UserServiceRequestViewComponent"
      component={UserServiceRequestViewComponent}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="BeginnersStuff"
      component={BeginnersStuffScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="StuckOnTheRoad"
      component={StuckOnTheRoadScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="CarCheckUp"
      component={CarCheckUpScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="FirstAid"
      component={FirstAidScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="Recommendation"
      component={RecommendationScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="HotOffers"
      component={HotOffersScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="Reminder"
      component={ReminderScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="BestCars"
      component={BestCarsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangeProfilePhoto"
      component={ChangeProfilePhotoScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="test"
      component={testScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangeAddress"
      component={ChangeAddressScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangePhoneNumber"
      component={ChangePhoneNumberScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ShopOwnerProfile"
      component={ShopOwnerProfileScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="NearbyHospitals"
      component={NearbyHospitalsScreen}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

const MechanicStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="MechHome"
      component={MechHomeScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MechAddOffer"
      component={MechAddOfferScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MechAddService"
      component={MechAddServiceScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MechContactUs"
      component={MechContactUsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MechEditService"
      component={MechEditServiceScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MechProfile"
      component={MechProfileScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MechRequests"
      component={MechRequestsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MechServiceList"
      component={MechServiceListScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MechViewRequest"
      component={MechViewRequestScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MechViewService"
      component={MechViewServiceScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MechSettings"
      component={MechSettingsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangeName"
      component={ChangeNameScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangeEmail"
      component={ChangeEmailScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangeProfilePhoto"
      component={ChangeProfilePhotoScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ServiceRequestComponent"
      component={ServiceRequestComponent}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="MechRequestsHistory"
      component={MechRequestsHistoryScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ServiceRequestViewComponent"
      component={ServiceRequestViewComponent}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangeAddress"
      component={ChangeAddressScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangePhoneNumber"
      component={ChangePhoneNumberScreen}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

const ShopOwnerStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="SOHome"
      component={SOHomeScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangeName"
      component={ChangeNameScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangeEmail"
      component={ChangeEmailScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangeProfilePhoto"
      component={ChangeProfilePhotoScreen}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="SOAddItem"
      component={SOAddItemScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="SOAddOffer"
      component={SOAddOfferScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="SOContactUs"
      component={SOContactUsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="SOEditItem"
      component={SOEditItemScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="SOItemList"
      component={SOItemListScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="SOProfile"
      component={SOProfileScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="SORequests"
      component={SORequestsScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="SOViewRequest"
      component={SOViewRequestScreen}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="SOSettings"
      component={SOSettingsScreen}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="SOViewItem"
      component={SOViewItemScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangeAddress"
      component={ChangeAddressScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ChangePhoneNumber"
      component={ChangePhoneNumberScreen}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

const AppStack = (typeUsed) => {
  if (typeUsed != "Default" && typeUsed != "Waiting")
    AsyncStorage.setItem('TypeUsed', typeUsed);
  if (typeUsed == "User") {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={UserStack}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    );
  }
  else if (typeUsed == "Mechanic") {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MechHome"
          component={MechanicStack}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    );
  }
  else if (typeUsed == "Shop Owner") {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ShopOwnerHome"
          component={ShopOwnerStack}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    );
  }
  else if (typeUsed == "Waiting") {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Waiting"
          component={WaitingScreen}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    );
  }
};

export default AppStack;