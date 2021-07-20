import React, { Component, useContext, useState, useEffect } from 'react';
import { Container, InputGroup, Header, Item, Icon, Input, Content, Left, Right, Title, Body, Footer, FooterTab, Button, Text, Badge } from 'native-base';
import { StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import AdvComponent from "../components/AdvComponent";
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from "@react-native-firebase/firestore";
import GetProfileIMGComponent from "../components/GetProfileIMGComponent";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({ navigation }) => {

  const { t, i18n } = useTranslation();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

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

  async function Get_Lang() {
    setLoading(true);
    await AsyncStorage.getItem('Language').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('Language', "en");
        i18n.changeLanguage("en");
      }
      else {
        i18n.changeLanguage(value);
      }
    });
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
      setLoading(false);
    });
  }

  useEffect(async () => {
    try {
      await Get_Lang();
      await Get_Ads();
    } catch (error) {
      console.log(error)
    }
  }, []);
  return (
    <Container>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5, marginBottom: 12, paddingBottom: 6, backgroundColor: "darkred" }}>
        <View style={{ width: 150, justifyContent: "center", flexDirection: "row" }}>
          <Image
            source={require('../../../assets/X-Damme_white.png')}
            style={styles.logo}
          />
        </View>

        <Button transparent style={{ height: 50, marginTop: 15 }} onPress={() => navigation.navigate('Cart')}>
          <Icon name='cart' style={{ fontSize: 24, marginRight: -6, color: 'white' }}></Icon>
          <Text style={{ color: "white", fontSize: 16, fontWeight: 'bold' }}>{t('UserHomeScreenTitle')}</Text>
        </Button>
      </View>
      {/* End Header */}

      {loading ? <Content><Text style={styles.loadingStyle}>{t('UserAddCarScreenTitleLoading')}</Text></Content>
        :
        <Content scrollEnabled>
          <GetProfileIMGComponent Color={"darkred"} />
          <Text style={styles.title}>{t('UserHomeScreenWelcome')}</Text>
          <View style={{ marginTop: 40, marginBottom: 50, flexDirection: "row", justifyContent: 'space-evenly' }}>

            {/* Car Items Bubble */}
            <View style={{ height: 100, width: 100 }}>
              <Button transparent onPress={() => navigation.navigate('Items')} style={{ height: 100, width: 100 }}>
                <Image source={require("../../../assets/parts.png")} style={styles.profileImg} />
              </Button>
              <Text style={styles.textStyle}>{t('UserHomeScreenCarParts')}</Text>
            </View>

            {/* Mechanics Bubble */}
            <View style={{ height: 100, width: 100 }}>
              <Button transparent onPress={() => navigation.navigate('Mechanics')} style={{ height: 100, width: 100 }}>
                <Image source={require("../../../assets/mechanic.png")} style={styles.profileImg} />
              </Button>
              <Text style={styles.textStyle}>{t('UserHomeScreenMechanics')}</Text>
            </View>

            {/* Emergency Bubble */}
            <View style={{ flexDirection: 'column' }}>
              <Button transparent onPress={() => navigation.navigate('Emergency')} style={{ height: 100, width: 100 }}>
                <Image source={require("../../../assets/emergency.jpg")} style={styles.profileImg} />
              </Button>
              <Text style={styles.textStyle}>{t('UserHomeScreenEmergency')}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginLeft: 15, justifyContent: "space-around" }}>

            {/* Tutorials Bubble */}
            <View>
              <Button transparent onPress={() => navigation.navigate('Tutorials')} style={{ alignSelf: 'center', height: 100, width: 100 }}>
                <Image source={require("../../../assets/tutorials.jpg")} style={styles.profileImg} />
              </Button>
              <Text style={styles.textStyle}>{t('UserHomeScreenTutorials')}</Text>
            </View>

            {/* Recommendations Bubble */}
            <View >
              <Button transparent style={{ alignSelf: 'center', height: 100, width: 100 }}
                onPress={() => navigation.navigate('Recommendation')}>
                <Image source={require("../../../assets/recommendation.png")} style={styles.profileImg} />
              </Button>
              <Text style={styles.textStyle}>{t('UserHomeScreenRecommendations')}</Text>
            </View>
          </View>


          {/* ads*/}
          {!ads.length == 0 ?
            <View >
              <Text style={{ fontSize: 32, color: 'darkred', fontWeight: 'bold', marginLeft: 5, marginTop: 30 }}>{t('UserHomeScreenAdvertisements')}</Text>
            </View>
            :
            null
          }
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
      }

      {/* Footer */}
      <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkred" }}>
        <FooterTab transparent style={{ backgroundColor: "darkred" }}>
          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Home')}>
            <Icon style={{ color: 'white' }} name="home" />
            <Text style={{ color: 'white' }}>{t('UserHomeScreenHome')}</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Profile')}>
            <Icon name="person" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }}>{t('UserHomeScreenProfile')}</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('ContactUs')}>
            <Icon style={{ color: 'white' }} name="call" />
            <Text style={{ color: 'white' }} >{t('UserHomeScreenContactUs')}</Text>
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
  },
  logo: {
    height: 50,
    width: 230,
    marginTop: 20,
    marginLeft: 40
  },
  loadingStyle: {
    color: 'darkred',
    alignSelf: 'center',
    fontSize: 22,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginTop: 180
  }
});

export default HomeScreen;