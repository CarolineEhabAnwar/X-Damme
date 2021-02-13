import React, { Component,useState } from 'react';
import {  Alert, Modal, StyleSheet, Pressable, View, Image} from 'react-native';
import { Container, InputGroup,FooterTab,Footer,Badge, Header,Item,Input, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { FontAwesome5,Ionicons } from '@expo/vector-icons'; 
import StarRating from 'react-native-star-rating';
import { DrawerActions } from 'react-navigation-drawer';
import { NavigationActions } from 'react-navigation';

export default class ItemsScreen extends Component {

  render() {

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
          <Input style={{height:30,marginTop:-5, color: "darkred"}} place placeholder="Search" />
        </InputGroup>
        <Button transparent style={{height:50}} onPress={() => null}>
        <Text style={{color: "white",fontWeight:'bold'}}>Search</Text> 
      </Button>
      </View>
      {/* End Search bar with nav back */}

      <Content>
      {/* Filter Button */}
        <Button rounded style={{marginLeft:5,marginBottom:5,backgroundColor:'darkred'}}>
          <Icon name='filter' /> 
          <Text style={{marginLeft:-27}}> Filter </Text>
        </Button>
      {/* End filter button */}
          <Card style={{borderRadius:3}}>
            <CardItem>
              <Left>
                <Body style={{marginBottom:8}}>
                  <Text style={{fontWeight:'bold',fontSize:18}}>Mirror</Text>
                  <Text  style={{fontWeight:'bold'}} note>Hyundai Accent 2009</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={require("../../../assets/mirror.jpg")} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active style={{ color:"darkred"}} name="person" />
                  <Text style={{marginLeft:-10,fontWeight:'bold',marginTop:5,color:'darkred',fontSize:15}}>Seller X</Text>
                </Button>
              </Left>
              <Body>
                <View style={{flexDirection:'row'}}>
                <FontAwesome5 name="coins" size={20} color="black" style={{marginTop:14,marginLeft:17}}/>
                <Text style={styles.textStyle}>2000 EGP</Text>
                </View>
              </Body>
              <Right>
              <Button style={styles.cartItemStyle} large style={{height:30,marginRight:3}} transparent>
                <FontAwesome5 name="shopping-cart" style={{ color:"darkred",marginRight:3,marginTop:3}} size={20} color="black" />
                </Button>
              </Right>
            </CardItem>
            <CardItem style={{marginLeft:'auto'}}>
              <Left>
                <Text style={styles.rateStyle}> Rate </Text>
              </Left>
              <Right>
              <Button style={styles.cartItemStyle} transparent onPress={() => this.props.navigation.navigate('ItemDetails')}>
                  <Text style={{fontSize: 16,fontWeight:'bold',marginRight:-15,color:'darkred'}}> See Item Details </Text>
                  <Icon active style={{fontSize: 25, color: 'darkred'}} name="arrow-forward" />
                </Button>
              </Right>
            </CardItem>
          </Card>
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
