import React, { Component, useState, useEffect, useRef, useContext } from 'react';
import { Image, StyleSheet, FlatList, LogBox, Alert } from 'react-native';
import { Container, FooterTab, Badge, InputGroup, Header, Content, List, Item, Input, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import FooterComponent from '../components/FooterComponent';


const SOItemListScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [SOItems, setSOItems] = useState([]);
  const [ShowItems, SetShowItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');


  const Search = () => {
    if (search == "") {
      SetShowItems(SOItems);
    }
    else {
      let temp = [];
      for (let i = 0; i < SOItems.length; i++) {
        if (SOItems[i].Name.toUpperCase().includes(search.toUpperCase())) {
          temp.push(SOItems[i]);
        }
      }
      SetShowItems(temp);
    }
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('CarStuff')
      .where('Shop_Owner_ID', '==', (user.uid))
      .onSnapshot(querySnapshot => {
        const temp_SOItems = [];

        querySnapshot.forEach(documentSnapshot => {
          temp_SOItems.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setSOItems(temp_SOItems);
        SetShowItems(temp_SOItems);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return (

    <Container >
      {/* Search bar with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 26, paddingBottom: 6, alignContent: "center", backgroundColor: "darkblue", top: 0 }}>
        <Button transparent onPress={() => navigation.goBack()} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <InputGroup rounded style={{ flex: 1, backgroundColor: 'white', height: 35, marginTop: 7, paddingLeft: 10, paddingRight: 10 }}>
          <Icon name="ios-search" style={{ color: "darkblue" }} />
          <Input style={{ height: 40, marginTop: 5, color: "darkblue" }} placeholder="Search" onChangeText={(SearchText) => { setSearch(SearchText) }} />
        </InputGroup>
        <Button transparent style={{ height: 50 }} onPress={() => Search()}>
          <Text style={{ color: "white", fontWeight: 'bold' }}>Search</Text>
        </Button>
      </View>
      {/* End Search bar with drawer */}

      <Content>

        {loading ? <Text style={styles.loadingStyle}> Loading Items... </Text> :
          <View>
            {ShowItems.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <Body>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: '500', marginLeft: 2, marginRight: 50 }}>{item.Name}</Text>
                      </View>
                    </Body>
                    <Right>
                      <View style={{ flexDirection: 'row', justifyContent: "flex-start" }}>

                        {/* View Item Button */}
                        <Button transparent onPress={() => navigation.navigate('SOViewItem',
                          {
                            Item: item
                          }
                        )}>
                          <Text style={{ color: 'green' }}>View</Text>
                        </Button>
                        {/* End View Item Button */}

                        <Button transparent onPress={() => navigation.navigate('SOEditItem', {
                          imagePath: item.Image_Path,
                          name: item.Name,
                          price: item.Price,
                          quality: item.Quality,
                          manf_date: item.Manufacture_Date,
                          made_in: item.Made_In,
                          car_model: item.Car_Model,
                          car_brand: item.Car_Brand,
                          type: item.Type,
                          itemID: item.key
                        })}>
                          <Text style={{ color: 'blue' }}>Edit</Text>
                        </Button>

                        <Button transparent onPress={() =>
                          Alert.alert(
                            "Warning",
                            "Are you sure you want to delete this item?",
                            [
                              {
                                text: "No"
                              },
                              {
                                text: "Yes", onPress: () => {
                                  firestore()
                                    .collection('CarStuff')
                                    .doc(item.key)
                                    .delete()
                                    .then(() => {
                                      alert("Item deleted");
                                    });
                                }
                              }
                            ]
                          )
                        }>
                          <Text style={{ color: 'red', width: 85 }}>Delete</Text>
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

      <FooterComponent home="SOHome" profile="SOProfile" contactus="SOContactUs" bkcolor="darkblue" />

    </Container>
  );
}


const styles = StyleSheet.create({
  IconStyle: {
    color: 'darkblue',
    marginLeft: -30
  },
  textStyles: {
    fontWeight: '500'
  },
  loadingStyle: {
    color: 'darkblue',
    alignSelf: 'center',
    fontSize: 22,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginTop: 180
  }
});

export default SOItemListScreen;
