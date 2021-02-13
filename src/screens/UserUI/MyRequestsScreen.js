import React, { Component,useState } from 'react';
import { Image,StyleSheet,View } from 'react-native';
import { Container,FooterTab, Content, Icon,Text, Button,List, ListItem } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5,Ionicons,Foundation,MaterialCommunityIcons,Entypo  } from '@expo/vector-icons'; 
import Modal from 'react-native-modal';

export default class MyRequestsScreen extends Component {
  render() {
    let home_notification = 5;
    let profile_notification = 5;
    let settings_notification = 5;
    return (
      <Container>
        
        {/* Text with drawer */}
        <View searchBar style={{flexDirection: 'row', paddingTop:25 , marginBottom: 0, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
        <Button transparent onPress={() => this.props.navigation.navigate('Profile')} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
        </Button>
        <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'21%',paddingTop:12, fontWeight:'bold'}}>My Requests</Text> 
      </View>
      {/* End Text with drawer */}
      <Content>
          <List>
            <ListItem>
              
                <Text style={{color:'darkred',fontSize:18,fontWeight:'500'}}>Renault Logan Mirror</Text>
              

              <Button transparent style={{marginLeft:'auto'}}  onPress={() => this.props.navigation.navigate('MyRequestsDetails')}>
                    <Text style={{color:'blue',fontSize:18,fontWeight:'500'}}>View</Text>
              </Button>

            </ListItem>

          </List>
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