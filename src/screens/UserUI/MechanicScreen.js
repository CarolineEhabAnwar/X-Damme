import React, { Component, useState, useEffect } from 'react';
import { Image, StyleSheet, View,FlatList,LogBox } from 'react-native';
import { Container, FooterTab, Badge, InputGroup, Header, Item, Input, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import FooterComponent from '../components/FooterComponent'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";
import MechanicComponent from '../components/MechanicComponent'


const MechanicScreen = ({navigation}) => {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  const [mechanics, setMechanics] = useState([])
  const [show_mechanics,set_show_mechanics] = useState([])
  const [loading, setloading] = useState(true)
  const [search,setSearch] = useState('');

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .where('type', '==', ('Mechanic'))
      .onSnapshot(querySnapshot => {
        const temp_mechanics = [];

        querySnapshot.forEach(documentSnapshot => {
          temp_mechanics.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setMechanics(temp_mechanics);
        set_show_mechanics(temp_mechanics);
        setloading(false);
      });
    
    return () => subscriber();    
  }, []);

  
  const searchMechanics = () =>{
    if(search==""){
      set_show_mechanics(mechanics);
    }
    else{
      let temp = [];
      for(let i = 0;i<mechanics.length;i++){
        if( mechanics[i].fname.toUpperCase().includes(search.toUpperCase()) || 
        mechanics[i].lname.toUpperCase().includes(search.toUpperCase())){
          temp.push(mechanics[i]);
        }
      }
      set_show_mechanics(temp);
    }
  }


  return (
    <Container>
      {/* Item Card */}
      {/* Search bar with nav back */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
        <Button transparent onPress={() => navigation.goBack()} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <InputGroup rounded style={{ flex: 1, backgroundColor: '#fff', height: 35, marginTop: 7, paddingLeft: 10, paddingRight: 10 }}>
          <Icon name="ios-search" style={{ color: "darkred" }} />
          <Input style={{ height: 45, color: "darkred" }} placeholder="Search Mechanic" onChangeText={(searchTxt)=>{setSearch(searchTxt)}}/>
        </InputGroup>
        <Button transparent style={{ height: 50 }} onPress={ () => searchMechanics()}>
          <Text style={{ color: "white", fontWeight: 'bold' }}>Search</Text>
        </Button>
      </View>
      {/* End Search bar with nav back */}


      <Content>

        {/* Item Card */}
        {loading ? <Text style={styles.loadingStyle}> Loading Mechanics... </Text> :
          <FlatList
            data={show_mechanics}
            renderItem={({ item }) => {
              return (
                <MechanicComponent
                  fname={item.fname}
                  lname={item.lname}
                  address={item.address}
                  mechID={item.key}
                />);
            }}
          />
        }
      </Content>

      <FooterComponent
        home="Home"
        profile="Profile"
        contactus="ContactUs"
        bkcolor="darkred"
      />
    </Container>
  );
}

export default MechanicScreen

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 13,
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  cartItemStyle: {
    marginTop: -4,
    marginRight: 3
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