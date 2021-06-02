import React, { Component, useContext, useState, useEffect } from 'react';
import { Container, InputGroup, Header, Item, Icon, Input, Content, Left, Right, Title, Body, Footer, FooterTab, Button, Text, Badge } from 'native-base';
import { StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import AdvComponent from "../components/AdvComponent";
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from "@react-native-firebase/firestore";


const HomeScreen = ({ navigation }) => {

  const [ads, setAds] = useState([]);

  const Check_Date = (Date_To_Check, Duration) => {
    let Duration_In_Millisecond = Duration * 86400000;
    let Due_Date = Date_To_Check.toMillis() + Duration_In_Millisecond;
    let Today = new Date().getTime();

    if (Today < Due_Date) {
      return true;
    }
    else {
      return false;
    }

  }

  async function Get_Ads() {
    await firestore().collection("Ads").get().then((Ads) => {
      let temp = [];
      for (let i = 0; i < Ads.docs.length; i++) {
        if (Check_Date(Ads.docs[i].data().Date_Of_Offer, Ads.docs[i].data().Duration)) {
          let ad_temp = { ...Ads.docs[i].data(), key: Ads.docs[i].id }
          temp.push(ad_temp);
        }
        else {
          for (let j = 0; j < Ads.docs[i].data().Items.length; j++) {
            let Type_of_Ad = "CarStuff";
            if (Ads.docs[i].data().Service == "true")
              Type_of_Ad = "Services";
            firestore().collection(Type_of_Ad).doc(Ads.docs[i].data().Items[i]).update({
              InOffer: "false",
              After_Price: null,
              Offer_Start_Date: null,
              Offer_Duration: null
            });
          }
          firestore().collection("Ads").doc(Ads.docs[i].id).delete();
        }
      }
      setAds(temp);
    });
  }

  useEffect(() => {
    try {
      Get_Ads();
    } catch (error) {
      console.log(error)
    }
  }, []);
  return (
    <Container>

      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 26, marginBottom: 12, paddingBottom: 6, backgroundColor: "darkred" }}>
        <Button transparent onPress={() => navigation.dispatch(DrawerActions.openDrawer())} >
          <Icon ios='ios-menu' android="md-menu" style={{ fontSize: 28, color: 'white' }} />
        </Button>

        <Button transparent style={{ height: 50 }} onPress={() => navigation.navigate('Cart')}>
          <Icon name='cart' style={{ fontSize: 24, marginRight: -6, color: 'white' }}></Icon>
          <Text style={{ color: "white", fontSize: 16, fontWeight: 'bold' }}>My Cart</Text>
        </Button>
      </View>
      {/* End Header */}


      <Content scrollEnabled>
        <Text style={styles.title}>Welcome</Text>
        <View style={{ marginTop: 40, marginBottom: 50, flexDirection: "row", justifyContent: 'space-evenly' }}>

          {/* Car Items Bubble */}
          <View style={{ height: 100, width: 100 }}>
            <Button transparent onPress={() => navigation.navigate('Items')} style={{ height: 100, width: 100 }}>
              <Image source={require("../../../assets/parts.png")} style={styles.profileImg} />
            </Button>
            <Text style={styles.textStyle}>Car Parts</Text>
          </View>

          {/* Mechanics Bubble */}
          <View style={{ height: 100, width: 100 }}>
            <Button transparent onPress={() => navigation.navigate('Mechanics')} style={{ height: 100, width: 100 }}>
              <Image source={require("../../../assets/mechanic.png")} style={styles.profileImg} />
            </Button>
            <Text style={styles.textStyle}>Mechanics</Text>
          </View>

          {/* Emergency Bubble */}
          <View style={{ flexDirection: 'column' }}>
            <Button transparent onPress={() => navigation.navigate('Emergency')} style={{ height: 100, width: 100 }}>
              <Image source={require("../../../assets/emergency.jpg")} style={styles.profileImg} />
            </Button>
            <Text style={styles.textStyle}>Emergency</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 15, justifyContent: "space-around" }}>

          {/* Tutorials Bubble */}
          <View>
            <Button transparent onPress={() => navigation.navigate('Tutorials')} style={{ alignSelf: 'center', height: 100, width: 100 }}>
              <Image source={require("../../../assets/tutorials.jpg")} style={styles.profileImg} />
            </Button>
            <Text style={styles.textStyle}>Tutorials</Text>
          </View>

          {/* Recommendations Bubble */}
          <View >
            <Button transparent style={{ alignSelf: 'center', height: 100, width: 100 }}>
              <Image source={require("../../../assets/recommendation.png")} style={styles.profileImg} />
            </Button>
            <Text style={styles.textStyle}>Recommendations</Text>
          </View>
        </View>


        {/* ads*/}
        <View >
          <Text style={{ fontSize: 32, color: 'darkred', fontWeight: 'bold', marginLeft: 5, marginTop: 30 }}>Advertisements</Text>
        </View>
        <View scrollEnabled style={{ textcolor: 'darkred', flexDirection: "row" }}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {ads.map((item, index) => {
              return (
                <AdvComponent
                  AD={item}
                  key={index}
                />
              )
            })}
          </ScrollView>
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'contain',
    borderWidth: 3,
    borderColor: 'darkred',

  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'darkred',
    marginTop: 3
  },
  title: {
    fontSize: 50,
    fontWeight: '500',
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: -20,
    color: 'darkred',
    textShadowColor: 'black',
    textShadowRadius: 2,
    textShadowOffset: {
      width: 2,
      height: 2
    }
  }
});

export default HomeScreen;