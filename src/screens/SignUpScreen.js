import React, { Component } from 'react';
import {StyleSheet,View} from 'react-native';
import { Container, Header, Content, Item, Input, Icon,DatePicker,Text,Radio,Picker,Form, Button,Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default class SignUpScreen extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { chosenDate: new Date() };
    //     this.setDate = this.setDate.bind(this);
    //   }
    //   setDate(newDate) {
    //     this.setState({ chosenDate: new Date(Date.UTC(2019, 2, 18)) });
    // }

    
    render() {
    return (
      <Container >
      {/* Title */}
        <View searchBar style={{flexDirection: 'row', paddingTop:25 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
          <Button transparent onPress={() => this.props.navigation.navigate('Login')} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
          </Button>
          <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'26%',paddingTop:12, fontWeight:'bold'}}>Sign Up</Text> 
        </View>
      {/* End Title */}   
      
        <Content style={{marginHorizontal:15}}>
        
        <View style={styles.ViewStyle}>
          <Text style={{color:'darkblue',fontSize:15.2, alignSelf: "center"}}> Are you a Shop Owner or Mechanic?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SM_SignUp')}>
            <Text style={{fontWeight:'bold',color:'darkblue'}}> Press Here</Text>
          </TouchableOpacity>
        </View>
        
        <Form>          
        <Item regular style={styles.InputStyle}>
          <MaterialIcons name="drive-file-rename-outline" style={styles.IconsStyle} size={23} color="darkred" />
          <Input style={{borderRightWidth:1,borderRightColor:'darkred'}} placeholder='First Name' />
          <MaterialIcons name="drive-file-rename-outline" style={styles.IconsStyle} size={23} color="darkred" />
          <Input placeholder='Last Name' />
        </Item>
        
        <Item regular style={styles.InputStyle}>
            <AntDesign name="user" size={24} style={styles.IconsStyle}color="darkred" />
            <Input placeholder='Username' />
         </Item>
        
         <Item regular style={styles.InputStyle}>
            <MaterialIcons name="email" style={styles.IconsStyle}  size={24} color="darkred"  />
            <Input placeholder='Email Address' />
         </Item>

        <Item regular style={styles.InputStyle}>
            <Ionicons name="ios-key-outline" style={styles.IconsStyle} size={23} color="darkred" />
            <Input secureTextEntry={true} placeholder='Password' />
        </Item>

        <Item regular style={styles.InputStyle}>
          <Ionicons name="ios-key-outline" style={styles.IconsStyle} size={23} color="darkred" />
          <Input secureTextEntry={true} placeholder='Confirm Password' />
        </Item>
        
        <Item regular style={styles.InputStyle}>
            <Feather name="map-pin" style={styles.IconsStyle} size={22} color="darkred" />
            <Input style={{borderRightWidth:1,borderRightColor:'darkred'}} placeholder='Address' />

            <MaterialIcons name="location-city" style={styles.IconsStyle} size={27} color="darkred" />
            <Input placeholder='City' />
        </Item>

        <Item regular style={styles.InputStyle}>
            <AntDesign name="phone" style={styles.IconsStyle} size={22} color="darkred" />
            <Input keyboardType="numeric" placeholder='Phone' />
        </Item>
        
        <Button  style={{backgroundColor:'darkred', marginVertical:20, alignSelf:'center'}}
                 onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={{fontWeight:'bold'}}>Submit</Text>
        </Button>

        </Form>

    </Content>
    </Container>
    );

  }
}

const styles = StyleSheet.create({
    InputStyle:{
        marginBottom:10,
        borderColor:'darkred',
        borderRadius:6,
    },

    ViewStyle:{
      marginVertical:19,
      marginTop:2,
      flexDirection:'row',
      alignSelf: "center"
  },
  IconsStyle:{
    marginLeft:5,
    marginTop:2
  }
})