import React, { Component } from 'react';
import { Image,StyleSheet,View } from 'react-native';
import { Container, Badge,FooterTab,Header,Button,Text,Icon,InputGroup,Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Entypo, FontAwesome, MaterialIcons,FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Fontisto,Ionicons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation-drawer';

export default class EmergencyScreen extends Component {
  render() {
    let home_notification = 5;
    let profile_notification = 5;
    let settings_notification = 5;
    return (
      <Container>
      {/* Text with navback */}
        <View searchBar style={{flexDirection: 'row', paddingTop:25 , paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
           <Button transparent onPress={() => this.props.navigation.navigate('Home')} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
            </Button>
          <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'22%',paddingTop:12, fontWeight:'bold'}}>Emergency</Text> 
      </View>
      {/* End Text with navback */}   
        <Grid>
          <Col style={{ backgroundColor: '#c99c1e' }}>
            <Button full transparent style={styles.buttonStyle}>
              <Entypo style={styles.iconStyle} name="location-pin" />
              <Text style={styles.textStyle}>Ping Nearest Users</Text>
            </Button>
          </Col>
          <Col style={{ backgroundColor: '#1b2696' }}>
            <Button full transparent style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('EmergencyContacts')} >
              <MaterialIcons name="quick-contacts-dialer" style={styles.iconStyle} />
              <Text style={styles.textStyle}>Emergency Contacts </Text>
            </Button>
          </Col>
        </Grid>
        <Grid>
          <Col style={{ backgroundColor: '#d91118' }}>
          <Button full transparent style={styles.buttonStyle}>
            <FontAwesome5 style={styles.iconStyle} name="hospital"/>
            <Text style={styles.textStyle}>Nearby Hospitals</Text>
          </Button>
          </Col>
          <Col style={{ backgroundColor: '#80207e' }}>
          <Button full transparent style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('WinchNumbers')}>
            <MaterialCommunityIcons name="tow-truck" style={styles.iconStyle} />
            <Text style={styles.textStyle}>Winch Numbers</Text>
          </Button>
          </Col>
        </Grid>
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
  buttonStyle:{
    width: "100%",
    height: "100%",
    flexDirection:'column'
  },

  textStyle:{
    fontWeight:'bold',
    color:'white',
    fontSize:20,
    textAlign:'center'
  },

  iconStyle:{
   fontSize: 40, 
   color: 'white',
   marginBottom:10
  }
})

