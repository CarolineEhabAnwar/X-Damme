import React, { Component, useState, useEffect, useRef } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, FooterTab, FlatList, Badge, InputGroup, Header, Content, List, Item, Input, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation-drawer';
import SOItemListComponent from "../components/SOItemListComponent.js"
import db from '../../../android/app/google-services.json';
import firestore from '@react-native-firebase/firestore';

const useConstructor = (callBack = () => { }) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
  console.log(hasBeenCalled.current);
}

const SOItemListScreen = ({ navigation }) => {

  let itemComponent;
  const [Items_List, setItems_List] = useState([]);
  const Temp_List = [];


  useConstructor(async () => {
    let home_notification = 5;
    let profile_notification = 5;
    let settings_notification = 5;

    const Items = await firestore().collection('CarStuff').get();
    Items.forEach((doc) => {
      // setItems_List(doc.data());
      Items_List.push(doc.data())
    });

    console.log(Items_List);
    isFinished = true;
    console.log(isFinished);
    setItems_List([...Temp_List]);
    console.log(Items_List[0].Name);
    if (isFinished)
      itemComponent = 
    <FlatList
      data={Items_List}
      // keyExtractor={item => item.id}
      renderItem={(item) => {
        return (<SOItemListComponent title={item.Name} />);
      }} />
    else
      itemComponent = <Text>No Items Available</Text>
  });




  // const Temp_List = [];
  // const Items_List = items;
  // let isFinished = false;

  // // const Items_List = [];
  // const [Items_List, setItems_List] = useState([]);


  // const Get_Items = async () => {
  //   const Items = await firestore().collection('CarStuff').get();
  //   Items.forEach((doc) => {
  //     // setItems_List(doc.data());
  //     Items_List.push(doc.data())
  //   });

  //   console.log(Items_List);
  //   isFinished = true;
  //   console.log(isFinished);
  //   setItems_List([...Temp_List]);
  //   console.log(Items_List[0].Name);
  //   if (isFinished)
  //   itemComponent = <Text>Items Available</Text>
  //   // <FlatList
  //   //   data={Items_List}
  //   //   keyExtractor={item => item.id}
  //   //   renderItem={(item) => {
  //   //     return (<SOItemListComponent title={item.Name} />);
  //   //   }} />
  // else
  //   itemComponent = <Text>No Items Available</Text>
  // }

  // useEffect(() => {
  //   Get_Items();
  // }, []);


  return (
    <Container >
      {/* Search bar with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 26, paddingBottom: 6, alignContent: "center", backgroundColor: "darkblue", top: 0 }}>
        <Button transparent onPress={() => navigation.navigate('SOHome')} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <InputGroup rounded style={{ flex: 1, backgroundColor: 'white', height: 35, marginTop: 7, paddingLeft: 10, paddingRight: 10 }}>
          <Icon name="ios-search" style={{ color: "darkblue" }} />
          <Input style={{ height: 30, marginTop: -5, color: "white" }} place placeholder="Search Item" />
        </InputGroup>
        <Button transparent style={{ height: 50 }} onPress={() => null}>
          <Text style={{ color: "white", fontWeight: 'bold' }}>Search</Text>
        </Button>
      </View>
      {/* End Search bar with drawer */}

      <Content>
        {itemComponent}
      </Content>

      {/* Item 1
            <ListItem>
              <Body>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight:'500',marginLeft:2, marginRight:50}}>Verna door</Text>
                </View>
              </Body>
              <Right>
                <View style={{flexDirection:'row', justifyContent: "flex-start"}}>
                    <Button transparent onPress={() => this.props.navigation.navigate('SOViewItem')}>
                      <Text style={{color: 'blue'}}>View</Text>
                    </Button>

                    <Button transparent onPress={() => this.props.navigation.navigate('SOEditItem')}>
                      <Text style={{color: 'green'}}>Edit</Text>
                    </Button>

                    <Button transparent>
                      <Text style={{color: 'red', width: 80}}>Delete</Text>
                    </Button>
                </View>
              </Right>
            </ListItem> */}

      {/* Item 2 */}
      {/* <ListItem>
              <Body>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight:'500',marginLeft:2,marginRight:50}}>Logan Mirror</Text>
                </View>
              </Body>
              <Right>
                <View style={{flexDirection:'row'}}>
                    <Button transparent onPress={() => this.props.navigation.navigate('SOViewItem')}>
                      <Text style={{color: 'blue'}}>View</Text>
                    </Button>

                    <Button transparent onPress={() => this.props.navigation.navigate('SOEditItem')}>
                      <Text style={{color: 'green'}}>Edit</Text>
                    </Button>

                    <Button transparent>
                      <Text style={{color: 'red', width: 80}}>Delete</Text>
                    </Button>
                </View>
              </Right>
            </ListItem>
          </List> 
        </Content>  */}

      {/* Footer */}
      <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkblue" }}>
        <FooterTab transparent style={{ backgroundColor: "darkblue" }}>
          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('SOHome')}>
            <Icon style={{ color: 'white' }} name="home" />
            <Text style={{ color: 'white' }}> Home</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('SOProfile')}>
            <Icon name="person" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }}>Profile</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('SOContactUs')}>
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
  IconStyle: {
    color: 'darkblue',
    marginLeft: -30
  },
  textStyles: {
    fontWeight: '500'
  }
});

export default SOItemListScreen;
