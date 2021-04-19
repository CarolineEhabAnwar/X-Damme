import React, { Component,useState } from 'react';
import { Image,StyleSheet,View } from 'react-native';
import { Container,FooterTab, Content, Icon,Text, Button,List, ListItem } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5,Ionicons,Foundation,MaterialCommunityIcons,Entypo  } from '@expo/vector-icons'; 
import Modal from 'react-native-modal';

const SettingsScreen = () => {

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
        <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'25%',paddingTop:12, fontWeight:'bold'}}>Settings</Text> 
      </View>
      {/* End Text with drawer */}
      <Content>
          <List>
            <ListItem>
              <Button transparent>
                <Ionicons name="person" style= {{marginRight:-5}} size={24} color="darkred" />
                <Text style={{color:'darkred',fontSize:18,fontWeight:'500'}}>Change Name</Text>
              </Button>
            </ListItem>
            
            <ListItem>
              <Button transparent>
                <Ionicons name="person" style= {{marginRight:-5}} size={24} color="darkred" />
                <Text style={{color:'darkred',fontSize:18,fontWeight:'500'}}>Change Username</Text>
              </Button>
            </ListItem>

            <ListItem>
              <Button transparent>
                <Entypo name="email" style= {{marginRight:-5}} size={24} color="darkred" />
                <Text style={{color:'darkred',fontSize:18,fontWeight:'500'}}>Change Email</Text>
              </Button>
            </ListItem>

            <ListItem>
              <Button transparent>
                <Ionicons name="ios-key" style= {{marginRight:-5}} size={24} color="darkred" />
                <Text style={{color:'darkred',fontSize:18,fontWeight:'500'}}>Change Password</Text>
              </Button>
            </ListItem>
            
            <ListItem>
              <Button transparent>
                <MaterialCommunityIcons name="city" style= {{marginRight:-5}} size={26} color="darkred" />
                <Text style={{color:'darkred',fontSize:18,fontWeight:'500'}}>Addresses</Text>
              </Button>
            </ListItem>
          </List>
      </Content>
       
      </Container>
    );
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

export default SettingsScreen;