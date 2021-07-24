import React, { Component, useState } from 'react';
import { Image, StyleSheet, FlatList, LogBox, ToastAndroid } from 'react-native';
import { Container, FooterTab, Badge, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View } from 'native-base';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation-drawer';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useTranslation } from 'react-i18next';

const SORequestCardComponent = (props) => {

  const { t, i18n } = useTranslation();
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  LogBox.ignoreLogs(['VirtualizedList: missing keys for items']);

  const navigation = useNavigation();

  let Date_Of_Request = new Date((props.Data.Request_Made_In_Date.nanoseconds / 1000) + (props.Data.Request_Made_In_Date.seconds * 1000));
  let S_Date_Of_Request = Date_Of_Request.getDate() + "/" + (Date_Of_Request.getMonth() + 1) + "/" + Date_Of_Request.getFullYear();

  let Date_Of_Due = new Date((props.Data.Request_Expected_Due_Date.nanoseconds / 1000) + (props.Data.Request_Expected_Due_Date.seconds * 1000));
  let S_Date_Of_Due = Date_Of_Due.getDate() + "/" + (Date_Of_Due.getMonth() + 1) + "/" + Date_Of_Due.getFullYear();

  async function Accept() {
    try {
      await firestore().collection("Requests").doc(props.ID).update({
        Status: "Accepted",
        Request_Expected_Due_Date: firestore.Timestamp.fromDate(new Date((props.Data.Request_Made_In_Date.nanoseconds / 1000) + (props.Data.Request_Made_In_Date.seconds * 1000) + 604800000)),
      })
      ToastAndroid.show(
        t('SORequestCardComponentText1'),
        ToastAndroid.SHORT
      );
      props.RefreshParent();
    } catch (error) {
      console.log(error);
    }
  }

  async function Decline() {
    try {
      await firestore().collection("Requests").doc(props.ID).update({
        Status: "Declined",
        Request_Expected_Due_Date: "Declined",
      })
      ToastAndroid.show(
        t('SORequestCardComponentText2'),
        ToastAndroid.SHORT
      );
      props.RefreshParent();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card style={{ flex: 0, borderColor: 'darkblue' }}>
      <CardItem style={{ marginHorizontal: 1 }}>
        <Body>
          <Text style={styles.title}> {t('SORequestCardComponentText3')}  </Text>
          <Text style={styles.writing}> {props.ID} </Text>
          <Text style={styles.title}> {t('SORequestCardComponentText4')}  </Text>
          <FlatList
            data={props.Data.Items_And_Quantites}
            renderItem={({ item }) => {
              return (
                <Text style={styles.writing}> {t('SORequestCardComponentText5')}: {item.split("/")[0]} ,{t('SORequestCardComponentText6')}: {item.split("/")[1]} ,{t('SORequestCardComponentText7')}: {item.split("/")[2]} </Text>
              )
            }}
          />
          <Text style={styles.title}> {t('SORequestCardComponentText8')} </Text>
          <Text style={styles.writing}> {props.Data.User_Name}</Text>
          <Text style={styles.title}> {t('SORequestCardComponentText9')} </Text>
          <Text style={styles.writing}> {props.Data.Total_Price} {t('SORequestCardComponentText10')} </Text>
          <Text style={styles.title}> {t('SORequestCardComponentText11')} </Text>
          <Text style={styles.writing}> {props.Data.Status} </Text>
          <Text style={styles.title}> {t('SORequestCardComponentText12')} </Text>
          <Text style={styles.writing}> {S_Date_Of_Request} </Text>
          <Text style={styles.title}> {t('SORequestCardComponentText13')} </Text>
          <Text style={styles.writing}> {S_Date_Of_Due} </Text>

          {!props.Editing ? null :
            <View style={{ flexDirection: 'row',alignSelf:'center', marginTop: 17}}>
              {/* Accept */}
              <Button style={{  backgroundColor: 'green' }}
                onPress={() => { Accept() }}
              >
                <Text style={styles.buttonTextStyle}>{t('SORequestCardComponentText14')}</Text>
              </Button>

              {/* Decline */}
              <Button style={{ marginLeft: 30, backgroundColor: '#eb1c1c' }}
                onPress={() => { Decline() }}
              >
                <Text style={styles.buttonTextStyle}>{t('SORequestCardComponentText15')}</Text>
              </Button>
            </View>
          }
        </Body>
      </CardItem>
    </Card>
  )
}

export default SORequestCardComponent;

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'darkblue',
    textShadowRadius: 1.5,
    textShadowOffset: {
      width: 0,
      height: 0
    },
    marginBottom: 10

  },

  buttonStyle: {
    marginTop: 7,
    marginLeft: 'auto',
    backgroundColor: 'darkblue',
  },

  buttonTextStyle: {
    fontWeight: 'bold'
  },
  writing: {
    marginHorizontal: 15,
    marginVertical: 10,
    fontSize: 17,
    fontWeight: "bold"
  }, title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "darkblue",
    textAlign: "left",
    fontWeight: 'bold',
    marginLeft: 10
  },
})