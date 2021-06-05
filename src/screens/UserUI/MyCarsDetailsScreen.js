import React, { Component,useState } from 'react';
import { Image,StyleSheet,View } from 'react-native';
import { Container,FooterTab, Content, Icon,Text, Button,List, ListItem,Card,CardItem,Body } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5,Ionicons,Foundation,MaterialCommunityIcons,Entypo  } from '@expo/vector-icons'; 
import Modal from 'react-native-modal';

const MyCarsDetailsScreen = ({ navigation, route }) => {

    return (
      <Container>
        
        {/* Text with drawer */}
        <View searchBar style={{flexDirection: 'row', paddingTop:25 , marginBottom: 0, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
        <Button transparent onPress={() => navigation.navigate('MyCars')} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
        </Button>
        <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'22%',paddingTop:12, fontWeight:'bold'}}>Car Details</Text> 
      </View>
      {/* End Text with drawer */}
      <Content>
      <Card style={{flex: 0}}>
              <CardItem style={{marginHorizontal:1,borderWidth:3,borderColor:'darkred'}}>
                <Body>
                  <Text style={styles.textStyles}>Car Brand: -</Text>
                  <Text style={styles.textStyles}>Car Model: -</Text>
                  <Text style={styles.textStyles}>Last KM Read: -</Text>
                  <Text style={styles.textStyles}>Last Added Water: -</Text>
                  <Text style={styles.textStyles}>Last Changed Oil: -</Text>
                  <View style={{flexDirection:'row',alignSelf:'center'}}>
                    <Button style={styles.buttonStyle}>
                        <Icon style={{marginRight:-6}} name="water-outline"></Icon>
                        <Text style={styles.buttonTextStyle}>Add Water</Text>
                    </Button>
                    <Button style={styles.buttonStyle}>
                        <Icon style={{marginRight:-6}} name="water"></Icon>
                        <Text style={styles.buttonTextStyle}>Change Oil</Text>
                    </Button>
                  </View>
                  <Button style={styles.buttonStyle} onPress={() => navigation.navigate('EditKM')}>
                    <Icon style={{marginRight:-6}} name="trending-up-outline"></Icon>
                    <Text style={styles.buttonTextStyle}>Edit KM</Text>
                  </Button>
                  
                  
                </Body>
              </CardItem>
          </Card>
      </Content>
        {/* Footer */}
        <View style={{flexDirection: 'row',alignContent:"center", backgroundColor: "darkred"}}>
          <FooterTab transparent style={{backgroundColor: "darkred"}}>
            <Button style={{marginTop:5}} onPress={() => navigation.navigate('Home')}>
              <Icon style={{color:'white'}} name="home" />
              <Text style={{color:'white'}}> Home</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => navigation.navigate('Profile')}>
              <Icon name="person" style={{color:'white'}}/>
              <Text style={{color:'white'}}>Profile</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => navigation.navigate('ContactUs')}>
              <Icon style={{color:'white'}} name="call" />
              <Text style={{color:'white'}} >Contact Us</Text>
            </Button>
          </FooterTab>
        </View>
        {/* End Footer */}
      </Container>
    );
}

export default MyCarsDetailsScreen;

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
    marginRight:10,
    alignSelf:'center'
  },

  buttonTextStyle:{
    fontWeight:'bold'
  }
})