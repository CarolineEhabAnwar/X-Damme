import React, { Component,useState } from 'react';
import { Image,StyleSheet,View } from 'react-native';
import { Container,FooterTab,Footer,Badge,InputGroup,Input, Header, Content, Card, Icon, CardItem,Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5,Ionicons } from '@expo/vector-icons'; 
import Modal from 'react-native-modal';

export default class ItemDetailsScreen extends Component {
  render() {
    let home_notification = 5;
    let profile_notification = 5;
    let settings_notification = 5;
    return (
      <Container>
        
        {/* Text with drawer */}
        <View searchBar style={{flexDirection: 'row', paddingTop:25 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
        <Button transparent onPress={() => this.props.navigation.navigate('Items')} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
        </Button>
        <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'21%',paddingTop:12, fontWeight:'bold'}}>Item Details</Text> 
      </View>
      {/* End Text with drawer */}
      <Content>
          <Card style={{marginTop:0,flex: 0}}>
            <Image source={require("../../../assets/mirror.jpg")} style={{marginBottom:20,height: 200, width: null}}/>
              <CardItem style={{marginHorizontal:1,borderWidth:3,borderColor:'darkred'}}>
                <Body>
                  <Text style={styles.textStyles}>Name: -</Text>
                  <Text style={styles.textStyles}>Price: -</Text>
                  <Text style={styles.textStyles}>Car Brand: -</Text>
                  <Text style={styles.textStyles}>Car Model: -</Text>
                  <Text style={styles.textStyles}>Quality: -</Text>
                  <Text style={styles.textStyles}>Made In: -</Text>
                  <Text style={styles.textStyles}>Manufacture Date: -</Text>
                  <Text style={styles.textStyles}>Sold By: -</Text>
                  <View style={{flexDirection:'row',alignSelf:'center'}}>
                    <Button style={styles.buttonStyle}>
                      <Icon style={{marginRight:-6}} name="pencil-outline"></Icon>
                      <Text style={styles.buttonTextStyle}>Review</Text>
                    </Button>
                    <Button style={styles.buttonStyle}>
                      <Icon style={{marginRight:-6}} name="cart"></Icon>
                      <Text style={styles.buttonTextStyle}>Buy Now</Text>
                    </Button>
                  </View>
                </Body>
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
  textStyles:{
    fontSize:20,
    marginBottom:4,
    fontWeight:'bold',
    color:'black',
    textShadowColor: 'darkred',
    textShadowRadius: 1.5,
     textShadowOffset: { 
        width: 0.5,
        height: 0.5
      },
    marginBottom:10
    
  },

  buttonStyle:{
    marginTop:7,
    backgroundColor:'darkred',
    marginRight:10
  },

  buttonTextStyle:{
    fontWeight:'bold'
  }
})