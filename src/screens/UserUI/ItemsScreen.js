import React, { Component,useState,useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Pressable, View, Image,FlatList} from 'react-native';
import { Container, InputGroup,FooterTab,Footer,Badge, Header,Item,Input, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {Ionicons} from '@expo/vector-icons'; 
import firestore from "@react-native-firebase/firestore";
import ItemComponent from '../components/ItemComponent'

const ItemsScreen = () => {

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [items, setItems] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firestore()
      .collection('CarStuff')
      .onSnapshot(querySnapshot => {
        const items = [];
  
        querySnapshot.forEach(documentSnapshot => {
          items.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setItems(items);
        setLoading(false);
      });
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  // console.log(items[0].fname)

  return (
      <Container>
        {/* Item Card */}
        {/* Search bar with nav back */}
        <View searchBar style={{flexDirection: 'row', paddingTop:25 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
        <Button transparent onPress={() => this.props.navigation.navigate('Home')} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
            </Button>
        <InputGroup rounded style={{flex:1,backgroundColor:'#fff',height:35,marginTop:7, paddingLeft:10, paddingRight:10}}>
          <Icon name="ios-search" style={{color: "darkred"}} />
          <Input style={{height:40,marginTop:5, color: "darkred"}} placeholder="Search" />
        </InputGroup>
        <Button transparent style={{height:50}} onPress={() => null}>
        <Text style={{color: "white",fontWeight:'bold'}}>Search</Text> 
      </Button>
      </View>
      {/* End Search bar with nav back */}
      <Content>
      {/* Filter Button */}
        <Button rounded style={{marginLeft:5,marginBottom:5,backgroundColor:'darkred'}} >
          <Icon name='filter' /> 
          <Text style={{marginLeft:-27}}> Filter </Text>
        </Button>
      {/* End filter button */}


    <FlatList
      data={items}
      renderItem={({ item }) => {
         return(    
         <ItemComponent 
          itemName ={item.Name}
          carBrand={item.Car_Brand}
          carModel={item.Car_Model}
          price={item.Price}
          itemImg={require(item.Image_Path)}
          />);
      }}
    />


      
        
      </Content>
      {/* Footer */}
        <View style={{flexDirection: 'row',alignContent:"center", backgroundColor: "darkred"}}>
          <FooterTab transparent style={{backgroundColor: "darkred"}}>
            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('Home')}>
              <Icon style={{color:'white'}} name="home" />
              <Text style={{color:'white'}}> Home</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('Profile')}>
              <Icon name="person" style={{color:'white'}}/>
              <Text style={{color:'white'}}>Profile</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('ContactUs')}>
              <Icon style={{color:'white'}} name="call" />
              <Text style={{color:'white'}} >Contact Us</Text>
            </Button>
          </FooterTab>
        </View>
        {/* End Footer */}
      </Container>
    );
}

const styles = StyleSheet.create({
  textStyle:{
    marginTop:16,
    fontSize:15,
    marginLeft:8,
    fontWeight:'bold',
    color:'black'
  },

  cartItemStyle:{
    marginTop:-23,
    marginBottom:-10,
    marginRight:3
  },
  rateStyle:{
    marginTop:-23,
    marginBottom:-9,
    marginRight:3,
    fontSize: 16,
    marginLeft:0,
    fontWeight:'bold',
    color:'black'
  }
})

export default ItemsScreen;