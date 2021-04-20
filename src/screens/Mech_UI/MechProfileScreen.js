import { FooterTab,Content,Container,Button,Icon } from 'native-base';
import React, { useContext,Component } from 'react';
import {StyleSheet,Text,View,Image} from 'react-native';
import { FontAwesome5,Ionicons,AntDesign,MaterialIcons,Feather,Foundation,MaterialCommunityIcons  } from '@expo/vector-icons'; 
import {AuthContext} from '../../navigation/AuthProvider';


const MechProfileScreen = ({navigation}) => {

  const {logout} = useContext(AuthContext);

    return (
      
      <Container>
      
      {/* Text with drawer */}
        <View searchBar style={{flexDirection: 'row', paddingTop:25 , marginBottom: 0, paddingBottom: 6, alignContent:"center", backgroundColor: "darkgreen", top: 0}}>
        <Button transparent onPress={() => navigation.navigate('MechHome')} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
        </Button>
        <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'27%',paddingTop:12, fontWeight:'bold'}}>Profile</Text> 
      </View>
      {/* End Text with drawer */}
      
        <Content>
          <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar} source={require("../../../assets/mechanic.png")}/>
                    <Text style={styles.name}>
                      Mechanic X
                    </Text>
                    <Text style={styles.name}>
                      Average Rating: -
                    </Text>
                </View>
              </View>

              <View style={styles.body}>
                <View style={styles.bodyContent}>

                  <Button style={styles.menuBox} onPress={() => navigation.navigate('MechRequests')}>
                    <MaterialIcons name="history" size={40} color="white" />
                    <Text style={styles.info}>Requests</Text>
                  </Button>

                  <Button style={styles.menuBox}>
                    <MaterialIcons name="settings" size={40} color="white" />
                    <Text style={styles.info}>Settings</Text>
                  </Button>

                  <Button style={styles.menuBox} onPress={() => logout()}>
                    <MaterialIcons name="logout" size={40} color="white" />
                    <Text style={styles.info}>Logout</Text>
                  </Button>
                </View>
            </View>
          </View>
        </Content>
        {/* Footer */}
        <View style={{flexDirection: 'row',alignContent:"center", backgroundColor: "darkgreen"}}>
          <FooterTab transparent style={{backgroundColor: "darkgreen"}}>
            <Button style={{marginTop:5}} onPress={() => navigation.navigate('MechHome')}>
              <Icon style={{color:'white'}} name="home" />
              <Text style={{color:'white'}}> Home</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => navigation.navigate('MechProfile')}>
              <Icon name="person" style={{color:'white'}}/>
              <Text style={{color:'white'}}>Profile</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => navigation.navigate('MechContactUs')}>
              <Icon style={{color:'white'}} name="call" />
              <Text style={{color:'white'}} >Contact Us</Text>
            </Button>
          </FooterTab>
        </View>
        {/* End Footer */}        
      </Container>
    );
}

export default MechProfileScreen;

const styles = StyleSheet.create({
  header:{
    backgroundColor: "white",
  },
  headerContent:{
    padding:25,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "darkgreen",
    marginBottom:10,
  },
  name:{
    fontSize:25,
    color:"darkgreen",
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
  },
  menuBox:{
    backgroundColor: "darkgreen",
    width:100,
    height:100,
    alignItems: 'center',
    justifyContent: 'center',
    margin:12,
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
    fontSize:18,
    fontWeight:'500',
    marginTop:10,
    color: "white",
  }
});
 