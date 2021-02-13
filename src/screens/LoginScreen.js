import React, { Component } from 'react';
import {Image,StyleSheet,View} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { Entypo,MaterialIcons,Ionicons } from '@expo/vector-icons';

export default class LoginScreen extends Component {

  render() {
    return (
      <Container>
        {/* Title */}
        <View searchBar style={{flexDirection: 'row', paddingTop:25 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
          <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'38%',paddingTop:12, fontWeight:'bold'}}>X-Damme</Text> 
        </View>
        {/* End Title */}   
        <Content  >
          <Image source={require("../../assets/logo2.png")} style={styles.logoStyle}/>  
          <Form>
            <Item floatingLabel>
              <Label style={{color:'darkred'}}>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label style={{color:'darkred'}}>Password</Label>
              <Input secureTextEntry={true} />
            </Item>
          
          <Button style={{marginHorizontal:138,marginTop:40,backgroundColor:'darkred'}}
                  onPress={() => this.props.navigation.navigate('Home')} >
            <Text style={{fontWeight:'bold'}}> Login </Text>
          </Button>
          <Button style={{marginHorizontal:98,marginTop:30,backgroundColor:'darkred'}}
                  onPress={() => this.props.navigation.navigate('SignUp')} >
            <Text style={{fontWeight:'bold'}}> Create Account </Text>
          </Button>

          </Form>
        </Content>
      </Container>
      
    );
  }
}

    
const styles = StyleSheet.create({
  logoStyle:{
    marginHorizontal:62,
    marginVertical:20,
    width:260,
    height:210

  }
});