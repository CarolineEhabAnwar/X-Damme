import React, { Component } from 'react';
import { Image,StyleSheet,View } from 'react-native';
import { Container,FooterTab,Badge, InputGroup, Header,Item,Input, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5,Ionicons } from '@expo/vector-icons'; 


export default class MechanicScreen extends Component {
  render() {
    let home_notification = 5;
    let profile_notification = 5;
    let settings_notification = 5;
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

      {/* Item Card */}
        
          <Card style={{borderRadius:3}}>
            <CardItem>
              <Left>
                <Body style={{marginBottom:8}}>
                  <Text style={{fontWeight:'bold',fontSize:18.5}}>Mechanic X</Text>
                  <Text note>Rate</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={require("../../../assets/mechanic.png")} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem style={{marginLeft:'auto'}}>
              <Right>
              <Button style={styles.cartItemStyle} transparent onPress={() => this.props.navigation.navigate('MechanicDetails')}>
                  <Text style={{fontSize: 15,marginRight:-15,color:'darkred',fontWeight:'bold'}} > See Mechanic Details </Text>
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
    marginTop:13,
    fontSize:15,
    marginLeft:10,
    fontWeight:'bold'
  },

  cartItemStyle:{
    marginTop:-4,
    marginRight:3
  }
})