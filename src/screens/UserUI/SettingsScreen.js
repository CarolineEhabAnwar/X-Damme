import React from 'react';
import {StyleSheet, View } from 'react-native';
import {Container, FooterTab, Content, Icon, Text, Button, List, ListItem } from 'native-base';
import {Ionicons,MaterialCommunityIcons,Entypo} from '@expo/vector-icons';

const SettingsScreen = ({navigation}) => {
  return (
    <Container>

      {/* Text with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 0, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
        <Button transparent onPress={() => navigation.goBack()} >
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
            <Button transparent onPress={() => {navigation.navigate('ChangeName')}}>
              <Ionicons name="person" style={{ marginRight: -5 }} size={24} color="darkred" />
              <Text style={{ color: 'darkred', fontSize: 18, fontWeight: '500' }}>Change Name</Text>
            </Button>
          </ListItem>

          <ListItem>
            <Button transparent onPress={() => {navigation.navigate('ChangeEmail')}}>
              <Ionicons name="mail" style={{ marginRight: -5 }} size={24} color="darkred" />
              <Text style={{ color: 'darkred', fontSize: 18, fontWeight: '500' }}>Change Email Address</Text>
            </Button>
          </ListItem>

          <ListItem>
            <Button transparent onPress={() => {navigation.navigate('ChangePassword')}}>
              <Ionicons name="ios-key" style={{ marginRight: -5 }} size={24} color="darkred" />
              <Text style={{ color: 'darkred', fontSize: 18, fontWeight: '500' }}>Change Password</Text>
            </Button>
          </ListItem>

          <ListItem>
            <Button transparent>
              <MaterialCommunityIcons name="city" style={{ marginRight: -5 }} size={26} color="darkred" />
              <Text style={{ color: 'darkred', fontSize: 18, fontWeight: '500' }}>Addresses</Text>
            </Button>
          </ListItem>
        </List>
      </Content>
      {/* Footer */}
      <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkred" }}>
        <FooterTab transparent style={{ backgroundColor: "darkred" }}>
          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Home')}>
            <Icon style={{ color: 'white' }} name="home" />
            <Text style={{ color: 'white' }}> Home</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Profile')}>
            <Icon name="person" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }}>Profile</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('ContactUs')}>
            <Icon style={{ color: 'white' }} name="call" />
            <Text style={{ color: 'white' }} >Contact Us</Text>
          </Button>
        </FooterTab>
      </View>
      {/* End Footer */}
    </Container>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'darkred',
    textShadowRadius: 1.5,
    textShadowOffset: {
      width: 0.5,
      height: 0.5
    },
    marginBottom: 10

  },

  buttonStyle: {
    marginTop: 7,
    backgroundColor: 'darkred',
    marginRight: 10
  },

  buttonTextStyle: {
    fontWeight: 'bold'
  }
})