import React, { Component } from 'react';
import { Image,StyleSheet,View } from 'react-native';
import { Container,FooterTab,Badge, InputGroup, Header,Item,Input, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5,Ionicons } from '@expo/vector-icons'; 


export default class LoadingScreen extends Component {
  render() {
    let home_notification = 5;
    let profile_notification = 5;
    let settings_notification = 5;
    return (
      <Container>
        <Content>
          <View>
              <View>
                <View style={styles.header}>
                <Image source={require("../../assets/logo2.png")} style={{height:300,width:300}} />
                    <Text style={styles.name}>
                      Loading 
                    </Text>
                </View>
              </View>
          </View>
        </Content>   
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    padding:25,
    marginTop:90,
    alignItems: 'center',
  },
  name:{
    fontSize:30,
    color:"#ab0000",
    fontWeight:'800',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  bodyContent:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
 