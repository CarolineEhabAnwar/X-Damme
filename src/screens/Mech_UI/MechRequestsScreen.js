import React, { Component } from 'react';
import { Image,StyleSheet } from 'react-native';
import { Entypo,Ionicons } from '@expo/vector-icons';
import { Container,FooterTab,Badge, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View } from 'native-base';


export default class MechRequestsScreen extends Component {
  render() {
    let home_notification = 5;
    let profile_notification = 5;
    let settings_notification = 5;
    return (
      <Container>
        {/* Search bar with drawer */}
        <View searchBar style={{flexDirection: 'row', paddingTop:26 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkgreen", top: 0}}>
        <Button transparent onPress={() => this.props.navigation.navigate('MechHome')} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
            </Button>
            <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'22%',paddingTop:12, fontWeight:'bold'}}> Requests</Text> 
        </View>
        {/* End Search bar with drawer */}        
      
        <Content>
          <Card style={{flex: 0,borderColor:'darkgreen'}}>
              <CardItem style={{marginHorizontal:1}}>
                <Body>
                  <Text style={styles.textStyles}>Request ID: -</Text>
                  <Text style={styles.textStyles}>Service Name: -</Text>
                  <Text style={styles.textStyles}>Appointment At: -</Text>
                  <Text style={styles.textStyles}>Requested By: -</Text>
                  
                  <View style={{flexDirection:'row',justifyContent:'center',marginTop:17, marginLeft:'15%'}}>
                    {/* Accept */}
                    <Button style={{marginLeft:13,backgroundColor:'green'}}>
                      <Text style={styles.buttonTextStyle}>Accept</Text>
                    </Button>

                    {/* Decline */}
                    <Button style={{marginLeft:30,backgroundColor:'#eb1c1c'}}>
                      <Text style={styles.buttonTextStyle}>Decline</Text>
                    </Button>
                  </View>
                </Body>
              </CardItem>
              <Right>
              <Button style={styles.cartItemStyle} transparent onPress={() => this.props.navigation.navigate('MechViewRequest')}>
                  <Text style={{fontSize: 16,fontWeight:'bold',marginRight:-15,color:'darkgreen'}}> See Service Details </Text>
                  <Icon active style={{fontSize: 25, color: 'darkgreen'}} name="arrow-forward" />
                </Button>
              </Right>
          </Card>
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
  textStyles:{
    fontSize:20,
    marginBottom:4,
    fontWeight:'bold',
    color:'black',
    textShadowColor: 'darkgreen',
    textShadowRadius: 1.5,
     textShadowOffset: { 
        width: 0,
        height: 0
      },
    marginBottom:10
    
  },

  buttonStyle:{
    marginTop:7,
    marginLeft:'auto',
    backgroundColor:'darkgreen',
  },

  buttonTextStyle:{
    fontWeight:'bold'
  }
})