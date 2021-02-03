import React, { Component } from 'react';
import {Image,StyleSheet} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

export default class LoginScreen extends Component {

  render() {
    return (
      <Container style={{marginTop: 20}}>
        <Content>
          <Image source={require("../../assets/logo.png")} style={styles.logoStyle}/>  
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          
          <Button style={{marginHorizontal:138,marginTop:40,backgroundColor:'#ba2222'}}
                  onPress={() => this.props.navigation.navigate('Home')} >
            <Text> Login </Text>
          </Button>
          <Button style={{marginHorizontal:102,marginTop:30,backgroundColor:'#ba2222'}}
                  onPress={() => this.props.navigation.navigate('SignUp')} >
            <Text> Create Account </Text>
          </Button>

          </Form>
        </Content>
      </Container>
      
    );
  }
}

    
const styles = StyleSheet.create({
  logoStyle:{
    marginHorizontal:60,
    marginVertical:20,
    width:260,
    height:200

  }
});