import React, { Component } from 'react';
import { Image,StyleSheet,View } from 'react-native';
import { Container,FooterTab,Badge,InputGroup,Input, Header, Content, Card, Icon, CardItem,Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5,Ionicons } from '@expo/vector-icons'; 

export default class MechanicDetailsScreen extends Component {
  render() {
    let home_notification = 5;
    let profile_notification = 5;
    let settings_notification = 5;
    return (
      <Container>
        {/* Text with navback */}
        <View searchBar style={{flexDirection: 'row', paddingTop:25 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
        <Button transparent onPress={() => this.props.navigation.navigate('Mechanics')} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
            </Button>
          <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'16%',paddingTop:12, fontWeight:'bold'}}>Mechanic Details</Text> 
      </View>
      {/* End Text with navback */}     
        <Content>
          <Card style={{flex: 0}}>
            <Image source={require("../../assets/mechanic.png")} style={{marginBottom:20,height: 200, width: null}}/>
              <CardItem style={{marginHorizontal:1,borderWidth:3,borderColor:'darkred'}}>
                <Body>
                  <Text style={styles.textStyles}>Name: -</Text>
                  <Text style={styles.textStyles}>Location: -</Text>
                  <Text style={styles.textStyles}>Rate: -</Text>
                  <Button style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('ServiceDetails')}>
                    <Icon style={{marginRight:-6}} name="build-outline"></Icon>
                    <Text style={styles.buttonTextStyle}>Services</Text>
                  </Button>
                </Body>
              </CardItem>
          </Card>
        </Content>

        {/* Footer */}
        <View style={{flexDirection: 'row', alignContent:"center", backgroundColor: "darkred"}}>
          <FooterTab transparent style={{backgroundColor: "darkred"}}>
            <Button badge style={{marginTop:5}}>
              {home_notification == null ? null : <Badge><Text>5</Text></Badge>}
              <Icon style={{color:'white'}} name="home" />
              <Text style={{color:'white'}}> Home</Text>
            </Button>

            <Button badge style={{marginTop:5}}>
              {profile_notification == null ? null : <Badge><Text>5</Text></Badge>}
              <Icon name="person" style={{color:'white'}}/>
              <Text style={{color:'white'}}>Profile</Text>
            </Button>

            <Button badge style={{marginTop:5}}>
              {settings_notification == null ? null : <Badge><Text>5</Text></Badge>}
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
    marginTop:15,
    marginLeft:'auto',
    backgroundColor:'darkred',
  },

  buttonTextStyle:{
    fontWeight:'bold'
  }
})