import React, { Component } from 'react';
import { Image,StyleSheet } from 'react-native';
import { Container,FooterTab,Badge, InputGroup, Header, Content, List,Item,Input, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import { Entypo,MaterialIcons,Ionicons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation-drawer';

const ContactUsScreen = () => {

      let home_notification = 5;
      let profile_notification = 5;
      let settings_notification = 5;
        return (
          <Container >
          {/* Text with navback */}
          <View searchBar style={{flexDirection: 'row', paddingTop:25 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
              <Button transparent onPress={() => this.props.navigation.navigate('Home')} >
                    <Ionicons
                      name='arrow-back-outline'
                      style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
                    />
                  </Button>
                <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'20%',paddingTop:12, fontWeight:'bold'}}>Contact Us</Text> 
            </View>
            {/* End Text with navback */}         
            <Content>
              <List style={{marginTop:0}}>
                {/* Contact 1  */}
                <ListItem>
                  <Body>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontWeight:'500',marginLeft:2, marginRight:50}}>Developer 1</Text>
                    </View>
                  </Body>
                  <Right>
                    <View style={{flexDirection:'row', justifyContent: "flex-start"}}>
                        <Button style={{flexDirection:'row',marginRight:8, height:30,backgroundColor:'blue'}}>
                            <MaterialIcons name="email" size={20} style={{marginLeft:10,marginRight:-10}} color="white" />
                            <Text style={{color: 'white',fontWeight:'bold'}}>Email</Text>
                        </Button>
                        <Button style={{flexDirection:'row',height:30,backgroundColor:'darkred'}}>
                            <MaterialIcons name="call" size={20} style={{marginLeft:10,marginRight:-10}} color="white" />
                            <Text style={{color: 'white',fontWeight:'bold'}}>Call</Text>
                        </Button>
                    </View>
                  </Right>
                </ListItem>
    
                {/* Contact 2  */}
                <ListItem>
                  <Body>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontWeight:'500',marginLeft:2, marginRight:50}}>Developer 2</Text>
                    </View>
                  </Body>
                  <Right>
                    <View style={{flexDirection:'row', justifyContent: "flex-start"}}>
                        <Button style={{flexDirection:'row',marginRight:8, height:30,backgroundColor:'blue'}}>
                            <MaterialIcons name="email" size={20} style={{marginLeft:10,marginRight:-10}} color="white" />
                            <Text style={{color: 'white',fontWeight:'bold'}}>Email</Text>
                        </Button>
                        <Button style={{flexDirection:'row',height:30,backgroundColor:'darkred'}}>
                            <MaterialIcons name="call" size={20} style={{marginLeft:10,marginRight:-10}} color="white" />
                            <Text style={{color: 'white',fontWeight:'bold'}}>Call</Text>
                        </Button>
                    </View>
                  </Right>
                </ListItem>
              </List>
            </Content>
          </Container>
        );
      }
    
    const styles = StyleSheet.create({
        IconStyle:{
          color:'darkred',
          marginLeft:-30
        },
        textStyles:{
            fontWeight:'500'
        }
    })
  
export default ContactUsScreen;