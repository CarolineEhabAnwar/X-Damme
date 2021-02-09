import React, { Component } from 'react';
import { Image,StyleSheet } from 'react-native';
import { Container,FooterTab,Badge, InputGroup, Header, Content, List,Item,Input, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import { Entypo,Ionicons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation-drawer';

export default class MechServiceListScreen extends Component {
  render() {
    let home_notification = 5;
    let profile_notification = 5;
    let settings_notification = 5;

    return (
      <Container >
        {/* Search bar with drawer */}
        <View searchBar style={{flexDirection: 'row', paddingTop:26 , paddingBottom: 6, alignContent:"center", backgroundColor: "darkblue", top: 0}}>
        <Button transparent onPress={() => this.props.navigation.navigate('SOHome')} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
            </Button>
        <InputGroup rounded style={{flex:1,backgroundColor:'white',height:35,marginTop:7, paddingLeft:10, paddingRight:10}}>
          <Icon name="ios-search" style={{color: "darkblue"}} />
          <Input style={{height:30,marginTop:-5, color: "white"}} place placeholder="Search Item" />
        </InputGroup>
        <Button transparent style={{height:50}} onPress={() => null}>
          <Text style={{color: "white",fontWeight:'bold'}}>Search</Text> 
        </Button> 
        </View>
        {/* End Search bar with drawer */}  
        
        <Content>
          <List>
            {/* Item 1 */}
            <ListItem>
              <Body>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight:'500',marginLeft:2, marginRight:50}}>Verna door</Text>
                </View>
              </Body>
              <Right>
                <View style={{flexDirection:'row', justifyContent: "flex-start"}}>
                    <Button transparent onPress={() => this.props.navigation.navigate('SOViewItem')}>
                      <Text style={{color: 'blue'}}>View</Text>
                    </Button>

                    <Button transparent onPress={() => this.props.navigation.navigate('SOEditItem')}>
                      <Text style={{color: 'green'}}>Edit</Text>
                    </Button>

                    <Button transparent>
                      <Text style={{color: 'red', width: 80}}>Delete</Text>
                    </Button>
                </View>
              </Right>
            </ListItem>

            {/* Item 2 */}
            <ListItem>
              <Body>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight:'500',marginLeft:2,marginRight:50}}>Logan Mirror</Text>
                </View>
              </Body>
              <Right>
                <View style={{flexDirection:'row'}}>
                    <Button transparent onPress={() => this.props.navigation.navigate('SOViewItem')}>
                      <Text style={{color: 'blue'}}>View</Text>
                    </Button>

                    <Button transparent onPress={() => this.props.navigation.navigate('SOEditItem')}>
                      <Text style={{color: 'green'}}>Edit</Text>
                    </Button>

                    <Button transparent>
                      <Text style={{color: 'red', width: 80}}>Delete</Text>
                    </Button>
                </View>
              </Right>
            </ListItem>
          </List>
        </Content>

        {/* Footer */}
        <View style={{flexDirection: 'row',alignContent:"center", backgroundColor: "darkblue"}}>
          <FooterTab transparent style={{backgroundColor: "darkblue"}}>
            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('SOHome')}>
              <Icon style={{color:'white'}} name="home" />
              <Text style={{color:'white'}}> Home</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('SOProfile')}>
              <Icon name="person" style={{color:'white'}}/>
              <Text style={{color:'white'}}>Profile</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('SOContactUs')}>
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
    IconStyle:{
      color:'darkblue',
      marginLeft:-30
    },
    textStyles:{
        fontWeight:'500'
    }
})
  