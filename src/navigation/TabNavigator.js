import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator, ContactStackNavigator, ProfileStackNavigator } from "./AppStack";
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator tabBarOptions={{
            activeTintColor: "white",
            inactiveTintColor: "white",
            activeBackgroundColor: "firebrick",
            style: {
                backgroundColor: 'darkred',
            },
            labelStyle: {
                fontSize: 12,
                margin: 0,
                padding: 0,
              },
        }}>
            <Tab.Screen name="Home" component={MainStackNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: "white",
                    tabBarIcon: () => (
                        <Icon style={{ color: 'white' }} name="home" size={25} />
                    ),
                }} />
            <Tab.Screen name="Profile" component={ProfileStackNavigator}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarColor: "white",
                    tabBarIcon: () => (
                        <Icon style={{ color: 'white' }} name="person"  size={25}/>
                    ),
                }} />
            <Tab.Screen name="Contact Us" component={ContactStackNavigator}
                options={{
                    tabBarLabel: 'Contact Us',
                    tabBarColor: "white",
                    tabBarIcon: () => (
                        <Icon style={{ color: 'white' }} name="call"  size={25}/>
                    ),
                }} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
