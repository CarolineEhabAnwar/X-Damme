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

    constructor(props) {
        super(props);
        this.state = {
          selected: undefined,
          chosenDate: new Date()
        };
      }

      onValueChange(value: string) {
        this.setState({
          selected: value
        });
    }

    setDate(newDate) {
        this.setState({ chosenDate: new Date(Date.GMT(2019, 2, 18)) });
    }
  
    
    render() {
    return (
      <Container >
        <Content style={{marginHorizontal:15,paddingVertical:10, marginTop: 40}}>
        
        <Form>          
        
        <Item regular style={styles.InputStyle}>
          <MaterialIcons name="drive-file-rename-outline" style={styles.IconsStyle} size={23} color="#9a31d4" />
          <Input style={{borderRightWidth:1,borderRightColor:'darkred'}} placeholder='First Name' />
          <MaterialIcons name="drive-file-rename-outline" style={styles.IconsStyle} size={23} color="#9a31d4" />
          <Input placeholder='Last Name' />
        </Item>

        <Item regular style={styles.InputStyle}>
            <AntDesign name="user" size={24} style={styles.IconsStyle} color="#9a31d4" />
            <Input placeholder='Username' />
         </Item>

         <Item regular style={styles.InputStyle}>
            <Ionicons name="ios-key-outline" style={styles.IconsStyle} size={23} color="#9a31d4" />
            <Input secureTextEntry={true} placeholder='Password' />
        </Item>

        <Item regular style={styles.InputStyle}>
          <Ionicons name="ios-key-outline" style={styles.IconsStyle} size={23} color="#9a31d4" />
          <Input secureTextEntry={true} placeholder='Confirm Password' />
        </Item>

        <Item regular style={styles.InputStyle}>
            <AntDesign name="phone" style={styles.IconsStyle} size={22} color="#9a31d4" />
            <Input keyboardType="numeric" placeholder='Phone' />
        </Item>

        <Item regular style={styles.InputStyle}>
            <Feather name="map-pin" style={styles.IconsStyle} size={22} color="#9a31d4" />
            <Input placeholder='Shop Location' />
        </Item>
        
        <Item regular style={ {marginBottom:10,
        borderWidth:3,
        borderColor:'#9a31d4',
        borderRadius:6,
        alignSelf:'flex-start'}}>
        <Foundation name="male-female" style={{marginLeft:6,marginRight:-5}} size={25} color="#9a31d4"/>
        <Picker
              mode="dialog"
              
              iosIcon={<Icon name="arrow-down" style={{marginLeft:-10}} />}
              placeholder="Gender"
              placeholderStyle={{ color: "#9a31d4" }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Male" value="key0" />
              <Picker.Item label="Female" value="key1" />
        </Picker>
        </Item>

        <Item regular style={ {marginBottom:10,
        borderWidth:3,
        borderColor:'#9a31d4',
        borderRadius:6,
        alignSelf:'flex-start'}}>
        
        <Picker
              mode="dialog"
              
              iosIcon={<Icon name="arrow-down" style={{marginLeft:-5}}/>}
              placeholder="Profile"
              placeholderStyle={{ color: "#9a31d4" }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Shop Owner" value="key0" />
              <Picker.Item label="Mechanic" value="key1" />
        </Picker>
        </Item>

        <Button style={{backgroundColor:'#9a31d4', marginVertical:20, alignSelf:'center'}}
                onPress={() => this.props.navigation.navigate("SOHome")}>
            <Text>Submit</Text>
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
        borderColor:'#9a31d4',
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