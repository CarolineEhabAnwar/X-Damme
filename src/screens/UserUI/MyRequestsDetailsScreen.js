import React, { Component,useState } from 'react';
import { Image,StyleSheet,View } from 'react-native';
import { Container,FooterTab,Footer,Badge,InputGroup,Input, Header, Content, Card, Icon, CardItem,Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5,Ionicons } from '@expo/vector-icons'; 
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

export default class MyRequestsDetailsScreen extends Component {
  render() {
    return (
      <Container>
        
        {/* Text with drawer */}
        <View searchBar style={{flexDirection: 'row', paddingTop:25 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
        <Button transparent onPress={() => this.props.navigation.goBack()} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
        </Button>
        <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'18%',paddingTop:12, fontWeight:'bold'}}>{t('UserMyRequestsDetailsScreenText1')}</Text> 
      </View>
      {/* End Text with drawer */}
      <Content>
          <Card style={{marginTop:0,flex: 0}}>
              <CardItem style={{marginHorizontal:1,borderWidth:3,borderColor:'darkred'}}>
                <Body>
                  <Text style={styles.textStyles}>{t('UserMyRequestsDetailsScreenText2')}</Text>
                  <Text style={styles.textStyles}>{t('UserMyRequestsDetailsScreenText3')}</Text>
                  <Text style={styles.textStyles}>{t('UserMyRequestsDetailsScreenText4')}</Text>
                  <Text style={styles.textStyles}>{t('UserMyRequestsDetailsScreenText5')}</Text>
                  <Text style={styles.textStyles}>{t('UserMyRequestsDetailsScreenText6')}</Text>
                  <Text style={styles.textStyles}>{t('UserMyRequestsDetailsScreenText7')}</Text>
                  <View style={{flexDirection:'row',alignSelf:'center'}}>
                  </View>
                </Body>
              </CardItem>
          </Card>
        </Content>
        {/* Footer */}
        <View style={{flexDirection: 'row',alignContent:"center", backgroundColor: "darkred"}}>
          <FooterTab transparent style={{backgroundColor: "darkred"}}>
            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('Home')}>
              <Icon style={{color:'white'}} name="home" />
              <Text style={{color:'white'}}>{t('UserHomeScreenHome')}</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('Profile')}>
              <Icon name="person" style={{color:'white'}}/>
              <Text style={{color:'white'}}>{t('UserHomeScreenProfile')}</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('ContactUs')}>
              <Icon style={{color:'white'}} name="call" />
              <Text style={{color:'white'}} >{t('UserHomeScreenContactUs')}</Text>
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
    marginTop:7,
    backgroundColor:'darkred',
    marginRight:10
  },

  buttonTextStyle:{
    fontWeight:'bold'
  }
})