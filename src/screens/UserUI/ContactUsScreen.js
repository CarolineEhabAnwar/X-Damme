import React, { Component, useState, useEffect } from 'react';
import { Image, StyleSheet, Linking, FlatList , LogBox} from 'react-native';
import { Container, FooterTab, Badge, InputGroup, Header, Content, List, Item, Input, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import { Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation-drawer';
import firestore from "@react-native-firebase/firestore";
import qs from 'qs';

const ContactUsScreen = ({ navigation }) => {

  LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);


  const [Contacts, setContacts] = useState([]);

  async function Get_Contacts() {
    await firestore().collection("App Details").doc("WzEI7B9mqYAzVclOOkFX").get().then((file) => {
      setContacts(file.data().US);
    });
  }

  async function sendEmail(to, subject, body, options = {}) {
    const { cc, bcc } = options;
    let url = `mailto:${to}`;
    // Create email link query
    const query = qs.stringify({
      subject: subject,
      body: body,
      cc: cc,
      bcc: bcc
    });

    if (query.length) {
      url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      throw new Error('Provided URL can not be handled');
    }

    return Linking.openURL(url);
  }

  useEffect(() => {
    try {
      Get_Contacts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container >
      {/* Text with navback */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
        <Button transparent onPress={() => navigation.navigate('Home')} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '20%', paddingTop: 12, fontWeight: 'bold' }}>Contact Us</Text>
      </View>
      {/* End Text with navback */}
      <Content>
        {/* Contact 1  */}
        <List style={{ marginTop: 0 }}>
          <FlatList
            data={Contacts}
            keyExtractor={(item)=>item.split("/")[2]}
            renderItem={({ item }) => {
              return (
                <ListItem>
                  <Body>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: '500', marginLeft: 2, marginRight: 50 }}>{item.split("/")[0]}</Text>
                    </View>
                  </Body>
                  <Right>
                    <View style={{ flexDirection: 'row', justifyContent: "flex-start" }}>
                      <Button style={{ flexDirection: 'row', marginRight: 8, height: 30, backgroundColor: 'blue' }}
                        onPress={() => {
                          sendEmail(
                            item.split("/")[1],
                            'Report about X-Damme',
                            '',
                            { cc: '' }
                          ).then(() => {
                            console.log('Your message was successfully sent!');
                          });
                        }}
                      >
                        <MaterialIcons name="email" size={20} style={{ marginLeft: 10, marginRight: -10 }} color="white" />
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Email</Text>
                      </Button>
                      <Button style={{ flexDirection: 'row', height: 30, backgroundColor: 'darkred' }}
                        onPress={() => {
                          Linking.openURL(`tel:${item.split("/")[2]}`)
                        }}
                      >
                        <MaterialIcons name="call" size={20} style={{ marginLeft: 10, marginRight: -10 }} color="white" />
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Call</Text>
                      </Button>
                    </View>
                  </Right>
                </ListItem>
              );
            }}
          />
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

export default ContactUsScreen;

const styles = StyleSheet.create({
  IconStyle: {
    color: 'darkred',
    marginLeft: -30
  },
  textStyles: {
    fontWeight: '500'
  }
})
