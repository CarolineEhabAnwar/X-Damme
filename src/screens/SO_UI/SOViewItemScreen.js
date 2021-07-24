import React, { Component } from 'react';
import { Image, StyleSheet, Alert } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Container, FooterTab, Content, Card, CardItem, Text, Button, Icon, Body, View } from 'native-base';
import FooterComponent from '../components/FooterComponent'
import { useTranslation } from 'react-i18next';
import firestore from "@react-native-firebase/firestore";

const SOViewItemScreen = ({ navigation, route }) => {

  const { t, i18n } = useTranslation();

  return (
    <Container>
      {/* Search bar with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 26, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkblue", top: 0 }}>
        <Button transparent onPress={() => navigation.goBack()} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '20%', paddingTop: 12, fontWeight: 'bold' }}>{t('SOViewItemText11')}</Text>
      </View>
      {/* End Search bar with drawer */}

      <Content>
        <Card style={{ flex: 0 }}>
          <Image source={{ uri: route.params.Item.Image_Path }} style={{ marginBottom: 20, height: 200, width: null }} />
          <CardItem style={{ marginHorizontal: 1, borderWidth: 3, borderColor: 'darkblue' }}>
            <Body>

              <Text style={styles.textStyles}>{t('SOEditItemScreenText4')}</Text>
              <Text style={styles.itemsTextStyle}>{route.params.Item.Name}</Text>

              {route.params.Item.InOffer == "true" ?
                <View>
                  <Text style={styles.textStyles}>{t('SOEditItemScreenText5')}</Text>
                  <Text style={{ fontSize: 19, marginBottom: 10, fontWeight: 'bold', textDecorationLine: 'line-through' }}>{route.params.Item.Price}</Text>
                  <Text style={styles.itemsTextStyle}>{route.params.Item.After_Price}</Text>
                </View>
                :
                <View>
                  <Text style={styles.textStyles}>{t('SOEditItemScreenText5')}</Text>
                  <Text style={styles.itemsTextStyle}>{route.params.Item.Price}</Text>
                </View>
              }

              <Text style={styles.textStyles}>{t('SOViewItemText1')}</Text>
              <Text style={styles.itemsTextStyle}>{route.params.Item.Quality}</Text>

              <Text style={styles.textStyles}>{t('SOEditItemScreenText10')}</Text>
              <Text style={styles.itemsTextStyle}>{route.params.Item.Manufacture_Date}</Text>

              <Text style={styles.textStyles}>{t('SOEditItemScreenText6')}</Text>
              <Text style={styles.itemsTextStyle}>{route.params.Item.Made_In}</Text>

              <Text style={styles.textStyles}>{t('SOViewItemText2')}</Text>
              <Text style={styles.itemsTextStyle}>{route.params.Item.Car_Brand}</Text>

              <Text style={styles.textStyles}>{t('SOViewItemText3')}</Text>
              <Text style={styles.itemsTextStyle}>{route.params.Item.Car_Model}</Text>

              <Text style={styles.textStyles}>{t('SOViewItemText4')}</Text>
              <Text style={styles.itemsTextStyle}>{route.params.Item.key}</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 17, alignSelf: 'center' }}>
                {/* Edit */}
                <Button style={{ marginLeft: 30, backgroundColor: 'darkblue' }}
                  onPress={() => navigation.navigate('SOEditItem', {
                    imagePath: route.params.Item.Image_Path,
                    name: route.params.Item.Name,
                    price: route.params.Item.Price,
                    quality: route.params.Item.Quality,
                    manf_date: route.params.Item.Manufacture_Date,
                    made_in: route.params.Item.Made_In,
                    car_model: route.params.Item.Car_Model,
                    car_brand: route.params.Item.Car_Brand,
                    type: route.params.Item.Type,
                    itemID: route.params.Item.key
                  })}>
                  <Text style={styles.buttonTextStyle}>{t('SOEditItemScreenText22')}</Text>
                </Button>

                {/* Delete */}
                <Button transparent style={{ marginLeft: 30, backgroundColor: '#eb1c1c' }} onPress={() =>
                  Alert.alert(
                    t('SOViewItemText5'),
                    t('SOViewItemText6'),
                    [
                      {
                        text: t('SOViewItemText7')
                      },
                      {
                        text: t('SOViewItemText8'), onPress: () => {
                          firestore()
                            .collection('CarStuff')
                            .doc(route.params.Item.key)
                            .delete()
                            .then(() => {
                              alert(t('SOViewItemText9'));
                            });
                            navigation.navigate('SOItemList')
                        }
                      }
                    ]
                  )
                }>
                  <Text style={{ fontWeight: 'bold', color: 'white' }}>{t('SOViewItemText10')}</Text>
                </Button>
              
              </View>
            </Body>
          </CardItem>
        </Card>
      </Content>

      <FooterComponent home="SOHome" profile="SOProfile" contactus="SOContactUs" bkcolor="darkblue" />

    </Container>
  );
}

export default SOViewItemScreen;

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'blue',
    textShadowRadius: 1.5,
    textShadowOffset: {
      width: 0.5,
      height: 0.5
    },
  },

  itemsTextStyle: {
    fontSize: 19,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  buttonStyle: {
    marginTop: 7,
    marginLeft: 'auto',
    backgroundColor: 'darkblue',
  },

  buttonTextStyle: {
    fontWeight: 'bold'
  }
})
