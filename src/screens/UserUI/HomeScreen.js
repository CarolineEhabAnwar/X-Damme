import React, { Component } from 'react';
import { Container, InputGroup, Header, Item, Icon, Input, Content, Left, Right, Title, Body, Footer, FooterTab, Button, Text, Badge } from 'native-base';
import { StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import ItemComponent from "../components/ItemComponent";
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let home_notification = 5;
    let profile_notification = 5;
    let settings_notification = 5;

    return (
      <Container>
        {/* Item Card */}
        {/* Search bar with drawer */}
        <View searchBar style={{flexDirection: 'row', paddingTop:26 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
        <Button transparent onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
              <Icon
                name='home'
                ios='ios-menu' android="md-menu" style={{ fontSize: 28, color: 'white'}}
              />
            </Button>
        <InputGroup rounded style={{flex:1,backgroundColor:'#fff',height:35,marginTop:7, paddingLeft:10, paddingRight:10}}>
          <Icon name="ios-search" style={{color: "darkred"}} />
          <Input style={{color: "darkred"}} placeholder="Search" />
        </InputGroup>
        <Button transparent style={{height:50}} onPress={() => null}>
        <Text style={{color: "white",fontWeight:'bold'}}>Search</Text> 
      </Button>
      </View>
      {/* End Search bar with drawer */}
        <Content scrollEnabled>
          <Text style={styles.title}>Welcome</Text>
          <View style={{ marginTop: 40, marginBottom: 50, flexDirection: "row", justifyContent: 'space-evenly' }}>
            
            {/* Car Items Bubble */}
            <View style={{height:100,width:100}}>
              <Button transparent onPress={() => this.props.navigation.navigate('Items')} style={{height:100,width:100}}>
                <Image source={require("../../../assets/parts.png")} style={styles.profileImg} />
              </Button>
              <Text style={styles.textStyle}>Car Parts</Text>
            </View>
            
            {/* Mechanics Bubble */}
            <View style={{height:100,width:100}}>
            <Button transparent onPress={() => this.props.navigation.navigate('Mechanics')} style={{height:100,width:100}}>
              <Image source={require("../../../assets/mechanic.png")} style={styles.profileImg} />
            </Button>
            <Text style={styles.textStyle}>Mechanics</Text>
            </View>

            {/* Emergency Bubble */}
            <View style={{flexDirection:'column'}}>
              <Button transparent onPress={() => this.props.navigation.navigate('Emergency')} style={{height:100,width:100}}>
                <Image source={require("../../../assets/emergency.jpg")} style={styles.profileImg} />
              </Button>
              <Text style={styles.textStyle}>Emergency</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginLeft:15, justifyContent: "space-around" }}>
            
            {/* Tutorials Bubble */}
            <View>
            <Button transparent  onPress={() => this.props.navigation.navigate('Tutorials')} style={{alignSelf:'center',height:100,width:100}}>
                <Image source={require("../../../assets/tutorials.jpg")} style={styles.profileImg} />
              </Button>
              <Text style={styles.textStyle}>Tutorials</Text>
            </View>            
            
            {/* Recommendations Bubble */}
            <View >
              <Button transparent style={{alignSelf:'center',height:100,width:100}}>
                <Image source={require("../../../assets/recommendation.png")} style={styles.profileImg} />
              </Button>
              <Text style={styles.textStyle}>Recommendations</Text>
            </View>
            


          </View>


          {/* Most Frequent Items */}
          <View >
            <Text style={{fontSize: 32,marginLeft:5, marginTop: 30}}>Most Frequent Items</Text>
          </View>
          <View scrollEnabled style={{flexDirection: "row"}}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal= {true}>
            <ItemComponent 
              title="Motor1"
              price= {20000}
              quality= "High"
              imageSource={require('../../../assets/motor.png')}
          />
          <ItemComponent 
              title="Motor2"
              price= {10000}
              quality= "High"
              imageSource={require('../../../assets/motor.png')}
          />
          <ItemComponent 
              title="Motor3"
              price= {2000}
              quality= "Poor"
              imageSource={require('../../../assets/motor.png')}
          />
          <ItemComponent 
              title="Motor4"
              price= {5000}
              quality= "Medium"
              imageSource={require('../../../assets/motor.png')}
          />
            </ScrollView>
          </View>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'contain',
    borderWidth: 3,
    borderColor:'darkred',
    
  },
  textStyle:{
    alignSelf:'center',
    fontSize:18,
    fontWeight:'bold',
    color:'darkred',
    marginTop:3
  },
  title: {
    fontSize: 50,
    fontWeight:'500',
    justifyContent: "center",
    alignSelf: "center",
    marginBottom:-20,
    color:'darkred',
    textShadowColor: 'black',
    textShadowRadius: 2,
     textShadowOffset: { 
        width: 2,
        height: 2
      }
  }
});