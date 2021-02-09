import React, { Component } from 'react';
import { Image,StyleSheet,View } from 'react-native';
import { Container, Header,Badge,FooterTab, Button,Text,Icon,InputGroup,Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5,AntDesign,Ionicons,FontAwesome } from '@expo/vector-icons';

export default class TutorialsScreen extends Component {
  render() {
    let home_notification = 5;
    let profile_notification = 5;
    let settings_notification = 5;
    return (
      <Container>
        {/* Search bar with nav back */}
        <View searchBar style={{flexDirection: 'row', paddingTop:25 , paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
        <Button transparent onPress={() => this.props.navigation.navigate('Home')} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
            </Button>
        <InputGroup rounded style={{flex:1,backgroundColor:'#fff',height:35,marginTop:7, paddingLeft:10, paddingRight:10}}>
          <Icon name="ios-search" style={{color: "darkred"}} />
          <Input style={{height:30,marginTop:-5, color: "darkred"}} place placeholder="Search Tutorial" />
        </InputGroup>
        <Button transparent style={{height:50}} onPress={() => null}>
        <Text style={{color: "white",fontWeight:'bold'}}>Search</Text> 
      </Button>
      </View>
      {/* End Search bar with nav back */}
        <Grid>
          <Col style={{ backgroundColor: '#635DB7' }}>
            <Button full transparent style={styles.buttonStyle}>
              <Icon style={styles.iconStyle} name="bulb-outline"></Icon>
              <Text style={styles.textStyle}>Beginners Stuff</Text>
            </Button>
          </Col>
          <Col style={{ backgroundColor: '#ad9c9c' }}>
            <Button full transparent style={styles.buttonStyle}>
              <FontAwesome name="road" style={styles.iconStyle} />
              <Text style={styles.textStyle}>Stuck on the road</Text>
            </Button>
          </Col>
        </Grid>
        <Grid>
          <Col style={{ backgroundColor: '#1a8f8d' }}>
          <Button full transparent style={styles.buttonStyle}>
            <Icon style={styles.iconStyle} name="build-outline"></Icon>
            <Text style={styles.textStyle}>Car Check up</Text>
          </Button>
          </Col>
          <Col style={{ backgroundColor: '#cf0e22' }}>
          <Button full transparent style={styles.buttonStyle}>
            <Fontisto name="first-aid-alt" style={styles.iconStyle} />
            <Text style={styles.textStyle}>First Aid</Text>
          </Button>
          </Col>
        </Grid>
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
  buttonStyle:{
    width: "100%",
    height: "100%",
    flexDirection:'column'
  },

  textStyle:{
    fontWeight:'bold',
    color:'white',
    fontSize:20
  },

  iconStyle:{
   fontSize: 40, 
   color: 'white',
   marginBottom:10
  }
})

