import React, { Component } from 'react';
import {StyleSheet,View} from 'react-native';
import { Container, Header, Content, Item, Input, Icon,DatePicker,Text,Radio,Picker,Form, Button,Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default class SM_SignUpScreen extends Component {
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
      <View searchBar style={{flexDirection: 'row', paddingTop:25 , paddingBottom: 6, alignContent:"center", backgroundColor: "darkblue", top: 0}}>
        <Button transparent onPress={() => this.props.navigation.navigate('Login')} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
        </Button>
        <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'26%',paddingTop:12, fontWeight:'bold'}}>Sign Up</Text> 
      </View>
      {/* End Title */}  
        <Content style={{marginHorizontal:15,paddingVertical:10, marginTop: 20}}>
        
        <Form>          
        
        <Item regular style={styles.InputStyle}>
          <MaterialIcons name="drive-file-rename-outline" style={styles.IconsStyle} size={23} color="darkblue" />
          <Input style={{borderRightWidth:1,borderRightColor:'darkred'}} placeholder='First Name' />
          <MaterialIcons name="drive-file-rename-outline" style={styles.IconsStyle} size={23} color="darkblue" />
          <Input placeholder='Last Name' />
        </Item>

        <Item regular style={styles.InputStyle}>
            <AntDesign name="user" size={24} style={styles.IconsStyle} color="darkblue" />
            <Input placeholder='Username' />
         </Item>

         <Item regular style={styles.InputStyle}>
            <Ionicons name="ios-key-outline" style={styles.IconsStyle} size={23} color="darkblue" />
            <Input secureTextEntry={true} placeholder='Password' />
        </Item>

        <Item regular style={styles.InputStyle}>
          <Ionicons name="ios-key-outline" style={styles.IconsStyle} size={23} color="darkblue" />
          <Input secureTextEntry={true} placeholder='Confirm Password' />
        </Item>

        <Item regular style={styles.InputStyle}>
            <AntDesign name="phone" style={styles.IconsStyle} size={22} color="darkblue" />
            <Input keyboardType="numeric" placeholder='Phone' />
        </Item>

        <Item regular style={styles.InputStyle}>
            <Feather name="map-pin" style={styles.IconsStyle} size={22} color="darkblue" />
            <Input placeholder='Shop Location' />
        </Item>
        

        <Button style={{backgroundColor:'darkblue', marginVertical:20, alignSelf:'center'}}
                onPress={() => this.props.navigation.navigate("SOHome")}>
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
        borderColor:'darkblue',
        borderRadius:6,
    },

    ViewStyle:{
      marginBottom:10,
      flexDirection:'row',
      
  },
  IconsStyle:{
    marginLeft:5,
    marginTop:2
  }
})