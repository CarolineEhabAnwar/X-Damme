import React, { Component, useState, useEffect, useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, FooterTab, Content, Icon, Text, Button, List, ListItem } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5, Ionicons, Foundation, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import firestore, { firebase } from "@react-native-firebase/firestore";
import { AuthContext } from '../../navigation/AuthProvider';

const MyCarsScreen = ({ navigation }) => {

  const { user } = useContext(AuthContext);
  const [loadingScreen, setloadingScreen] = useState(true);
  const [MyCars, setMyCars] = useState([]);

  async function DeleteMe(key) {
    await firestore().collection("User's Cars").doc(key).delete();

    LoadUP();
  }

  async function LoadUP() {
    setloadingScreen(true);
    let temp = [];
    await firestore().collection("User's Cars").get().then((Data) => {
      if (Data.docs.length != 0) {
        for (let i = 0; i < Data.docs.length; i++) {
          if (Data.docs[i].data().Owner_ID == user.uid) {
            temp.push({ Brand: Data.docs[i].data().Brand, Model: Data.docs[i].data().Model, key: Data.docs[i].id });
          }
        }
      }
    });
    setMyCars(temp);
    setloadingScreen(false);
  }

  useEffect(() => {
    try {
      LoadUP()
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <Container>

      {/* Text with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 0, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
        <Button transparent onPress={() => navigation.navigate('Profile')} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '25%', paddingTop: 12, fontWeight: 'bold' }}>My Cars</Text>
        <Button style={{ marginLeft: 'auto', alignSelf: 'center' }} transparent onPress={() => navigation.push('AddCar')}>
          <Ionicons name='add' size={30} color='white' style={{ paddingRight: 10 }} />
        </Button>
      </View>
      {/* End Text with drawer */}
      <Content>
        {loadingScreen ?
          <Text style={styles.loadingStyle}> Loading... </Text>
          :
          <List>
            {MyCars.length == 0 ?
              <View>
                <Text style={styles.loadingStyle}> Please add your cars.</Text>
              </View>
              : null}
            {MyCars.map((item) => {
              return (
                <ListItem key={item.key}>
                  <Button transparent>
                    <Ionicons name="car" style={{ marginRight: -5 }} size={27} color="darkred" />
                    <Text style={{ color: 'darkred', fontSize: 18, fontWeight: '500' }}>{item.Brand} {item.Model}</Text>
                  </Button>

                  <Button transparent style={{ marginLeft: 'auto' }}
                    onPress={() => {
                      DeleteMe(item.key)
                    }}>
                    <Ionicons name="trash-outline" style={{ marginBottom: 3, alignSelf: 'flex-end' }} size={23} color="darkred" />
                  </Button>

                </ListItem>

              )
            })}

          </List>
        }
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

export default MyCarsScreen;

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
  },
  loadingStyle: {
    color: 'darkred',
    alignSelf: 'center',
    fontSize: 22,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginTop: 180
  }
})