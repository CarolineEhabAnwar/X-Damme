import React, { Component } from "react";
import { Image,StyleSheet } from 'react-native';
import { Container,Icon,Badge,FooterTab,InputGroup,Input, Button, Header, Content, Card, CardItem, Text, Body, View } from "native-base";
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5,AntDesign,Ionicons } from '@expo/vector-icons';

export default class ServiceDetailsScreen extends Component {
  render() {
    let home_notification = 5;
    let profile_notification = 5;
    let settings_notification = 5;
    return (
      <Container>
        {/* Search bar with nav back */}
        <View searchBar style={{flexDirection: 'row', paddingTop:25 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
        <Button transparent onPress={() => this.props.navigation.navigate('MechanicDetails')} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
            </Button>
        <InputGroup rounded style={{flex:1,backgroundColor:'#fff',height:35,marginTop:7, paddingLeft:10, paddingRight:10}}>
          <Icon name="ios-search" style={{color: "darkred"}} />
          <Input style={{height:30,marginTop:-5, color: "darkred"}} place placeholder="Search Service" />
        </InputGroup>
        <Button transparent style={{height:50}} onPress={() => null}>
        <Text style={{color: "white",fontWeight:'bold'}}>Search</Text> 
      </Button>
      </View>
      {/* End Search bar with nav back */}
        <Content padder>
          <Card>
            <CardItem header bordered style={{justifyContent:'center'}}>
              <Text style={{fontSize:18,color:'black',fontWeight:'800'}}>Fix Tires</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <View style={{flexDirection:'row'}}> 
                    <FontAwesome5 style={styles.IconStyles} name="money-bill-wave" size={18} color="black" />
                    <Text style={styles.textStyles}>Service Price: - </Text>
                </View>

                <View style={{flexDirection:'row'}}> 
                    <AntDesign name="calendar"  style={styles.IconStyles}  size={20} color="black" />
                    <Text style={styles.textStyles}>Service Availability: - </Text>
                </View>

                <View style={{flexDirection:'row'}}> 
                    <AntDesign name="clockcircleo"  style={styles.IconStyles}  size={21} color="black" />
                    <Text style={styles.textStyles}>Service Duration: - </Text>
                </View>

                <View style={{flexDirection:'row'}}> 
                    <Text style={styles.textStyles}>Rate: - </Text>
                </View>
                
              </Body>
            </CardItem>
            <CardItem footer button style={{justifyContent:'center'}}>
              <Button transparent>
              <Text style={styles.buttontextStyles}>Reserve Service</Text>
              </Button>
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
      marginVertical:10,
      fontWeight:'600'
    },

    IconStyles:{
        marginVertical:9,
        marginRight:5
    },

    buttontextStyles:{
        color:'darkred',
        fontWeight:'bold',
        fontSize:18
    }
})