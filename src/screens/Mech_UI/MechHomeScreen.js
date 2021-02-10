import React, { Component } from 'react';
import { Container, InputGroup,Input, Badge, Icon, FooterTab, Header, Content, Button, Text } from 'native-base';
import { StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { Ionicons,FontAwesome5,FontAwesome } from '@expo/vector-icons';

export default class MechHomeScreen extends Component {

    render() {
        let name = "Mechanic x";
        let home_notification = 5;
        let profile_notification = 5;
        let settings_notification = 5;
        return (
        <Container style={{ }}>
        {/* Search bar with drawer */}
        <View searchBar style={{flexDirection: 'row', paddingTop:26 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkgreen", top: 0}}>
        <Button transparent onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
            <Icon
                name='home'
                ios='ios-menu' android="md-menu" style={{ fontSize: 28, color: 'white'}}
            />
            </Button>
            <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'27%',paddingTop:12, fontWeight:'bold'}}> Home</Text> 
        </View>
        {/* End Search bar with drawer */}
        <Content>
        <View style={{ flexDirection: "column" , justifyContent: "space-evenly"}}>
            <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
                <Image source={require("../../../assets/logo.png")} style={styles.logoStyle} />
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.title}>{name}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                    <Button rounded info style={{ backgroundColor: 'darkgreen', width: 150, justifyContent: "center", top: 40, marginHorizontal: 10 }}
                        onPress={() => this.props.navigation.navigate('MechAddService')}
                    >
                        <Ionicons name="add-circle-outline" style={styles.IconsStyle} size={25} color="white" />
                        <Text style={{fontWeight:'bold'}}> Add Service </Text>
                    </Button>
                    <Button rounded style={{ backgroundColor: 'darkgreen', width: 150, justifyContent: "center", top: 40, marginHorizontal: 10 }}
                        onPress={() => this.props.navigation.navigate('MechServiceList')}>
                        <FontAwesome5 name="list" size={17} style={styles.IconsStyle} color="white" />
                        <Text style={{fontWeight:'bold'}}> Services List </Text>
                    </Button>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around", top: 20 }}>
                    <Button rounded info style={{ backgroundColor: 'darkgreen', width: 150, justifyContent: "center", top: 40, marginHorizontal: 10 }}
                        onPress={() => this.props.navigation.navigate('MechRequests')}>
                        <FontAwesome5  name="buffer" size={24} style={styles.IconsStyle} color="white" />
                        <Text style={{fontWeight:'bold'}}> Requests </Text>
                    </Button>
                    <Button rounded info style={{ backgroundColor: 'darkgreen', width: 150, justifyContent: "center", top: 40, marginHorizontal: 10 }}
                     onPress={() => this.props.navigation.navigate('MechAddOffer')}
                    >
                        <FontAwesome name="percent" size={22} style={styles.IconsStyle} color="white" />
                        <Text style={{fontWeight:'bold'}}> Add offer </Text>
                    </Button>
                </View>
            </View>
        </View>
        </Content>
        {/* Footer */}
        <View style={{flexDirection: 'row',alignContent:"center", backgroundColor: "darkgreen"}}>
          <FooterTab transparent style={{backgroundColor: "darkgreen"}}>
            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('MechHome')}>
              <Icon style={{color:'white'}} name="home" />
              <Text style={{color:'white'}}> Home</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('MechProfile')}>
              <Icon name="person" style={{color:'white'}}/>
              <Text style={{color:'white'}}>Profile</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('MechContactUs')}>
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

    title: {
        fontSize: 60,
        justifyContent: "center",
        alignSelf: "center"
    },
    subtitle: {
        fontSize: 36,
        justifyContent: "center",
        alignSelf: "center"
    },
    logoStyle: {
        marginTop: 40,
        marginVertical: 20,
        width: 160,
        height: 120
    },
    title: {
        fontSize: 40,
        fontWeight:'500',
        justifyContent: "center",
        alignSelf: "center",
        marginBottom:-2,
        color:'darkgreen',
        textShadowColor: 'black',
        textShadowRadius: 2,
         textShadowOffset: { 
            width: 2,
            height: 2
        }
    },
    IconsStyle:{
        marginLeft:15,
        marginRight:-15
    }
});