import React, { Component } from 'react';
import { Image,StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View } from 'native-base';


export default class SOViewItemScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Card style={{marginTop:60,flex: 0}}>
            <Image source={require("../../assets/mechanic.png")} style={{marginBottom:20,height: 200, width: null}}/>
              <CardItem style={{marginHorizontal:1,borderWidth:3,borderColor:'#bab5b5'}}>
                <Body>
                  <Text style={styles.textStyles}>Item ID: -</Text>
                  <Text style={styles.textStyles}>Name: -</Text>
                  <Text style={styles.textStyles}>Price: -</Text>
                  <Text style={styles.textStyles}>Quality: -</Text>
                  <Text style={styles.textStyles}>Manufacture Date: -</Text>
                  <Text style={styles.textStyles}>Made In: -</Text>
                  
                  <View style={{flexDirection:'row',marginTop:17, marginLeft:'15%'}}>
                    {/* Accept */}
                    <Button style={{marginLeft:20,backgroundColor:'blue'}} onPress={() => this.props.navigation.navigate('SOEditItem')}>
                      <Text style={styles.buttonTextStyle}>Edit</Text>
                    </Button>

                    {/* Decline */}
                    <Button style={{marginLeft:20,backgroundColor:'#eb1c1c'}}>
                      <Text style={styles.buttonTextStyle}>Delete</Text>
                    </Button>
                  </View>
                </Body>
              </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textStyles:{
    fontSize:20,
    marginBottom:4,
    fontWeight:'bold',
    color:'#f2e9e9',
    textShadowColor: 'black',
    textShadowRadius: 3,
     textShadowOffset: { 
        width: 0,
        height: 0
      },
    marginBottom:10
    
  },

  buttonStyle:{
    marginTop:7,
    marginLeft:'auto',
    backgroundColor:'darkred',
  },

  buttonTextStyle:{
    fontWeight:'bold'
  }
})