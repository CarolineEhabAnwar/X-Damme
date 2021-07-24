import React, { Component, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Container, Content, Text, Button, List, ListItem } from 'native-base';
import FooterComponent from '../components/FooterComponent'
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const MechSettingsScreen = ({ navigation }) => {

  const home = 'MechHome'
  const profile = 'MechProfile'
  const contactus = 'MechContactUs'
  const color = 'darkgreen'

  const { t, i18n } = useTranslation();

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
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '27%', paddingTop: 12, fontWeight: 'bold' }}>{t("UserSettingsScreenText1")}</Text>
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
              <Text style={{ color: 'darkgreen', fontSize: 18, fontWeight: '500' }}>{t("UserSettingsScreenText2")}</Text>
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
              <Text style={{ color: 'darkgreen', fontSize: 18, fontWeight: '500' }}>{t("UserSettingsScreenText3")}</Text>
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
              <Text style={{ color: 'darkgreen', fontSize: 18, fontWeight: '500' }}>{t("UserSettingsScreenText4")}</Text>
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
              <Text style={{ color: color, fontSize: 18, fontWeight: '500' }}>{t("UserSettingsScreenText5")}</Text>
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
              <Text style={{ color: 'darkgreen', fontSize: 18, fontWeight: '500' }}>{t("UserSettingsScreenText6")}</Text>
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
              <Text style={{ color: color, fontSize: 18, fontWeight: '500' }}>{t("UserSettingsScreenText7")}</Text>
            </Button>
          </ListItem>

          <ListItem>
            <Button transparent onPress={() => {
              navigation.navigate('GoPremium', {
                Color: color,
                Home: home,
                Profile: profile,
                ContactUs: contactus
              })
            }}>
              <MaterialCommunityIcons name="crown-outline" style={{ marginRight: -5 }} size={26} color={color} />
              <Text style={{ color: color, fontSize: 18, fontWeight: '500' }}>Go Premium</Text>
            </Button>
          </ListItem>

          <ListItem style={{ justifyContent: "center" }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={styles.language}
                onPress={() => {
                  i18n.changeLanguage('en');
                  AsyncStorage.setItem('Language', "en");
                }}>
                <Text style={styles.langText}>
                  English
                </Text>
              </TouchableOpacity>
              <Text style={styles.language}> | </Text>
              <TouchableOpacity
                style={styles.langauge}
                onPress={() => {
                  i18n.changeLanguage('ar');
                  AsyncStorage.setItem('Language', "ar");
                }}>
                <Text style={styles.langText}>
                  العربية
                </Text>
              </TouchableOpacity>
            </View>
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
  ,
  langText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'darkgreen',
  },
})