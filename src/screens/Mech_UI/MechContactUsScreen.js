import React, { Component } from 'react';
import { Image,StyleSheet } from 'react-native';
import { Container,FooterTab,Badge, InputGroup, Header, Content, List,Item,Input, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import { Entypo,MaterialIcons,Ionicons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation-drawer';

export default class MechContactUsScreen extends Component {
    render() {
      let home_notification = 5;
      let profile_notification = 5;
      let settings_notification = 5;
        return (
          <Container >
          {/* Text with navback */}
          <View searchBar style={{flexDirection: 'row', paddingTop:25 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkgreen", top: 0}}>
              <Button transparent onPress={() => this.props.navigation.navigate('MechHome')} >
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
                        <Button style={{flexDirection:'row',height:30,backgroundColor:'darkgreen'}}>
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
                        <Button style={{flexDirection:'row',height:30,backgroundColor:'darkgreen'}}>
                            <MaterialIcons name="call" size={20} style={{marginLeft:10,marginRight:-10}} color="white" />
                            <Text style={{color: 'white',fontWeight:'bold'}}>Call</Text>
                        </Button>
                    </View>
                  </Right>
                </ListItem>
              </List>
            </Content>
        {/* Footer */}
        <View style={{flexDirection: 'row',alignContent:"center", backgroundColor: "darkgreen"}}>
          <FooterTab transparent style={{backgroundColor: "darkgreen"}}>
            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('MechHome')}>
              <Icon style={{color:'white'}} name="home" />
              <Text style={{color:'white'}}> Home</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('MechProfile')}>
              <Icon name="person" style={{color:'white'}}/>
              <Text style={{color:'white'}}>Profile</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('MechContactUs')}>
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
        IconStyle:{
          color:'darkgreen',
          marginLeft:-30
        },
        textStyles:{
            fontWeight:'500'
        }
    })
      