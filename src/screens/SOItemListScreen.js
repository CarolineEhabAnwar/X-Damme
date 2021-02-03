import React, { Component } from 'react';
import { Image,StyleSheet } from 'react-native';
import { Container, InputGroup, Header, Content, List,Item,Input, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation-drawer';

export default class SOItemListScreen extends Component {
  render() {
    return (
      <Container >
        <Content>
          <List style={{marginTop:"24%"}}>
            {/* Item 1 */}
            <ListItem>
              <Body>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight:'500',marginLeft:2, marginRight:50}}>#5A42Z5A8W</Text>
                </View>
              </Body>
              <Right>
                <View style={{flexDirection:'row', justifyContent: "flex-start"}}>
                    <Button transparent>
                      <Text style={{color: 'blue'}}>View</Text>
                    </Button>

                    <Button transparent >
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
                    <Text style={{fontWeight:'500',marginLeft:2,marginRight:50}}>#4ACCZXCA9</Text>
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
        <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 20, paddingBottom: 10, alignContent: "center", backgroundColor: "darkblue", position: "absolute", top: 0 }}>
          <Button transparent style={{ alignSelf: "baseline" }} onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
            <Icon
              name='home'
              ios='ios-menu' android="md-menu" style={{ fontSize: 28, color: 'white' }}
            />
          </Button>
          <InputGroup rounded style={{ flex: 1, backgroundColor: '#fff', height: 45, paddingLeft: 10, paddingRight: 10}}>
            <Icon name="ios-search" style={{ color: "darkblue" }} />
            <Input style={{ height: 50, color: "darkblue" }} placeholder="Search" />
          </InputGroup>
          <Button transparent style={{ height: 30, alignSelf: "center" }} onPress={() => null}>
            <Text style={{ color: "white", fontWeight: 'bold' }}>Search</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    IconStyle:{
      color:'darkred',
      marginLeft:-30
    },
    textStyles:{
        fontWeight:'500'
    }
})
  