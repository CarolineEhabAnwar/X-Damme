import React, { Component, useState, useEffect, useRef, useContext } from 'react';
import { Image, StyleSheet, FlatList, LogBox, Alert } from 'react-native';
import { Container, FooterTab, Badge, InputGroup, Header, Content, List, Item, Input, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import FooterComponent from '../components/FooterComponent'
import { useTranslation } from 'react-i18next';


const MechServiceListScreen = () => {

  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [ShowServices, SetShowServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { t, i18n } = useTranslation();


  const Search = () => {
    if (search == "") {
      SetShowServices(services);
    }
    else {
      let temp = [];
      for (let i = 0; i < services.length; i++) {
        if (services[i].Type.toUpperCase().includes(search.toUpperCase())) {
          temp.push(services[i]);
        }
      }
      SetShowServices(temp);
    }
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('Services')
      .where('Mech_ID', '==', (user.uid))
      .onSnapshot(querySnapshot => {
        const temp_services = [];

        querySnapshot.forEach(documentSnapshot => {
          temp_services.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setServices(temp_services);
        SetShowServices(temp_services);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return (

    <Container >
      {/* Search bar with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 26, paddingBottom: 6, alignContent: "center", backgroundColor: "darkgreen", top: 0 }}>
        <Button transparent onPress={() => navigation.goBack()} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <InputGroup rounded style={{ flex: 1, backgroundColor: 'white', height: 35, marginTop: 7, paddingLeft: 10, paddingRight: 10 }}>
          <Icon name="ios-search" style={{ color: "darkgreen" }} />
          <Input style={{ height: 40, marginTop: 5, color: "darkgreen" }} placeholder={t('SOItemListScreenText1')} onChangeText={(SearchText) => { setSearch(SearchText) }} />
        </InputGroup>
        <Button transparent style={{ height: 50 }} onPress={() => Search()}>
          <Text style={{ color: "white", fontWeight: 'bold' }}>{t('SOItemListScreenText1')}</Text>
        </Button>
      </View>
      {/* End Search bar with drawer */}

      <Content>

        {loading ? <Text style={styles.loadingStyle}> {t('Loading Services')} </Text> :
          <View>
            {ShowServices.map((item, index) => {
              return (
                <ListItem key={index}>
                  <Body>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: '500', marginLeft: 2, marginRight: 50 }}>{item.Type}</Text>
                    </View>
                  </Body>
                  <Right>
                    <View style={{ flexDirection: 'row', justifyContent: "flex-start" }}>

                      {/* View Item Button */}
                      <Button transparent onPress={() => navigation.navigate('MechViewService',
                        {
                          item: item
                        }
                      )}>
                        <Text style={{ color: 'green' }}>{t('SOItemListScreenText3')}</Text>
                      </Button>
                      {/* End View Item Button */}

                      <Button transparent onPress={() => navigation.navigate('MechEditService', {
                        type: item.Type,
                        price: item.Price,
                        days: item.Days,
                        start_time: item.Start_Time,
                        end_time: item.End_Time,
                        duration: item.Duration,
                        serviceID: item.key
                      })}>
                        <Text style={{ color: 'blue' }}>{t('SOItemListScreenText4')}</Text>
                      </Button>

                      <Button transparent onPress={() =>
                        Alert.alert(
                          t('UserChangeEmailAddressScreenAlert2'),
                          t('MechServiceListScreenText1'),
                          [
                            {
                              text: t('UserChangeNameScreenAlert4')
                            },
                            {
                              text: t('UserChangeNameScreenAlert5'), onPress: () => {
                                firestore()
                                  .collection('Services')
                                  .doc(item.key)
                                  .delete()
                                  .then(() => {
                                    alert(t('MechServiceListScreenText2'));
                                  });
                              }
                            }
                          ]
                        )
                      }>
                        <Text style={{ color: 'red', width: 85 }}>{t('SOItemListScreenText5')}</Text>
                      </Button>
                    </View>
                  </Right>
                </ListItem>
              );
            })
            }
          </View>
        }
      </Content>

      <FooterComponent
        home="MechHome"
        profile="MechProfile"
        contactus="MechContactUs"
        bkcolor="darkgreen"
      />

    </Container>
  );
}

export default MechServiceListScreen;

const styles = StyleSheet.create({
  IconStyle: {
    color: 'darkgreen',
    marginLeft: -30
  },
  textStyles: {
    fontWeight: '500'
  },
  loadingStyle: {
    color: 'darkgreen',
    alignSelf: 'center',
    fontSize: 22,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginTop: 180
  }
});


