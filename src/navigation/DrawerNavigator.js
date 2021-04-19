import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainStackNavigator, ContactStackNavigator, ProfileStackNavigator } from "./AppStack";
import TabNavigator from "./TabNavigator";
import ItemsScreen from "../screens/UserUI/ItemsScreen";
import MechanicScreen from "../screens/UserUI/MechanicScreen";
import TutorialsScreen from "../screens/UserUI/TutorialsScreen";
import EmergencyScreen from "../screens/UserUI/EmergencyScreen";
import LoginScreen from "../screens/LoginScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Items" component={ItemsScreen} />
      <Drawer.Screen name="Mechanics" component={MechanicScreen} />
      <Drawer.Screen name="Recommendations" component={MechanicScreen} />
      <Drawer.Screen name="Tutorials" component={TutorialsScreen} />
      <Drawer.Screen name="Emergency" component={EmergencyScreen} />
      <Drawer.Screen name="Profile" component={ProfileStackNavigator} />
      <Drawer.Screen name="Contact Us" component={ContactStackNavigator} />
      <Drawer.Screen name="Logout" component={LoginScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;