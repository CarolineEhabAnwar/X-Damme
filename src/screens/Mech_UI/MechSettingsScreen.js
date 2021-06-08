import React, { Component, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, FooterTab, Content, Icon, Text, Button, List, ListItem } from 'native-base';
import FooterComponent from '../components/FooterComponent'
import { FontAwesome5, Ionicons, Foundation, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const MechSettingsScreen = ({ navigation }) => {

  const home = 'MechHome'
  const profile = 'MechProfile'
  const contactus = 'MechContactUs'
  const color = 'darkgreen'

  return (
    <Container>

      {/* Text with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 0, paddingBottom: 6, alignContent: "center", backgroundColor: "darkgreen", top: 0 }}>
        <Button transparent onPress={() => navigation.goBack()} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '27%', paddingTop: 12, fontWeight: 'bold' }}>Settings</Text>
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
              <Ionicons name="person" style={{ marginRight: -5 }} size={24} color="darkgreen" />
              <Text style={{ color: 'darkgreen', fontSize: 18, fontWeight: '500' }}>Change Name</Text>
            </Button>
          </ListItem>

          <ListItem>
            <Button transparent onPress={() => navigation.navigate('ChangeEmail', {
              Color: color,
              Home: home,
              Profile: profile,
              ContactUs: contactus
            })}>

              <Entypo name="email" style={{ marginRight: -5 }} size={24} color="darkgreen" />
              <Text style={{ color: 'darkgreen', fontSize: 18, fontWeight: '500' }}>Change Email</Text>
            </Button>
          </ListItem>

          <ListItem>
            <Button transparent onPress={() => navigation.navigate('ChangePassword', {
              Color: color,
              Home: home,
              Profile: profile,
              ContactUs: contactus
            })}>
              <Ionicons name="ios-key" style={{ marginRight: -5 }} size={24} color="darkgreen" />
              <Text style={{ color: 'darkgreen', fontSize: 18, fontWeight: '500' }}>Change Password</Text>
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
              <MaterialCommunityIcons name="city" style={{ marginRight: -5 }} size={26} color="darkgreen" />
              <Text style={{ color: 'darkgreen', fontSize: 18, fontWeight: '500' }}>Change Addresse</Text>
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

      <FooterComponent
        home={home}
        profile={profile}
        contactus={contactus}
        bkcolor={color}
      />

    </Container>
  );

}

export default MechSettingsScreen

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'darkgreen',
    textShadowRadius: 1.5,
    textShadowOffset: {
      width: 0.5,
      height: 0.5
    },
    marginBottom: 10

  },

  buttonStyle: {
    marginTop: 7,
    backgroundColor: 'darkgreen',
    marginRight: 10
  },

  buttonTextStyle: {
    fontWeight: 'bold'
  }
})