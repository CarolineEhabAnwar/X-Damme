import { FooterTab,Content,Container,Button,Icon } from 'native-base';
import React, { useContext,Component } from 'react';
import {StyleSheet,Text,View,Image} from 'react-native';
import { FontAwesome5,Ionicons,AntDesign,MaterialIcons,Feather,Foundation,MaterialCommunityIcons  } from '@expo/vector-icons'; 


const AreYou = () => {


    return (
      
      <Container>
      
      {/* Text with drawer */}
      <View style={{flexDirection: 'row', paddingTop:25 , marginBottom: 0, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
        <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'27%',paddingTop:12, fontWeight:'bold'}}></Text> 
      </View>
      {/* End Text with drawer */}
      
        <Content>
          <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.name}>
                      Login as
                    </Text>
                </View>
              </View>

              <View style={styles.body}>
                <View style={styles.bodyContent}>

                  <Button style={styles.menuBox}>
                    <FontAwesome5 name="user" size={55} color="white" />
                    <Text style={styles.info}>User</Text>
                  </Button>

                  <Button style={styles.menuBox}>
                    <FontAwesome5 name="user" size={55} color="white" />
                    <Text style={styles.info}>Shop Owner</Text>
                  </Button>
                  
                  <Button style={styles.menuBox}>
                    <FontAwesome5 name="user" size={55} color="white" />
                    <Text style={styles.info}>Mechanic</Text>
                  </Button>
                </View>
            </View>
          </View>
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

export default AreYou;

const styles = StyleSheet.create({
  header:{
    backgroundColor: "white",
  },
  headerContent:{
    padding:25,
    alignItems: 'center',
  },
  name:{
    fontSize:50,
    color:"darkred",
    fontWeight:'bold',
    marginBottom:20
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
    justifyContent:'center',
    flexWrap: 'wrap'
  },
  menuBox:{
    backgroundColor: "darkred",
    justifyContent: 'center',
    width:135,
    height:135,
    margin:15,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:2,
      width:-2
    },
    borderRadius:13,
    elevation:4,
    flexDirection:'column'
  },
  icon: {
    width:60,
    height:60,
  },
  info:{
    fontSize:20,
    fontWeight:'bold',
    marginTop:10,
    color: "white",
  }
});
 