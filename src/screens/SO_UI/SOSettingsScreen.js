import React, { Component, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, FooterTab, Content, Icon, Text, Button, List, ListItem } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5, Ionicons, Foundation, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const SOSettingsScreen = ({ navigation }) => {

  const home = 'SOHome'
  const profile = 'SOProfile'
  const contactus = 'SOContactUs'
  const color = 'darkblue'

  return (
    <Container>

      {/* Text with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 0, paddingBottom: 6, alignContent: "center", backgroundColor: "darkblue", top: 0 }}>
        <Button transparent onPress={() => navigation.push('SOProfile')} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '25%', paddingTop: 12, fontWeight: 'bold' }}>Settings</Text>
      </View>
      {/* End Text with drawer */}
      <Content>
        <List>
          <ListItem>
            <Button transparent onPress={() => navigation.navigate('ChangeName', {
              Color: color,
              Home: home,
              Profile: profile,
              ContactUs: contactus
            })}>
              <Ionicons name="person" style={{ marginRight: -5 }} size={24} color="darkblue" />
              <Text style={{ color: 'darkblue', fontSize: 18, fontWeight: '500' }}>Change Name</Text>
            </Button>
          </ListItem>

          <ListItem>
            <Button transparent onPress={() => navigation.navigate('ChangeEmail', {
              Color: color,
              Home: home,
              Profile: profile,
              ContactUs: contactus
            })}>

              <Entypo name="email" style={{ marginRight: -5 }} size={24} color="darkblue" />
              <Text style={{ color: 'darkblue', fontSize: 18, fontWeight: '500' }}>Change Email</Text>
            </Button>
          </ListItem>

          <ListItem>
            <Button transparent onPress={() => navigation.navigate('ChangePassword', {
              Color: color,
              Home: home,
              Profile: profile,
              ContactUs: contactus
            })}>
              <Ionicons name="ios-key" style={{ marginRight: -5 }} size={24} color="darkblue" />
              <Text style={{ color: 'darkblue', fontSize: 18, fontWeight: '500' }}>Change Password</Text>
            </Button>
          </ListItem>

          <ListItem>
            <Button transparent onPress={() => {
              navigation.navigate('ChangePhoneNumber', {
                Color: color,
                Home: home,
                Profile: profile,
                ContactUs: contactus
              })
            }}>
              <Entypo name="phone" style={{ marginRight: -5 }} size={24} color={color} />
              <Text style={{ color: color, fontSize: 18, fontWeight: '500' }}>Change Phone Number</Text>
            </Button>
          </ListItem>

          <ListItem>
            <Button transparent onPress={() => {
              navigation.navigate('ChangeAddress', {
                Color: color,
                Home: home,
                Profile: profile,
                ContactUs: contactus
              })
            }}>
              <MaterialCommunityIcons name="city" style={{ marginRight: -5 }} size={26} color="darkblue" />
              <Text style={{ color: 'darkblue', fontSize: 18, fontWeight: '500' }}>Change Address</Text>
            </Button>
          </ListItem>

          <ListItem>
            <Button transparent onPress={() => {
              navigation.navigate('ChangeProfilePhoto', {
                Color: color,
                Home: home,
                Profile: profile,
                ContactUs: contactus
              })
            }}>
              <MaterialCommunityIcons name="image" style={{ marginRight: -5 }} size={26} color={color} />
              <Text style={{ color: color, fontSize: 18, fontWeight: '500' }}>Change Profile Photo</Text>
            </Button>
          </ListItem>

        </List>
      </Content>
      {/* Footer */}
      <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkblue" }}>
        <FooterTab transparent style={{ backgroundColor: "darkblue" }}>
          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('SOHome')}>
            <Icon style={{ color: 'white' }} name="home" />
            <Text style={{ color: 'white' }}> Home</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.push('SOProfile')}>
            <Icon name="person" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }}>Profile</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('SOContactUs')}>
            <Icon style={{ color: 'white' }} name="call" />
            <Text style={{ color: 'white' }} >Contact Us</Text>
          </Button>
        </FooterTab>
      </View>
      {/* End Footer */}
    </Container>
  );

}

export default SOSettingsScreen

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'darkblue',
    textShadowRadius: 1.5,
    textShadowOffset: {
      width: 0.5,
      height: 0.5
    },
    marginBottom: 10

  },

  buttonStyle: {
    marginTop: 7,
    backgroundColor: 'darkblue',
    marginRight: 10
  },

  buttonTextStyle: {
    fontWeight: 'bold'
  }
})